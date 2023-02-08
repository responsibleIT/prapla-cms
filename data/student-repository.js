const {database, storage, storage_bucket_id, database_id, word_collection_id, list_collection_id, student_collection_id} = require("../service/appwrite");
const uuid = require("uuid");

exports.getStudent = (student_id) => {
    return new Promise((resolve, reject) => {
        database.getDocument(database_id, student_collection_id, student_id)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.getStudents = () => {
    return new Promise((resolve, reject) => {
        database.listDocuments(database_id, student_collection_id)
            .then((response) => {
                resolve(response.documents);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
