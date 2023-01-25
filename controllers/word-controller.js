

exports.getCreateView = (req, res, next) => {
    res.render('cms/words/upload/index', {title: 'Create Word'});
}

exports.handleUpload = (req, res, next) => {
    const word = req.body.word;
    const imageObject = req.file;
    const wordList = [];
    console.log(word);
    console.log(imageObject);
    res.redirect('/cms/words');
}