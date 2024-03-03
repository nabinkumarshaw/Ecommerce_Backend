/**
 * postrequest localhost:8888/ecomm/api/v1/auth/categories
 */

const category_controller=require('../controllers/category.controller')
auth_mw=require('../middleware/auth.mw')

module.exports = (app)=>{
    app.post('/ecomm/api/v1/auth/categories',[auth_mw.verifyToken,auth_mw.isAdmin],category_controller.createNewcategory)
}