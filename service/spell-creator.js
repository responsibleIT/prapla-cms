const spellRepo = require('../data/spell-repository');
const allCombinations = require('./spellsv2.json');

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
}

exports.generate = async () =>{
    let spells = await spellRepo.getSpells();
    let diff = allCombinations.diff(spells);
    return diff[Math.floor(Math.random() * diff.length)];
}