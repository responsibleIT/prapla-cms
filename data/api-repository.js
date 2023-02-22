const spellRepo = require("./spell-repository");
const wordRepo = require("./word-repository");
const studentRepo = require("./student-repository");

exports.getWholeListBySpell = (spell) => {
    return new Promise(async (resolve, reject) => {
        try {
            let spellDocument = await spellRepo.getSpell(spell);
            let wordlist_id = spellDocument.wordlist;
            let allWords = await wordRepo.getWords();
            let student = await studentRepo.getStudent(spellDocument.student);

            let wordList = allWords.map(word => {
                if (word.subscribedWordList.includes(wordlist_id)) {
                    return {id: word.id, word: word.word, image: word.image}
                }
            }).filter(Boolean);

            wordList.unshift({id: spellDocument.student, student: student.name});
            resolve(wordList);
        } catch (error) {
            reject(error);
        }
    });
}