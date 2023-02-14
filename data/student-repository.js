const {
    database,
    database_id,
    student_collection_id
} = require("../service/appwrite");
const uuid = require("uuid");
const spellRepo = require("./spell-repository");

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

exports.createStudent = async (name, nickname, wordlist) => {
    const new_id = uuid.v4();
    return new Promise(async (resolve, reject) => {
        await database.createDocument(database_id, student_collection_id, new_id, {
            name: name,
            nickname: nickname,
        });

        await spellRepo.createSpell(new_id, wordlist);
        resolve(true);
    });
}

exports.updateStudent = (student_id, name, nickname, wordlist) => {
    return new Promise(async (resolve, reject) => {
        await database.deleteDocument(database_id, student_collection_id, student_id);
        await database.createDocument(database_id, student_collection_id, student_id, {
            name: name,
            nickname: nickname,
        });
        await spellRepo.updateSpell(student_id, wordlist);
        resolve(true);
    });

}

exports.deleteStudent = (student_id) => {
    return new Promise(async (resolve, reject) => {
        await database.deleteDocument(database_id, student_collection_id, student_id);
        resolve(await spellRepo.deleteSpell(student_id));
    });
}
