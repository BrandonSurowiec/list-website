var express = require('express'),
    lessMiddleware = require('less-middleware'),
    pjax = require('express-pjax'),
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
    app.use(pjax());
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
        description: "You do want a 3 KB native JavaScript that makes your plain HTML lists and tables super flexible, searchable, sortable and filterable? Yes?"
    });
});
app.get('/examples', function(req, res) {
    res.render('examples/index', {
        example: {
            name: "Annotated example",
            title: "List.js - Examples of how to use the script",
            description: "List.js is super flexible and here are two examples of how to use it.",
        },
        examples: examples
    });
});
app.get('/examples/:id', function(req, res) {
    res.render('examples/pen', {
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

app.get('/plugins', function(req, res) {
    res.render('plugins/index', {
        plugins: true
    });
});
app.get('/plugins/fuzzy-search', function(req, res) {
    res.render('plugins/fuzzy-search', {
        plugins: true,
        title: "List.js - Paging Plugin",
        description: "List.js is super flexible and here are two examples of how to use it."
    });
});
app.get('/plugins/paging', function(req, res) {
    res.render('plugins/paging', {
        plugins: true
    });
});

app.get('/docs', function(req, res) {
    res.render('docs/index', {
        docs: true,
        name: "Documentation",
        examples: examples
    });
});
app.get('/docs/options', function(req, res) {
    res.render('docs/options', {
        docs: true,
        name: "Options",
        examples: examples
    });
});
app.get('/docs/methods', function(req, res) {
    res.render('docs/methods', {
        docs: true,
        name: "Methods",
        examples: examples
    });
});

app.get('/changelog', function(req, res) {
    res.render('changelog');
});

// 404
app.get('*', function(req, res){
    res.status(404);
    res.render('404', { url: req.url });
});

var port = process.env.PORT || 3003;
app.listen(port);
console.log('Listening on port '+ port);