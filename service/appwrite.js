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

exports.database = database;
exports.users = users;
exports.storage = storage;

exports.database_id = database_id;
exports.word_collection_id = word_collection_id;
exports.storage_bucket_id = storage_bucket_id;

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