// npm install--save pug
app.set('view engine', 'pug');
app.set('views', './views');
// doctype html
// html
// head
// title = "Hello Pug"
// body
// p.greetings# people Hello World!
app.get('/first_template', function(req, res) {
    res.render('first_view');
});