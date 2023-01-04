exports.getDashboard = (req, res, next) => {
    res.render('cms/dashboard/index', {title: 'Dashboard'});
}