module.exports = {
  resolve: {

      fallback: { 
        zlib: false,
        querystring: false,
        path: false,
        stream: false,
        http: false,
        url: false,
        crypto: require.resolve("crypto-browserify")
       }
    }
}