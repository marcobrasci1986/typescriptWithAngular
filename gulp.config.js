module.exports = function () {
    var root = './APM/';
    var buildDev = root + 'build/dev/';


    var config = {
        root: root,
        index: root + 'index.html',
        less: root + 'less/**/*.less',
        typescript: root + 'app/**/*.ts',

        /**
         * DEV
         */
        dev: buildDev,
        devCss: buildDev + 'css/',
        devJs: buildDev + 'js/',
        tsConfig: root + 'tsconfig.json',

        js: [
            buildDev + 'js/**/*.js'
        ],

        /**
         * Bower and npm locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        }


    };

    config.getWireDepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };


    return config;
}