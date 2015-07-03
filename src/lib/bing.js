const Bacon     = require('baconjs'),
      DOMParser = require('xmldom').DOMParser

module.exports.search = function(query) {
  function parseText(node, childName) {
    var children = node.getElementsByTagName(childName)
    if (children.length > 0) {
      var child = children.item(0)
      return child.textContent
    }
  }

  function parseUrl(link) {
    var url = link.split('?')[1].split('&')
      .map(param => param.split('='))
      .filter(([name, value]) => name === 'url')
      .map(([_, value]) => decodeURIComponent(value))

    return url[0]
  }

  function parseResponse(xml) {
    function errorHandler(error) {
      console.log("could not parse: ", error)
      console.log("bing response:")
      console.log(xml)
    }

    var parser = new DOMParser({ errorHandler: errorHandler })
    var doc = parser.parseFromString(xml)
    var rssEntries = doc.getElementsByTagName('item')

    var results = []
    for (var i = 0; i < rssEntries.length; i++) {
      var entry = rssEntries.item(i)
      var title = parseText(entry, 'title')
      var description = parseText(entry, 'description')
      var url = parseUrl(parseText(entry, 'link'))
      var image = parseText(entry, 'News:Image')

      results.push({
        title: title,
        description: description,
        url: url,
        image: image
      })
    }

    return results
  }

  const results =
    fetch('http://www.bing.com/news?format=RSS&q=' + encodeURIComponent(query), { headers: {'Accept-Language': 'en'} })
      .then(response => response.text())
      .then(response => parseResponse(response))

  return Bacon.fromPromise(results)
}
