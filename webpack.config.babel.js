const path                  = require('path')
const webpack               = require('webpack')

module.exports = {

    entry:{
        'index.js'      : './src/index.js',
        'shim.js'       : [ './src/shim.js', './src/index.html' ],
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

    plugins : [
        new webpack.DefinePlugin({
            'PHASE_DURATION'            : 20,
            'SCRIPTNODE_BUFFER_SIZE'    : 4096,
            'MIC_THREESHOLD'            : 0.01,
        }),
    ]
}
