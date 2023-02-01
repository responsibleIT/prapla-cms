const wordRepository = require('../data/word-repository');

exports.getDetailCreateView = (req, res, next) => {
    res.render('cms/words/detail/index', {title: 'Create New Word', editable: false});
}

exports.handleUpload = (req, res, next) => {
    const word = req.body.word;
    const image = req.file;
    wordRepository.uploadWord(word, image)
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

    if (req.body.delete) {
        wordRepository.deleteWord(req.params.wordId)
            .then((response) => {
                res.redirect('/cms/words');
            });
    } else {
        wordRepository.updateWord(req.params.wordId, word, image)
            .then((response) => {
                res.redirect('/cms/words');
            });
    }
}

exports.getDetailUpdateView = (req, res, next) => {
    wordRepository.getWord(req.params.wordId)
        .then((response) => {
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            res.render('cms/words/detail/index', {
                title: 'Update Word: ' + response.word,
                editable: true,
                word: response.word,
                imageUrl: response.image,
                wordlists: response.wordlists
            });
        });
}
