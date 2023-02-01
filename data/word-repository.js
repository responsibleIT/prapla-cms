const {database, storage, storage_bucket_id, database_id, word_collection_id} = require("../service/appwrite");
const uuid = require("uuid");
const {InputFile} = require("node-appwrite");
const {Readable} = require("stream");

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
    const new_id = uuid.v4();
    if (image) {
        return createWordWithImage(word, image, new_id)
    } else {
        return createWordWithoutImage(word, new_id)
    }
}

function createWordWithoutImage(word, id) {
    return new Promise((resolve, reject) => {
        database.createDocument(database_id,
            word_collection_id,
            id,
            {
                word: word
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function createWordWithImage(word, image, id) {
    return new Promise((resolve, reject) => {
        storage.createFile(storage_bucket_id,
            id,
            new InputFile(Readable.from(image.buffer), image.originalname, image.size))
            .then(() => {
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
            });

    });
}

exports.updateWord = (id, word, image) => {
    if (image) {
        return updateWordWithImage(id, word, image)
    } else {
        return updateWordWithoutImage(id, word)
    }
}

function updateWordWithImage(id, word, image) {
    return new Promise((resolve, reject) => {
        deleteWord(id)
            .then((response) => {
                createWordWithImage(word, image, id)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function updateWordWithoutImage(word_id, word) {
    return new Promise((resolve, reject) => {
        database.deleteDocument(database_id, word_collection_id, word_id)
            .then((response) => {
                createWordWithoutImage(word, word_id)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.deleteWord = (word_id) => {
    return deleteWord(word_id);
}

function deleteWord(word_id) {
    return new Promise((resolve, reject) => {
        storage.deleteFile(storage_bucket_id, word_id)
            .then((response) => {
                database.deleteDocument(database_id, word_collection_id, word_id)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((error) => {
                // No image to delete
                if (error.code === 404) {
                    database.deleteDocument(database_id, word_collection_id, word_id)
                        .then((response) => {
                            resolve(response);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                } else {
                    reject(error);
                }
            });
    });
}