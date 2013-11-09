var express = require('express'),
    lessMiddleware = require('less-middleware'),
    partials = require('express-partials'),
    examples = require('./examples');

require('ejs');

var app = express();

/**
* Middleware.
*/
app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(lessMiddleware({
        src: __dirname + '/public/less',
        dest: __dirname + '/public/css',
        prefix: '/css'
    }));
    app.use(express.static(__dirname + "/public"));
    app.use(partials());
    app.use(function(req, res, next) {
      res.locals.url = req.url;
      next();
    });
});


/**
* Settings
*/
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('views');
    app.set('view engine', 'ejs');
});

/**
* Locals
*/
app.locals({
    title: "List.js - Add search, sort and flexibility to plain HTML lists or tables with cross-browser native JavaScript by @javve",
    description: "You do want a 3 KB native JavaScript that makes your plain HTML lists and tables super flexible, searchable, sortable and filterable? Yes?",
    ogImage: "http://listjs.com/images/graphics/listjs-logo-bg.png"
});
app.use(function(req, res, next){
    res.locals.currentUrl = req.protocol + '://' + req.host + req.url;
    next();
});


/**
* Routes
*/
app.get('/', function(req, res) {
    res.render('index', {
        title: "List.js - Add search, sort and flexibility to plain HTML lists or tables with cross-browser native JavaScript by @javve",
        description: "You do want a 3 KB native JavaScript that makes your plain HTML lists and tables super flexible, searchable, sortable and filterable? Yes?",
        home: true
    });
});
app.get('/examples/:id', function(req, res) {
    res.render('examples/index', {
        example: examples[req.params.id],
        examples: examples
    });
});

app.get('/performance', function(req, res) {
    res.render('performance', {
        mainMenu: true,
        title: "List.js - Performance, wrooooom! Index, search and sort thousands of items. By @javve",
        description: "List.js is pretty fast. Try it out yourself!"
    });
});

app.get('/overview', function(req, res) {
    res.render('overview/index', {
        overview: true,
        exampleList: examples
    });
});
app.get('/overview/press', function(req, res) {
    res.render('overview/press', {
        overview: true
    });
});
app.get('/overview/changelog', function(req, res) {
    res.render('overview/changelog', {
        overview: true,
        exampleList: examples
    });
});

app.get('/docs', function(req, res) {
    res.render('docs/index', {
        docs: true,
        exampleList: examples
    });
});
app.get('/docs/options', function(req, res) {
    res.render('docs/options', {
        docs: true,
        name: "Options",
        exampleList: examples
    });
});
app.get('/docs/list-api', function(req, res) {
    res.render('docs/list-api', {
        docs: true,
        name: "List API",
        exampleList: examples
    });
});
app.get('/docs/item-api', function(req, res) {
    res.render('docs/item-api', {
        docs: true,
        name: "Item API",
        exampleList: examples
    });
});


app.get('/docs/plugins', function(req, res) {
    res.render('docs/plugins/index', {
        docs: true,
        exampleList: examples
    });
});
app.get('/docs/plugins/fuzzysearch', function(req, res) {
    res.render('docs/plugins/fuzzysearch', {
        docs: true,
        exampleList: examples
    });
});
app.get('/docs/plugins/pagination', function(req, res) {
    res.render('docs/plugins/pagination', {
        docs: true,
        exampleList: examples
    });
});

app.get('/docs/plugins/build', function(req, res) {
    res.render('docs/plugins/build', {
        docs: true,
        exampleList: examples
    });
});

// 404
app.get('*', function(req, res){
    res.status(404);
    res.render('404', { url: req.url });
});

var port = process.env.PORT || 3003;
app.listen(port);
console.log('Listening on port '+ port);
