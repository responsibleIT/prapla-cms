const spellRepo = require('../data/spell-repository');
const allCombinations = require('./spells.json');

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
}

exports.generateUniqueSpell = async () =>{
    let spells = await spellRepo.getSpells();
    let diff = allCombinations.diff(spells);
    return diff[Math.floor(Math.random() * diff.length)];
}