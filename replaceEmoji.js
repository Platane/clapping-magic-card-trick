require('readline')
    .createInterface({input:process.stdin})
    .on('line', l =>
        console.log(
            l
                .replace('\\u2660\\uFE0F','\u2660')
                .replace('\\u2666\\uFE0F','\u2666')
                .replace('\\u2663\\uFE0F','\u2663')
                .replace('\\u2665\\uFE0F','\u2665')
        )
    )