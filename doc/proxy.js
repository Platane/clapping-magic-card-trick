
const followRedirect = require('follow-redirects')
const http = require( 'http' )
const url = require( 'url' )

const SOURCE_URL = process.env.SOURCE_URL || 'https://platane.github.io/js1k-2017'
const PORT = 8083

http
    .createServer((req,res) => {

        const pathname = url.parse(req.url).pathname

        console.log( pathname, '->', SOURCE_URL+pathname )

        const proxy = followRedirect.https.request( SOURCE_URL+pathname , proxy_res => proxy_res.pipe(res, {end: true}) )

        res.setHeader('Access-Control-Allow-Origin', '*')
        req.pipe( proxy, {end: true} )

    })

    .listen( PORT, () => console.log('listening to '+PORT+' redirect to '+SOURCE_URL) )
