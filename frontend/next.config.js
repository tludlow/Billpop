module.exports = {
    onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 25 * 1000,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 5,
    },

    webpack: (config) => {
        config.node = {
            fs: 'empty',
        }
        return config
    },
}
