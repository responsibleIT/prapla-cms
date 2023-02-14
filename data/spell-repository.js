const {database, database_id, spell_collection_id} = require("../service/appwrite");

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