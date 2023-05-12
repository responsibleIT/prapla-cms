const apiRepo = require('../data/api-repository');

exports.getWordList = async (req, res) => {
    try {
        const wordList = await apiRepo.getWholeListBySpell(req.query.spell);
        const obj = [wordList, createPartTwo(wordList)];

        res.status(200).json(obj);
    } catch (error) {
        res.status(404).json({message: "Not found"});
    }
};

function createPartTwo(wordList) {
    let partTwo = [];
    let no_of_questions = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < no_of_questions; i++) {
        let sample = getRandom(wordList, 4);
        sample.map((word) => {
            word.correct = false;
        });

        let randomNr = Math.floor(Math.random() * sample.length);
        sample[randomNr].correct = true;

        partTwo.push(sample);
    }
    return partTwo;
}

function getRandom(arr, n) {
    arr.shift();

    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}