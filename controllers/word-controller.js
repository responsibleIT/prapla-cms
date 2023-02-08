const wordRepository = require('../data/word-repository');
const listRepository = require('../data/list-repository');

exports.getDetailCreateView = (req, res, next) => {
    listRepository.getLists()
        .then((wordlistsResponse) => {
            let allWordLists = wordlistsResponse.map(object => {
                return {category: object.category, id: object["$id"]}
            });
            res.render('cms/words/detail/index', {
                title: 'Create New Word',
                editable: false,
                allWordLists: allWordLists
            });
        });
}

exports.getDetailUpdateView = (req, res, next) => {
    wordRepository.getWord(req.params.wordId)
        .then((response) => {
            listRepository.getLists()
                .then((wordlistsResponse) => {
                    let allWordLists = wordlistsResponse.map(object => {
                        return {category: object.category, id: object["$id"]}
                    });

                    let subscribedLists = response.wordlist.map(object => {
                        return {id: object}
                    });

                    res.render('cms/words/detail/index', {
                        title: 'Update Word: ' + response.word,
                        editable: true,
                        word: response.word,
                        imageUrl: response.image,
                        allWordLists: allWordLists,
                        subscribedLists: subscribedLists
                    });
                });
        });
}

exports.handleCreate = (req, res, next) => {
    const word = req.body.word;
    const image = req.file;
    let wordList;
    if (Array.isArray(req.body.wordlist)) {
        wordList = req.body.wordlist.map(string => string.replace("/", ""));
    } else if (req.body.wordlist) {
        wordList = [req.body.wordlist.slice(0, -1)];
    } else {
        wordList = [];
    }

    wordRepository.createWord(word, image, wordList)
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
    let has_image_already = Boolean(req.body["has-image"])
    if (req.file) {
        has_image_already = false;
    }

    let wordList;
    if (Array.isArray(req.body.wordlist)) {
        wordList = req.body.wordlist.map(string => string.replace("/", ""));
    } else if (req.body.wordlist) {
        wordList = [req.body.wordlist.slice(0, -1)];
    } else {
        wordList = [];
    }

    if (req.body.delete) {
        wordRepository.deleteWord(req.params.wordId)
            .then((response) => {
                res.redirect('/cms/words');
            });
    } else {
        wordRepository.updateWord(req.params.wordId, word, image, wordList, has_image_already)
            .then((response) => {
                res.redirect('/cms/words');
            });
    }
}
