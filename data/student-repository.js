const {
    database,
    storage,
    storage_bucket_id,
    database_id,
    word_collection_id,
    list_collection_id,
    student_collection_id
} = require("../service/appwrite");
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
    return new Promise((resolve) => {
        database.listDocuments(database_id, student_collection_id)
            .then((response) => {
                let students = response.documents.map(object => {
                    return {name: object.name, nickname: object.nickname, id: object["$id"]}
                });
                resolve(students);
            })
            .catch(() => {
                resolve([]);
            });
    });
}

exports.createStudent = (name, nickname, wordlist, spell) => {
    const new_id = uuid.v4();
    return new Promise((resolve, reject) => {
        database.createDocument(database_id, student_collection_id, new_id, {
            name: name,
            nickname: nickname,
            wordlist: wordlist,
            spell: spell
        })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.updateStudent = (student_id, name, nickname, wordlist, spell) => {

}

exports.deleteStudent = (student_id) => {
    return new Promise((resolve, reject) => {
        database.deleteDocument(database_id, student_collection_id, student_id)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
