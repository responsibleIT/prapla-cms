const spellRepo = require("./spell-repository");
const wordRepo = require("./word-repository");

exports.getWholeListBySpell = (spell) => {
    return new Promise(async (resolve, reject) => {
        try{
            let spellDocument = await spellRepo.getSpell(spell);
            let wordlist_id = spellDocument.wordlist;
            let allWords = await wordRepo.getWords();

            let wordList = allWords.map(word => {
                if (word.subscribedWordList.includes(wordlist_id)) {
                    return {id: word.id, word: word.word}
                }
            }).filter(Boolean);
            resolve(wordList);
        } catch (error) {
            reject(error);
        }
    });
}