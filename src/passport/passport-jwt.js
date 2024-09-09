import passport from "passport";
import jwt from 'passport-jwt';



const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt


export const initializePassportJWT = () => {
    console.log('initializePJWT:');
    passport.use('jwt', new JWTStrategy({jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),secretOrKey: 'decoSecret'}, 
        async(jwt_Payload, done) => {
            console.log('payload:');
            console.log(jwt_Payload);
            try{
                return done(null, jwt_Payload)
            }catch(e){
                return done(e)
            }
        }))
}

const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies['CookiePrueba'] // " 'coderCookie' " NOMBRE DE LA COOKIE QUE ESTAMOS GUARDANDO
    }
    return token;
}