const {database, database_id, spell_collection_id} = require("../service/appwrite");
const spellCreator = require("../service/spell-creator");

exports.getSpell = (spell) => {
    return new Promise((resolve, reject) => {
        database.listDocuments(database_id, spell_collection_id)
            .then((response) => {
                response.documents.forEach(document => {
                    if (document.spell === spell) {
                        resolve(document);
                    }
                });
                reject(new Error("Spell not found"));
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.getSpells = () => {
    return new Promise((resolve, reject) => {
        database.listDocuments(database_id, spell_collection_id)
            .then((response) => {
                let spells = response.documents.map(object => object.spell);
                resolve(spells);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.getSpellByStudent = (studentId) => {
    return new Promise(async (resolve) => {
        let spells = (await database.listDocuments(database_id, spell_collection_id)).documents;
        spells.forEach(spell => {
            if (spell.student === studentId) {
                resolve(spell);
            }
        });
    });
}

exports.createSpell = (studentId, wordlist) => {
    return new Promise(async (resolve, reject) => {
        const spell = await spellCreator.generate();
        resolve(await database.createDocument(database_id, spell_collection_id, studentId, {
            student: studentId,
            spell: spell,
            wordlist: wordlist
        }));
    });
}

exports.updateSpell = (spellId, wordlist) => {
    return new Promise(async (resolve, reject) => {
        const spell = await spellCreator.generate();
        await database.deleteDocument(database_id, spell_collection_id, spellId);
        resolve(await database.createDocument(database_id, spell_collection_id, spellId, {
            student: spellId,
            spell: spell,
            wordlist: wordlist
        }));
    });
}

exports.deleteSpell = (spellId) => {
    return new Promise(async (resolve, reject) => {
        resolve(await database.deleteDocument(database_id, spell_collection_id, spellId));
    });
}