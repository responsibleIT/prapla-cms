const listRepository = require("../data/list-repository");
const wordRepository = require("../data/word-repository");

exports.getDetailCreateView = (req, res, next) => {
    res.render('cms/lists/detail/index', {title: 'Create New List', editable: false});
}

exports.handleCreate = (req, res, next) => {
    const category = req.body.category;

    listRepository.createList(category)
        .then((response) => {
            res.redirect('/cms/lists');
        })
        .catch((error) => {
            res.redirect('/cms/lists');
        });
}

exports.handleUpdate = (req, res, next) => {
    const category = req.body.category;

    if (req.body.delete) {
        listRepository.deleteList(req.params.listId)
            .then((response) => {
                res.redirect('/cms/lists');
            });
    } else {
        listRepository.updateList(req.params.listId, category)
            .then((response) => {
                res.redirect('/cms/lists');
            });
    }
}

exports.getDetailUpdateView = (req, res, next) => {
    listRepository.getList(req.params.listId)
        .then((response) => {
            wordRepository.getWords()
                .then((wordResponse) => {
                    let allWords = wordResponse.map(object => {
                        return {word: object.word, id: object["$id"], subscribedWordList: object.wordlist}
                    });
                    res.render('cms/lists/detail/index', {
                        title: 'Update List: ' + response.category,
                        editable: true,
                        category: response.category,
                        listId: req.params.listId,
                        allWords: allWords
                    });
                });
        });
}