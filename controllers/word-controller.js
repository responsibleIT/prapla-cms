exports.getCreateView = (req, res, next) => {
    res.render('cms/words/upload/index', {title: 'Create Word'});
}

exports.handleUpload = (req, res, next) => {
    const word = req.body.word;
    console.log(word);
}