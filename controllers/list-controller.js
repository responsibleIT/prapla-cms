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
            let listId = req.params.listId;
            let allWords = await wordRepository.getWords();
            for (word of allWords) {
                if (word.subscribedWordList.includes(listId)) {
                    let wordlist = word.subscribedWordList.filter(id => id !== listId);
                    await wordRepository.updateWord(word.id, word.word, null, wordlist, true);
                }
            }

            for (wordId of words) {
                let wordObj = await wordRepository.getWord(wordId);

                let wordlist = wordObj.wordlist;
                wordlist.push(listId);

                await wordRepository.updateWord(wordId, wordObj.word, null, wordlist, true);
            }

            await listRepository.updateList(req.params.listId, category);
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