exports.getDashboardView = (req, res, next) => {
    res.render('cms/dashboard/index', {title: 'Dashboard'});
}

exports.getWordsView = (req, res, next) => {
    res.render('cms/words/index', {title: 'Words'});
}