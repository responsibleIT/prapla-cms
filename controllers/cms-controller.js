const wordRepo = require('../data/word-repository');
const listRepo = require('../data/list-repository');
const studentRepo = require('../data/student-repository');
const userRepo = require('../data/user-repository');

exports.getDashboardView = async (req, res) => {
    res.render('cms/dashboard/index', {title: 'Dashboard'});
}

exports.getWordsView = async (req, res) => {
    let words = await wordRepo.getWords();
    res.render('cms/words/index', {title: 'Woorden', words: words});
}

exports.getListsView = async (req, res) => {
    let lists = await listRepo.getLists();
    res.render('cms/lists/index', {title: 'Woordenlijsten', lists: lists});
}

exports.getStudentsView = async (req, res) => {
    let students = await studentRepo.getStudents();
    res.render('cms/students/index', {title: 'Kinderen', students: students});
}

exports.getUsersView = async (req, res) => {
    let users = await userRepo.getUsers();
    res.render('cms/users/index', {title: 'Gebruikers', users: users});
}