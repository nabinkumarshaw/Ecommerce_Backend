/**
 * post localhost:8888/ecomm/api/v1/auth/signup
 * I need to intercept this
 */

const authcontroller=require('../controllers/auth.controller')
const authmw=require('../middleware/auth.mw');
module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authmw.verifySignup],authcontroller.signup)
    //app.post(uri,middleware connection,connection with the controller)


    /**
     * route for 
     * postcall:localhost:8888/ecomm/api/v1/auth/signIn
     */
    app.post("/ecomm/api/v1/auth/signIn",[authmw.verifySignin],authcontroller.signin)
}