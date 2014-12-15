module.exports = function(config){
    config.set({

        basePath : './',
        frameworks: ['mocha'],
        browsers: ['Chrome', 'Firefox'],
        singleRun: true,
        autoWatch: false,

        colors: true,

        reporters : ['dots'],
    });
};