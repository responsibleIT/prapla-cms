const sdk = require('node-appwrite');
const client = new sdk.Client();
const users = new sdk.Users(client);

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
    });
}

