const studentRepository = require('../data/student-repository');
const spellRepository = require('../data/spell-repository');
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
    let spell = await spellRepository.getSpellByStudent(req.params.studentId);
    let allWordLists = await listRepository.getLists();
    res.render('cms/students/detail/index', {
        title: 'Update Word: ' + student.name,
        editable: true,
        name: student.name,
        nickname: student.nickname,
        spell: spell.spell,
        subscribedList: spell.wordlist,
        allWordLists: allWordLists
    });

}

exports.handleCreate = async (req, res) => {
    const name = req.body.name;
    const nickname = req.body.nickname;
    let wordlist;
    if (req.body.wordlist) {
        wordlist = req.body.wordlist.replace("/", "")
    }

    await studentRepository.createStudent(name, nickname, wordlist);
    res.redirect('/cms/students');
}

exports.handleUpdate = async (req, res) => {
    const name = req.body.name;
    const nickname = req.body.nickname;
    let wordlist;
    if (req.body.wordlist) {
        wordlist = req.body.wordlist.replace("/", "")
    }
    const spell = req.body.spell;

    if (req.body.delete) {
        await studentRepository.deleteStudent(req.params.studentId);
    } else {
        studentRepository.updateStudent(req.params.studentId, name, nickname, wordlist, spell);
    }

    res.redirect('/cms/students');
}