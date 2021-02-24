const errorCodes = require("../../constant/errorCodes.enum");
const userService = require("../../service/user.service");

module.exports = {
    createUser: (req, res) => {
        try{

 userService.createUser(req.body).then();

        }catch (e){
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    getAllUsers: (req, res) => {
        try{

const allUsers = userService.findAllUsers();
res.json(allUsers);

        }catch (e){
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    getUserByEmail: (req, res) => {
        try {

            const {email} = req.params;
            const userByEmail =  userService.findUserByEmail(email);
            res.json(userByEmail);

        }catch(e){
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }

    },
    deleteUser: (req, res)=>{
        try{

            const {userId} = req.params;
             userService.deleteUser(userId).then();

        }catch(e){
            res.status(errorCodes.BAD_REQUEST).json(e.message);

        }

    }
}