const express = require('express');
const router = express.Router();

// import controller
const {
    

    
    googleLogin,
    facebookLogin
} = require('../controllers/socialAuth');

// import validators
/*const {
    

    forgotPasswordValidator,
    resetPasswordValidator
} = require('../validators/auth');
const { runValidation } = require('../validators');*/


// forgot reset password
/*router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);*/
// google and facebook
router.post('/google-login', googleLogin);
router.post('/facebook-login', facebookLogin);

module.exports = router;
