const wordsRepo = require('../data/words-repository');

exports.getDashboardView = (req, res, next) => {
    res.render('cms/dashboard/index', {title: 'Dashboard'});
}

exports.getWordsView = (req, res, next) => {
    wordsRepo.getWords()
        .then((response) => {
            let words = response.map(object => {
                return {word: object.word, id: object["$id"]}
            });

            res.render('cms/words/index', {title: 'Words', words: words});
        })
        .catch((error) => {
            console.log(error);
            res.render('cms/words/index', {title: 'Words'});
        });
}