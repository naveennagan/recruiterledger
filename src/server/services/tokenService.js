const jwt = require("jsonwebtoken");

const secret = "onetwothree";

let tokenService = {
    
    createToken: (user)=>{
     const jwtToken = jwt.sign({
            data: JSON.stringify(user)
          }, secret, { expiresIn: 60 * 60 });
     return   jwtToken;   
    },

    verifyToken:(token)=>{
        try {
            var decoded = jwt.verify(token, secret);
            if(decoded){
                return {status:true, data: JSON.parse(decoded.data)};
            }else{
                return {status:false, data:{}};
            }
          } catch(err) {
            return {status:false, data:{}};
          }
    }
};

module.exports = tokenService;

