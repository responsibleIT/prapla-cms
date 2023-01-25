const appwrite = require("../service/appwrite");

exports.getDetailCreateView = (req, res, next) => {
    res.render('cms/words/detail/index', {title: 'Create New Word', editable: false});
}

exports.handleUpload = (req, res, next) => {
    const word = req.body.word;
    const image = req.file;
    appwrite.uploadWord(word, image)
        .then((response) => {
            res.redirect('/cms/words');
        })
        .catch((error) => {
            res.redirect('/cms/words');
        });
}

exports.handleUpdate = (req, res, next) => {
    const word = req.body.word;
    const image = req.file;

    appwrite.updateWord(req.params.wordId, word, image)
        .then((response) => {
            res.redirect('/cms/words');
        });
}

exports.getDetailUpdateView = (req, res, next) => {
    appwrite.getWord(req.params.wordId)
        .then((response) => {
            res.render('cms/words/detail/index', {title: 'Update Word: ' + response.word,
                editable: true,
                word: response.word,
                imageUrl: response.image,
                wordlists: response.wordlists});
        });
}
