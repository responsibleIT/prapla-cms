const {database, storage, storage_bucket_id, database_id, word_collection_id} = require("../service/appwrite");
const uuid = require("uuid");
const {InputFile, Query} = require("node-appwrite");
const {Readable} = require("stream");
const listRepo = require("./list-repository");

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

exports.getWords = async () => {
    let documents = [];
    let page = await database.listDocuments(database_id, word_collection_id, [Query.limit(100)]);
    while (page.documents.length > 0) {
        documents.push(...page.documents);
        page = await database.listDocuments(database_id, word_collection_id, [Query.limit(100), Query.offset(documents.length)]);
    }

    return new Promise(async (resolve) => {
        let lists = await listRepo.getLists();
        let words = documents.map(object => {
            let categories = lists.map(list => {
                if (object.wordlist.includes(list.id)) {
                    return list.category;
                }
            }).filter(Boolean);

            return {
                word: object.word,
                id: object["$id"],
                subscribedWordList: object.wordlist,
                categories: categories,
                image: object.image
            }
        });

        resolve(words);
    });
}

exports.createWord = (word, image, wordList) => {
    const new_id = uuid.v4();
    if (image) {
        return createWordWithImage(word, image, new_id, wordList)
    } else {
        return createWordWithoutImage(word, new_id, wordList)
    }
}

function createWordWithoutImage(word, id, wordList) {
    return new Promise((resolve, reject) => {
        database.createDocument(database_id,
            word_collection_id,
            id,
            {
                word: word,
                wordlist: wordList
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function createWordWithImage(word, image, id, wordList) {
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
                        wordlist: wordList,
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

exports.updateWord = (id, word, image, wordList, has_image_already) => {
    if (image || has_image_already) {
        return updateWordWithImage(id, word, image, wordList, has_image_already)
    } else {
        return updateWordWithoutImage(id, word, wordList)
    }
}

function updateWordWithImage(id, word, image, wordList, has_image_already) {
    if (has_image_already) {
        return new Promise((resolve, reject) => {
            database.deleteDocument(database_id, word_collection_id, id)
                .then((response) => {
                    const image_url_string = `${process.env.AW_ENDPOINT}/storage/buckets/${storage_bucket_id}/files/${id}/view?project=${process.env.AW_PROJECT_ID}`
                    database.createDocument(database_id, word_collection_id, id, {
                        word: word,
                        wordlist: wordList,
                        image: image_url_string
                    }).then((response) => {
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    });
                });
        });
    } else {
        return new Promise((resolve, reject) => {
            deleteWord(id)
                .then((response) => {
                    createWordWithImage(word, image, id, wordList)
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
}

function updateWordWithoutImage(word_id, word, wordList) {
    return new Promise((resolve, reject) => {
        database.deleteDocument(database_id, word_collection_id, word_id)
            .then((response) => {
                createWordWithoutImage(word, word_id, wordList)
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