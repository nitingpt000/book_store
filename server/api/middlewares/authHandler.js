import JwtHelper from '../../helpers/JwtHelper';

const auth = async (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return next("error 401");
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const {email} = JwtHelper.verify(token);
        console.log(result)
        const user = {
            email
        }
        req.user = user;
        next();


} catch(err) {
    console.log(err)
        return next(401);
    }

}

export default auth;