import passport from "passport";
import { Strategy } from "passport-local";
import { validarPass } from "../utils.js";
import { pool } from "../db.js";

const LocalStrategy = Strategy

// serializamos la sesion para que el usuario no tenga que ingresar o autenticarse cada ves que quiera navegar entre distintas ventanas
// recibe como primer parametro un usuario y como segundo un callback
// este codigo es la manera en que passport almaneca la informacion del user en el navegador
passport.serializeUser((result, done) => {
    console.log('serialize');
    console.log(result);
    console.log(result[0]._id);
    done(null, result[0]._id)
})
// es el proceso inverso a serializar, pero en lugar de recibir un usuario, recibe solo el ID del usuario y un callback
// por ello, tenemos que validar en nuestra DB si ese ID existe
passport.deserializeUser( async (id, done) => {
    // la linea de codigo seria asi
    console.log(id);
    const user = await userModel.findById(id)
    done(null, user)
})

// estrategia local, de local-passport
passport.use( 'local-login', new LocalStrategy( {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    // en este caso estamos estamos tratando de validar un login por ende se va a llamar al modelUser
    // para poder validar la existencia del email el cual en nuestra DB figura como Unico
    try{
        const result = await userModel.findOne({email: email })
        console.log('result:');
        console.log(result);
        if(!result){
            console.log('usuario no existe');
            return done('mail no encontrado', false) //req.flash('loginMessage','el usuario no existe')
        }
        const compaPass = await validarPass(password, result.password)
        console.log(compaPass);
        if(compaPass){
            console.log('contraseña iguales');
            console.log(result);
            return done(null, result) //req.flash('loginMessage','inicio exitoso'))
        }else{
            console.log('invalid password');
            return done('password incorrecta', false) //req.flash('loginMessage','la password ingresada no es correcta')
        }
        
    }catch(err) { 
        console.error(err)
    }
} ) )


