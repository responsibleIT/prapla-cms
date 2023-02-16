const wordRepo = require('../data/word-repository');
const listRepo = require('../data/list-repository');
const studentRepo = require('../data/student-repository');
const spellCreator = require('../service/spell-creator');

exports.getDashboardView = async (req, res) => {
    res.render('cms/dashboard/index', {title: 'Dashboard'});
}

exports.getWordsView = async (req, res) => {
    let words = await wordRepo.getWords();
    res.render('cms/words/index', {title: 'Words', words: words});
}

exports.getListsView = async (req, res) => {
    let lists = await listRepo.getLists();
    res.render('cms/lists/index', {title: 'Lists', lists: lists});
}

exports.getStudentsView = async (req, res) => {
    let students = await studentRepo.getStudents();
    res.render('cms/students/index', {title: 'Kinderen', students: students});
}