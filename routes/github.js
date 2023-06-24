import  Express  from "express";
//const axios = require('axios');
import axios from "axios";
const GithubRoutes=Express()
import  Jwt  from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()
const clientID = process.env.clientID
const clientSecret = process.env.clientSecret;
const redirectURI = 'https://giddy-shirt-eel.cyclic.app/github/callback';
const scopes = ['user', 'repo']; 

// Step 1: Redirect users to GitHub's authorization page
GithubRoutes.get('/login', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(' ')}`);
 // res.json("hehe")
});
GithubRoutes.get('/callback', async (req, res) => {
  const code = req.query.code;

  const { data } = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: clientID,
    client_secret: clientSecret,
    code: code,
    redirect_uri: redirectURI
  }, {
    headers: {
      Accept: 'application/json'
    }
  });

  const accessToken = data.access_token;
  
 await getUserEmail(accessToken)
  .then((emailData) => {
  
    const emails = emailData.map((email) => email.email);

    res.status(200).json(emails[0])
  })
 
});


const getUserEmail =async (accessToken) => {
    return await axios
      .get('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      })
      .then((response) => {
       
        const emailData = response.data;
        console.log(emailData);
        return emailData;
      })
      .catch((error) => {
       
        console.error(error);
        throw new Error('Failed to fetch user email');
      });
  };
  
GithubRoutes.post("/token",(req,res)=>{
  console.log(req.body+"aditya")
    try {
        const {email}=req.body
      if(!email){
        return res.status(400).json({ msg: "Email is not given})}
        res.status(200).json({ msg: "Login successfull!", token: Jwt.sign({ email: email }, "masai")})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error",error})
    }
   

})
export default GithubRoutes
