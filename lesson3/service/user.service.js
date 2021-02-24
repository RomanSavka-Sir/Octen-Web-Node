const DB = require("../database/user.json");

const path = require("path");
const fs = require("fs");
const {promisify} = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);



module.exports = {

    createUser: async (user) => {

        DB.push(user);
       return await writeFile(path.join(__dirname, "database", "user.json"), JSON.stringify(DB));

    },

    findAllUsers: async () =>{

        const allUsers = await readFile(path.join(__dirname, "database", "user.json"));
        return JSON.parse(allUsers.toString());

    },

    findUserByEmail: async (userEmail) =>{

        const userByName = DB.find(email => email.name === userEmail);
        return await userByName;

    },


    deleteUser: async (userId) =>{

        DB.splice(userId,1);
        return await writeFile(path.join(__dirname, "database", "user.json"), JSON.stringify(DB));

    }

}