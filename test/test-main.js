var tests = [];
for (var file in window.__karma__.files) {
    // файлы с тестами имеют окончание Spec
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base',
    // обязательно пути ко всем модулям которые будут в карме
    paths: {
        'chat':'./src/js/chat',
        'cube':'./src/js/cube',
        'canvas': './bower_components/canvas-5-polyfill/canvas',
        // создан фективный модуль soketio для тестирования
        'socketio': './test/socketioForTest'
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

