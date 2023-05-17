const apiRepo = require('../data/api-repository');

exports.getWordList = async (req, res) => {
    try {
        const wordList = await apiRepo.getWholeListBySpell(req.query.spell);
        const words = JSON.parse(JSON.stringify(wordList));
        const student = words.shift();
        const obj = [student, words, createPartTwo(wordList)];

        res.status(200).json(obj);
    } catch (error) {
        res.status(404).json({message: "Not found"});
    }
};

function createPartTwo(wordList) {
    try {
        let partTwo = [];
        let no_of_questions = Math.floor(Math.random() * 5) + 1;
        let original_list = JSON.parse(JSON.stringify(wordList));
        for (let i = 0; i < no_of_questions; i++) {
            wordList.shift();
            let sample = getRandom(wordList, 4);
            sample.map((word) => {
                word.correct = false;
            });

            let randomNr = Math.floor(Math.random() * sample.length);
            sample[randomNr].correct = true;

            partTwo.push(sample);
            wordList = JSON.parse(JSON.stringify(original_list));
        }
        return partTwo;
    } catch (error) {
        console.log(error);
    }
}

// Fisher-Yates shuffle!
function getRandom(arr, size) {
    let shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}