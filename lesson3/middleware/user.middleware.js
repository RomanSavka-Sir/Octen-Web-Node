const errorCodes = require("../constant/errorCodes.enum");
const errorMessages = require("../error/error.messages");

module.exports = {
checkIsIdValid:(req, res, next) =>{
    try{
        const { preferL = "en"} = req.body;
        const userId = +req.params.userId;
        if(userId<0 || !Number.isInteger(userId) || Number.isNaN(userId)){
            throw new Error(errorMessages.NOT_VALID_ID[preferL]);
        }
        next();
    }catch(e){
        res.status(errorCodes.BAD_REQUEST).json(e.message)
    }

},

    isUserValid: (req, res, next)=>{
    try{
        const { email, password, preferL = "en"} = req.body;
        if(!email || !password){

            throw new Error(errorMessages.EMPTY_FIELD[preferL]);
        }

        if(typeof(password) !== "number"){

            throw new Error(errorMessages.PASSWORD_CONTAIN_STRING[preferL]);
        }
        next();

    }catch (e){
        res.status(errorCodes.BAD_REQUEST).json(e.message)
    }
    }
}