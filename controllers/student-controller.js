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
    studentRepository.getStudent(req.params.studentId)
        .then((response) => {
            listRepository.getLists()
                .then((wordlistsResponse) => {
                    let allWordLists = wordlistsResponse.map(object => {
                        return {category: object.category, id: object["$id"]}
                    });


                    res.render('cms/students/detail/index', {
                        title: 'Update Word: ' + response.name,
                        editable: true,
                        name: response.name,
                        nickname: response.nickname,
                        spell: response.spell,
                        wordlist: response.wordlist,
                        allWordLists: allWordLists
                    });
                });
        });
}