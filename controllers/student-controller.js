const studentRepository = require('../data/student-repository');
const listRepository = require("../data/list-repository");

exports.getDetailCreateView = (req, res, next) => {
    listRepository.getLists()
        .then((wordlistsResponse) => {
            let allWordLists = wordlistsResponse.map(object => {
                return {category: object.category, id: object["$id"]}
            });
            res.render('cms/students/detail/index', {
                title: 'Create a new student',
                editable: false,
                allWordLists: allWordLists
            });
        });
}

exports.getDetailUpdateView = (req, res, next) => {
    studentRepository.getStudents(req.params.studentId)
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