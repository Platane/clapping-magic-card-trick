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
            // number of card ( better if power of 2 )
            'N_CARD'                    : 16,

            // 1 << N_CARD_LN = N_CARD
            'N_CARD_LN'                 : 5,

            // duration between two check ( in update count, which length vary with the script buffer size )
            'PHASE_DURATION'            : 15,

            // audio script node buffer size, should be large enougth to no update too much per frame
            'SCRIPTNODE_BUFFER_SIZE'    : 4096,

            // microphone treeshold
            'MIC_THREESHOLD'            : 0.01,
        }),
    ]
}
