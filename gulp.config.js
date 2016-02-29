module.exports = function () {
    var root = './APM/';
    var buildDev = root + 'buid/dev/';



    var config = {
        less: root + 'less/**/*.less',
        typescript: root + 'app/**/*.ts',

        /**
         * DEV
         */
        dev : buildDev,
        devCss : buildDev + 'css/',
        devJs : buildDev + 'js/',
        tsConfig: root + 'tsconfig.json'


    }


    return config;
}