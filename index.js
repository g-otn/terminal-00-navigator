const URL = require('url').URL;
const rp = require('request-promise')
const cheerio = require('cheerio')
const fs = require('fs')
const printTree = require('print-tree')
var seenPages = []
const limitNodes = 301
const mainURI = 'http://angusnicneven.com/'

async function navigatePage(uri) {
    console.log('connecting to ' + uri)
    let linksNode = {
        name: new URL(uri).pathname,
        children: []
    }
    const options = {
        uri: uri,
        headers: { 'User-Agent': 'Request-Promise' }
    }
    let links = []

    await rp(options)
        .then(html => {
            let $ = (cheerio.load(html))
            $('a[href]').toArray().forEach(link => {
                let href = link.attribs.href
                if (!href.match(/^(http[s]*)|^(mailto:)|^(tel:)/) // Tries not to leave the domain
                    && seenPages.indexOf(href) == -1) { // this is super unoptimized, but it's not like we have to run this all the time
                    seenPages.push(href)
                    links.push(href)
                }
            })
        })
        .catch(err => console.log('error: ' + err.statusCode))

    console.log(links.length + ' links found')
    if (seenPages.length < limitNodes)
    for (let i = 0; i < links.length; i++)
        await navigatePage(mainURI + links[i].replace('/', ''))
            .then(childLinksNode => linksNode.children.push(childLinksNode))

    return linksNode
}

navigatePage(mainURI)
    .then(linksNode => {
        printTree(
            linksNode,
            node => node.name,
            node => node.children
        )
        console.log('number of pages: ', seenPages.length)
        // fs.writeFile('angusnicneven.json', JSON.stringify(linksNode, null, '   '), err => err ? console.log(err) : 'file saved')
    })