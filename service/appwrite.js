const sdk = require('node-appwrite');

const client = new sdk.Client();

const database_id = process.env.AW_DATABASE_ID
const word_collection_id = process.env.AW_WORD_COLLECTION_ID
const list_collection_id = process.env.AW_LIST_COLLECTION_ID
const student_collection_id = process.env.AW_STUDENT_COLLECTION_ID
const spell_collection_id = process.env.AW_SPELL_COLLECTION_ID
const storage_bucket_id = process.env.AW_STORAGE_BUCKET_ID

client.setEndpoint(process.env.AW_ENDPOINT)
    .setProject(process.env.AW_PROJECT_ID)
    .setKey(process.env.AW_API_KEY);

const users = new sdk.Users(client);
const account = new sdk.Account(client);
const database = new sdk.Databases(client);
const storage = new sdk.Storage(client);

exports.database = database;
exports.users = users;
exports.storage = storage;

exports.database_id = database_id;
exports.word_collection_id = word_collection_id;
exports.list_collection_id = list_collection_id;
exports.student_collection_id = student_collection_id;
exports.spell_collection_id = spell_collection_id;
exports.storage_bucket_id = storage_bucket_id;

exports.isValidSession = (user_id, session_id) => {
    return new Promise(async (resolve, reject) => {
        users.listSessions(user_id)
            .then((response) => {
                let sessions = response.sessions;
                sessions.forEach((session) => {
                    if (session["$id"] === session_id) {
                        resolve(true);
                    }
                });
                reject(false);
            })
            .catch((error) => {
                console.log("SESSION error:", error)
                reject(false);
            });
    })
}