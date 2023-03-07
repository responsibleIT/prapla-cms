const {
    users
} = require("../service/appwrite");
const uuid = require("uuid");


exports.getUsers = () => {
    return new Promise((resolve) => {
        users.list().then((response) => {
            let users = response.users.map((user) => {
                return {id: user["$id"], name: user["name"], email: user["email"], role: user["prefs"]["role"]}
            });
            resolve(users);
        });
    });
}

exports.getUserById = (id) => {
    return new Promise((resolve) => {
        users.get(id).then((response) => {
            let user = {
                id: response["$id"],
                name: response["name"],
                email: response["email"],
                password: "********",
                role: response["prefs"]["role"]
            }
            resolve(user);
        });
    });
}

exports.createUser = (name, email, password, role) => {
    const id = uuid.v4();
    return new Promise((resolve) => {
        users.createArgon2User(id, email, password, name).then((response) => {
            users.updatePrefs(id, {role: role}).then((response) => {
                resolve(response);
            });
        });
    });
}

exports.updateUser = (id, name, email, password, role) => {
    return new Promise(async (resolve) => {
        try {
            await users.updateName(id, name);
            await users.updateEmail(id, email);
            if (password !== "********") await users.updatePassword(id, password);
            await users.updatePrefs(id, {role: role});
            resolve(true);
        } catch (e) {
            resolve(false);
        }
    });
}

exports.deleteUser = (id) => {
    return new Promise((resolve) => {
        users.delete(id).then((response) => {
            resolve(response);
        });
    });
}