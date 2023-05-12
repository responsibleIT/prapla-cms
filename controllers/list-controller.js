const listRepository = require("../data/list-repository");
const wordRepository = require("../data/word-repository");

exports.getDetailCreateView = async (req, res) => {
    res.render('cms/lists/detail/index', {title: 'Create New List', editable: false});
}

exports.handleCreate = async (req, res) => {
    const category = req.body.category;

    await listRepository.createList(category);
    res.redirect('/cms/lists');
}

exports.handleUpdate = async (req, res) => {
    const category = req.body.category;
    const words = req.body.words;

    if (req.body.delete) {
        await listRepository.deleteList(req.params.listId);
    } else {
        if (words) {
            await listRepository.updateList(req.params.listId, category, words);
        } else {
            await listRepository.updateList(req.params.listId, category);
        }
    }

    res.redirect('/cms/lists');
}

exports.getDetailUpdateView = async (req, res) => {
    let list = await listRepository.getList(req.params.listId);
    let allWords = await wordRepository.getWords();

    res.render('cms/lists/detail/index', {
        title: 'Update List: ' + list.category,
        editable: true,
        category: list.category,
        listId: req.params.listId,
        allWords: allWords
    });
}