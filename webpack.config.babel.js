const path                  = require('path')

module.exports = {

    entry:{
        'index.js'      : './src/index.js',
        'shim.js'       : './src/shim.js',
        'index.html'    : './src/index.html',
    },

    output: {
        path        : path.join(__dirname, 'dist'),
        filename    : '[name]'
    },

    module: {

        rules: [
            {
                test    : /\.js$/,
            },

            {
                test    : /\.html?$/,
                use     : {
                    loader  : 'file-loader',
                    options : {
                        name    : '[name].[ext]',
                    },
                },
            },
        ],
    },
}
