const apiRepo = require('../data/api-repository');

exports.getWordList = async (req, res) => {
    try{
        const wordList = await apiRepo.getWholeListBySpell(req.query.spell);
        res.status(200).json(wordList);
    } catch (error) {
        res.status(404).json({message: "Not found"});
    }
};