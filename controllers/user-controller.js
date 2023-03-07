const userRepo = require('../data/user-repository');

exports.getDetailCreateView = async (req, res) => {
    res.render('cms/users/detail', {title: "Gebruiker: Toevoegen", editable: false});
}

exports.getDetailUpdateView = async (req, res) => {
    const userId = req.params.userId;
    const user = await userRepo.getUserById(userId);
    res.render('cms/users/detail', {title: "Gebruiker: Bewerken", user: user, editable: true});
}

exports.handleCreate = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    await userRepo.createUser(name, email, password, role);
    res.redirect('/cms/users');
}

exports.handleUpdate = async (req, res) => {
    const id = req.params.userId;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    if (req.body.delete) {
        await userRepo.deleteUser(id);
    } else {
        await userRepo.updateUser(id, name, email, password, role);
    }
    res.redirect('/cms/users');
}