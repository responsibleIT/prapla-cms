const {database, database_id, word_collection_id} = require ("../service/appwrite");

exports.getWords = () => {
    return new Promise((resolve, reject) => {
        database.listDocuments(database_id, word_collection_id)
            .then((response) => {
                resolve(response.documents);
            })
            .catch((error) => {
                reject(error);
            });
    });
}