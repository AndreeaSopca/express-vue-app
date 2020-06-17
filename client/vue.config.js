const path = require("path");

console.log("__dirname " + __dirname);
console.log("path concatenation: " + path.resolve(__dirname, '../server/public'));

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000'
            }
        }
    }
};
