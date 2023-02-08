const wordRepo = require('../data/word-repository');
const listRepo = require('../data/list-repository');
const studentRepo = require('../data/student-repository');

exports.getDashboardView = (req, res, next) => {
    res.render('cms/dashboard/index', {title: 'Dashboard'});
}

exports.getWordsView = (req, res, next) => {
    wordRepo.getWords()
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

exports.getListsView = (req, res, next) => {
    listRepo.getLists()
        .then((response) => {
            let lists = response.map(object => {
                return {list: object.category, id: object["$id"]}
            });

            res.render('cms/lists/index', {title: 'Lists', lists: lists});
        })

        .catch((error) => {
            console.log(error);
            res.render('cms/lists/index', {title: 'Lists'});
        });
}

exports.getStudentsView = (req, res, next) => {
    studentRepo.getStudents()
        .then((response) => {
            let students = response.map(object => {
                return {name: object.name, nickname: object.nickname, id: object["$id"]}
            });

            res.render('cms/students/index', {title: 'Students', students: students});
        })
        .catch((error) => {
            console.log(error);
            res.render('cms/students/index', {title: 'Students'});
        });
}