const studentRepository = require('../data/student-repository');
const listRepository = require("../data/list-repository");

exports.getDetailCreateView = async (req, res) => {
    let allWordLists = await listRepository.getLists();
    res.render('cms/students/detail/index', {
        title: 'Create a new student',
        editable: false,
        allWordLists: allWordLists
    });
}

exports.getDetailUpdateView = async (req, res) => {
    let student = await studentRepository.getStudent(req.params.studentId);
    let allWordLists = await listRepository.getLists();
    res.render('cms/students/detail/index', {
        title: 'Update Word: ' + student.name,
        editable: true,
        name: student.name,
        nickname: student.nickname,
        spell: student.spell,
        subscribedList: student.wordlist,
        allWordLists: allWordLists
    });

}

exports.handleCreate = async (req, res) => {
    const name = req.body.name;
    const nickname = req.body.nickname;
    const wordlist = req.body.wordlist.replace("/", "")

    //TODO SPELL GENERATOR
    let spell = "TODO SPELL GENERATOR"
    await studentRepository.createStudent(name, nickname, wordlist, spell);
    res.redirect('/cms/students');
}

exports.handleUpdate = async (req, res) => {
    const name = req.body.name;
    const nickname = req.body.nickname;
    const wordlist = req.body.wordlist.replace("/", "")
    const spell = req.body.spell;

    if (req.body.delete) {
        await studentRepository.deleteStudent(req.params.studentId);
    } else {
        studentRepository.updateStudent(req.params.studentId, name, nickname, wordlist, spell);
    }

    res.redirect('/cms/students');
}