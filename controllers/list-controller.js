const listRepository = require("../data/list-repository");
const wordRepository = require("../data/word-repository");

exports.getDetailCreateView = (req, res, next) => {
    res.render('cms/lists/detail/index', {title: 'Create New List', editable: false});
}

exports.handleUpload = (req, res, next) => {
    const category = req.body.category;


    listRepository.uploadList(category)
        .then((response) => {
            res.redirect('/cms/lists');
        })
        .catch((error) => {
            res.redirect('/cms/lists');
        });
}

exports.handleUpdate = (req, res, next) => {
    const category = req.body.category;

    if (req.body.delete) {
        listRepository.deleteList(req.params.listId)
            .then((response) => {
                res.redirect('/cms/lists');
            });
    } else {
        listRepository.updateList(req.params.listId, category)
            .then((response) => {
                res.redirect('/cms/lists');
            });
    }
}

exports.getDetailUpdateView = (req, res, next) => {
    listRepository.getList(req.params.listId)
        .then((response) => {
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            res.render('cms/lists/detail/index', {
                title: 'Update Word: ' + response.category,
                editable: true,
                category: response.category,
            });
        });
}