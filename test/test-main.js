var tests = [];
for (var file in window.__karma__.files) {
    // файлы с тестами имеют окончание Spec
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src/js',
    // обязательно пути ко всем модулям которые будут в карме
    paths: {
        'chat':'../js/chat',
        'cube':'../js/cube',
        'canvas': '../bower_components/canvas-5-polyfill/canvas',
        // создан фективный модуль soketio для тестирования
        'socketio': '../js/socketioForTest'
        //'canvas':'../bower_components/canvas-5-polyfill/canvas'
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

