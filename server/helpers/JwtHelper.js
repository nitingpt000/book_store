import {JWT_SECRET} from "../config";
import jwt from 'jsonwebtoken';

class JwtHelper{
static sign(payload,expiry='60s',secret="kjlksjdflksj"){
    return jwt.sign(payload,secret,{expiresIn:expiry});
}
static verify(){

}
}

export default JwtHelper;