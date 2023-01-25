const appwrite = require("../service/appwrite");

exports.getDashboardView = (req, res, next) => {
    res.render('cms/dashboard/index', {title: 'Dashboard'});
}

exports.getWordsView = (req, res, next) => {
    appwrite.getWords()
        .then((response) => {
            let words = response.map(object => {
                return {word: object.word, id: object["$id"]}
            });

            res.render('cms/words/index', {title: 'Words', words: words});
        })
        .catch((error) => {
            res.render('cms/words/index', {title: 'Words'});
        });
}