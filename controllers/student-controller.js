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
                        //TODO: prechecked list optimization
                        return {
                            category: object.category,
                            id: object["$id"],
                            checked: (object["$id"] === response.wordlist)
                        }
                    });


                    res.render('cms/students/detail/index', {
                        title: 'Update Word: ' + response.name,
                        editable: true,
                        name: response.name,
                        nickname: response.nickname,
                        spell: response.spell,
                        subscribedList: response.wordlist,
                        allWordLists: allWordLists
                    });
                });
        });
}

exports.handleCreate = (req, res, next) => {
    const name = req.body.name;
    const nickname = req.body.nickname;
    const wordlist = req.body.wordlist.replace("/", "")

    //TODO SPELL GENERATOR
    const spell = "TODO SPELL GENERATOR"
    studentRepository.createStudent(name, nickname, wordlist, spell)
        .then((response) => {
            res.redirect('/cms/students');
        })
        .catch((error) => {
            res.redirect('/cms/students');
        });
}

exports.handleUpdate = (req, res, next) => {
    const name = req.body.name;
    const nickname = req.body.nickname;
    const wordlist = req.body.wordlist.replace("/", "")
    const spell = req.body.spell;

    if (req.body.delete) {
        studentRepository.deleteStudent(req.params.studentId)
            .then((response) => {
                res.redirect('/cms/students');
            })
            .catch((error) => {
                res.redirect('/cms/students');
            });
    } else {
        studentRepository.updateStudent(req.params.studentId, name, nickname, wordlist, spell)
            .then((response) => {
                res.redirect('/cms/students');
            })
            .catch((error) => {
                res.redirect('/cms/students');
            });
    }
}