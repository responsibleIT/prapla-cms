exports.getLogin = (req, res, next) => {
    res.render('login/index', {title: 'Prapla'});
}

exports.validateLogin = (req, res, next) => {
    //todo login validation
    if (true) {
        res.redirect('/cms');
    }
}