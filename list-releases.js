const https = require('https')

https
    .request({
        hostname: 'api.github.com',
        port: 443,
        path: '/repos/coderbyheart/acme-firmware-releases/releases',
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'request-promise@node'
        }
    }, res => {
        let response = ''
        res.setEncoding('utf8')
        res.on('data', chunk => {
            response = response + chunk
        })
        res.on('end', () => {
            const releases = JSON.parse(response)
            releases.map(({name, assets}) => {
                console.log(`${name}`)
                assets.map(({name, content_type, size}) => {
                    console.log(`- ${name} (${content_type}) ${Math.round(size / 1024)}KB`)
                })
            })
        })
    })
    .end()