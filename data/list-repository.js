const {database, database_id, list_collection_id} = require("../service/appwrite");
const uuid = require("uuid");

exports.getList = (list_id) => {
    return new Promise((resolve, reject) => {
        database.getDocument(database_id, list_collection_id, list_id)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.getLists = () => {
    return new Promise((resolve) => {
        database.listDocuments(database_id, list_collection_id)
            .then((response) => {
                let lists = response.documents.map(object => {
                    return {category: object.category, id: object["$id"]}
                });
                resolve(lists);
            })
            .catch(() => {
                resolve([]);
            });
    });
}

exports.createList = (category) => {
    const id = uuid.v4();
    return createList(category, id);
}

function createList(category, id) {
    return new Promise((resolve, reject) => {
        database.createDocument(database_id,
            list_collection_id,
            id,
            {
                category: category
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.updateList = (list_id, category) => {
    return new Promise((resolve, reject) => {
        deleteList(list_id)
            .then((response) => {
                createList(category, list_id)
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

exports.deleteList = (list_id) => {
    return deleteList(list_id);
}

function deleteList(list_id) {
    return new Promise((resolve, reject) => {
        database.deleteDocument(database_id, list_collection_id, list_id)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}