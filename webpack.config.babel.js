const path                  = require('path')

module.exports = {

    entry:{
        'app'           : './src/app.js',
        'shim'          : './src/shim.js',
        'index'         : './src/index.html',
    },

    output: {
        path        : path.join(__dirname, 'dist'),
        filename    : '[name].js'
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
