const sdk = require('node-appwrite');
const uuid = require('uuid');
const {InputFile} = require("node-appwrite");
const {Readable} = require('stream');

const client = new sdk.Client();
const users = new sdk.Users(client);
const database = new sdk.Databases(client);
const storage = new sdk.Storage(client);

const database_id = process.env.AW_DATABASE_ID
const word_collection_id = process.env.AW_WORD_COLLECTION_ID
const storage_bucket_id = process.env.AW_STORAGE_BUCKET_ID

client.setEndpoint(process.env.AW_ENDPOINT)
    .setProject(process.env.AW_PROJECT_ID)
    .setKey(process.env.AW_API_KEY);

exports.isValidSession = (user_id, session_id) => {
    return new Promise((resolve, reject) => {
        users.listSessions(user_id)
            .then((response) => {
                let sessions = response.sessions;
                sessions.forEach((session) => {
                    if (session["$id"] === session_id) {
                        resolve(true);
                    }
                });
                reject(false);
            });
    })
}

exports.getWord = (word_id) => {
    return new Promise((resolve, reject) => {
        database.getDocument(database_id, word_collection_id, word_id)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

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

exports.uploadWord = (word, image) => {
    const id = uuid.v4();
    return new Promise((resolve, reject) => {
        storage.createFile(storage_bucket_id,
            id,
            new InputFile(Readable.from(image.buffer), image.originalname, image.size))
            .then((storage_response) => {
                const image_url_string = `${process.env.AW_ENDPOINT}/storage/buckets/${storage_bucket_id}/files/${id}/view?project=${process.env.AW_PROJECT_ID}`
                database.createDocument(database_id,
                    word_collection_id,
                    id,
                    {
                        word: word,
                        image: image_url_string
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        console.log("db error", error)
                        reject(error);
                    });
            })
            .catch((storage_error) => {
                console.log("storage error", storage_error)
                reject(storage_error);
            })

    });
}

exports.updateWord = (word, image) => {
    const id = uuid.v4();

    console.log(image)
    return new Promise((resolve, reject) => {
        storage.updateFile(storage_bucket_id,
            id)
            .then((storage_response) => {
                const image_url_string = `${process.env.AW_ENDPOINT}/storage/buckets/${storage_bucket_id}/files/${id}/view?project=${process.env.AW_PROJECT_ID}`
                database.createDocument(database_id,
                    word_collection_id,
                    id,
                    {
                        word: word,
                        image: image_url_string
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        console.log("db error", error)
                        reject(error);
                    });
            })
            .catch((storage_error) => {
                console.log("storage error", storage_error)
                reject(storage_error);
            })

    });
}

// exports.deleteWord = (word_id) => {
//     return new Promise((resolve, reject) => {
//         storage.deleteFile(storage_bucket_id, word_id)
//             .then((response) => {
//                 database.deleteDocument(database_id, word_collection_id, word_id)
//                     .then((response) => {
//                         resolve(response);
//                     })
//                     .catch((error) => {
//                         reject(error);
//                     });
//             })
//             .catch((error) => {
//                 reject(error);
//             });
//     });
// }