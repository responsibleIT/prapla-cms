const wordRepository = require('../data/word-repository');
const listRepository = require('../data/list-repository');

exports.getDetailCreateView = async (req, res) => {
    let allWordLists = await listRepository.getLists();
    res.render('cms/words/detail/index', {
        title: 'Create New Word',
        editable: false,
        allWordLists: allWordLists
    });
}

exports.getDetailUpdateView = async (req, res) => {
    let word = await wordRepository.getWord(req.params.wordId);
    let allWordLists = await listRepository.getLists();
    let subscribedLists = word.wordlist.map(object => {
        return {id: object}
    });

    res.render('cms/words/detail/index', {
        title: 'Update Word: ' + word.word,
        editable: true,
        word: word.word,
        imageUrl: word.image,
        allWordLists: allWordLists,
        subscribedLists: subscribedLists
    });
}

function sanitizeWordList(req) {
    if (Array.isArray(req.body.wordlist)) {
        return req.body.wordlist.map(string => string.replace("/", ""));
    } else if (req.body.wordlist) {
        return [req.body.wordlist.slice(0, -1)];
    } else {
        return [];
    }
}

exports.handleCreate = async (req, res, next) => {
    const word = req.body.word;
    const image = req.file;

    let wordList = sanitizeWordList(req);
    await wordRepository.createWord(word, image, wordList);
    res.redirect('/cms/words');
}

exports.handleUpdate = async (req, res, next) => {
    const word = req.body.word;
    const image = req.file;

    let has_image_already = Boolean(req.body["has-image"])
    if (req.file) {
        has_image_already = false;
    }

    if (req.body.delete) {
        await wordRepository.deleteWord(req.params.wordId);
    } else {
        let wordList = sanitizeWordList(req);
        await wordRepository.updateWord(req.params.wordId, word, image, wordList, has_image_already);
    }
    res.redirect('/cms/words');
}
