//const asyncHandler = require('express-async-handler')
const jwt = require ('jsonwebtoken')
 const User =  require('../models/User')
const { OAuth2Client } = require('google-auth-library');

/* const facebookLogin = asyncHandler(async (req, res) => {
console.log('FACEBOOK LOGIN REQ BODY', req.body);
    const { userID, accessToken } = req.body;
     const res= await fetch(`https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`) // returns a promise and waiting for it to be fufilled
     const user = await User.findOne({ email}) 
    
            
            // console.log(response))
      
                
                
                    if (user) {
                        res.json({
      _id: user._id,
     name: user.name,
      email: user.email,
    
      token: generateToken(user._id), // generate token that has user id embedded in it 
                        })
                    }
     if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  } else {
    res.status(401) //  if not found  alert invalid email or password//
    throw new Error(' invalid facebook account login')
  }

           
                                         
})     
*/


exports.facebookLogin = (req, res) => {
    console.log('FACEBOOK LOGIN REQ BODY', req.body);// print facebook body
    const { userID, accessToken } = req.body; // userid, access token require bodoy

    const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`; // url to access facebook token

    return (
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            // .then(response => console.log(response))
            .then(response => {
                const { email, name } = response;
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
                        const { _id, email, name, role } = user;
                        return res.json({
                            token,
                            user: { _id, email, name, role }
                        });
                    } else {
                        let password = email + process.env.JWT_SECRET;
                        user = new User({ name, email, password });
                        user.save((err, data) => {
                            if (err) {
                                console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
                                return res.status(400).json({
                                    error: 'User signup failed with facebook'
                                });
                            }
                            const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
                            const { _id, email, name, role } = data;
                            return res.json({
                                token,
                                user: { _id, email, name, role }
                            });
                        });
                    }
                });
            })
            .catch(error => {
                res.json({
                    error: 'Facebook login failed. Try later'
                });
            })
    );
};


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.googleLogin = (req, res) => {
    const { idToken } = req.body;

    client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID }).then(response => {
        // console.log('GOOGLE LOGIN RESPONSE',response)
        const { email_verified, name, email } = response.payload;
        if (email_verified) {
            User.findOne({ email }).exec((err, user) => {
                if (user) {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
                    const { _id, email, name, role } = user;
                    return res.json({
                        token,
                        user: { _id, email, name, role }
                    });
                } else {
                    let password = email + process.env.JWT_SECRET;
                    user = new User({ name, email, password });
                    user.save((err, data) => {
                        if (err) {
                            console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                            return res.status(400).json({
                                error: 'User signup failed with google'
                            });
                        }
                        const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
                        const { _id, email, name, role } = data;
                        return res.json({
                            token,
                            user: { _id, email, name, role }
                        });
                    });
                }
            });
        } else {
            return res.status(400).json({
                error: 'Google login failed. Try again'
            });
        }
    });
};


/*const signinController = async(req, res) => {
    if(req.body.googleAccessToken){
        // gogole-auth
        const {googleAccessToken} = req.body;

        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`
            }
        })
            .then(async response => {
                const name = response.data.name;
                
                const email = response.data.email;
                

                const existingUser = await User.findOne({ name, email})

                if (!existingUser) 
                return res.status(404).json({message: "User don't exist!"})

                const token = jwt.sign({
                    email: existingUser.email,
                    id: existingUser._id
                }, config.get("JWT_SECRET"), {expiresIn: "1h"})
        
                res
                    .status(200)
                    .json({result: existingUser, token})
                    
            })
            .catch(err => {
                res
                    .status(400)
                    .json({message: "Invalid access token!"})
            })
    }else{
        // normal-auth
        const {email, password} = req.body;
        if (email === "" || password === "") 
            return res.status(400).json({message: "Invalid field!"});
        try {
            const existingUser = await User.findOne({email})
    
            if (!existingUser) 
                return res.status(404).json({message: "User don't exist!"})
    
            const isPasswordOk = await bcrypt.compare(password, existingUser.password);
    
            if (!isPasswordOk) 
                return res.status(400).json({message: "Invalid credintials!"})
    
            const token = jwt.sign({
                email: existingUser.email,
                id: existingUser._id
            }, config.get("JWT_SECRET"), {expiresIn: "1h"})
    
            res
                .status(200)
                .json({result: existingUser, token})
        } catch (err) {
            res
                .status(500)
                .json({message: "Something went wrong!"})
        }
    }
  
}*/


/*const generateToken = (id) => {
  return jwt.sign({
    id
  }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
} */

