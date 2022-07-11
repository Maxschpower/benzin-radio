const path = require('path');

module.exports = {
    entry: './web/src/background/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'web/dist'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};