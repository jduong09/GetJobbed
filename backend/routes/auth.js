import express from 'express';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import { createUser, getUserByEmail } from '../server/actions/users.js';
import { createToken, getTokenByUserId } from '../server/actions/tokens.js';

dotenv.config();
const app = express.Router();

const { gmail_client_id, gmail_client_secret, gmail_redirect_url } = process.env;

const oAuth2Client = new OAuth2Client(
  gmail_client_id,
  gmail_client_secret,
  gmail_redirect_url
);

const scopes = [
  'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
  'https://www.googleapis.com/auth/gmail.addons.current.message.action',
  'https://www.googleapis.com/auth/gmail.readonly'
]

const authorizationUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

oAuth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh tokens in my database
    console.log(tokens.refresh_token);
  }
  console.log(tokens.access_token);
});

// As a developer, you should write your code to handle the case where a refresh token is no longer working.
app.get('/authorize', (req, res) => {
  // console.log(oauth2Client);
  if (!Object.keys(oAuth2Client.credentials).length) {
    res.json({ oauthUrl: authorizationUrl });
  } else {
    res.json({ signedIn: true });
  }
});

// After user has authorized GetJobbed to access the provided scopes, redirect to this endpoint.
app.get('/redirect', async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.query.code);
  oAuth2Client.setCredentials(tokens);

  const fetchUsersEmail = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${tokens.access_token}`,
      'Accept': 'application/json'
    }
  });

  const data = await fetchUsersEmail.json();
  const userIdObj = await createUser(data.emailAddress);
  await createToken(tokens.refresh_token, tokens.expiry_date, userIdObj.id);

  res.redirect('http://localhost:5173');
});

app.post('/login', async (req, res, next) => {
  const { credential } = req.body;

  const email = await verify(credential);

  // Verify the signature of the JWT.
  if (email) {
    const user = await getUserByEmail(email);
    if (user) {
      const { refresh_token } = await getTokenByUserId(user.id);
      const accessTokenResponse = await getAccessTokenFromRefreshToken(refresh_token);
      oAuth2Client.setCredentials(accessTokenResponse);

  
      req.session.userInfo = {
        access_token: accessTokenResponse,
        user_id: user.id
      };

      await req.session.save((err) => {
        if (err) return next(err);
      });
      res.redirect(`http://localhost:5173/users/${user.user_uuid}`);
      // Add Token to Cookie.
    } else {
      // throw error, redirect to authorize/signup.
      console.log('no user in server db');
    }
  } else {
    console.log('Id Token is not valid');
  }
});

app.post('/logout', async (req, res) => {
  await req.session.destroy();
  await res.clearCookie('connect.sid');
  res.redirect('http://localhost:5173');
})

const getAccessTokenFromRefreshToken = async (refresh_token) => {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: new URLSearchParams({
      'grant_type': 'refresh_token',
      'client_id': gmail_client_id,
      'client_secret': gmail_client_secret,
      'refresh_token': refresh_token
    })
  });
  const data = await response.json();
  return data;
}

const verify = async (token) => {
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: token,
    audience: gmail_client_id
  });
  const payload = ticket.getPayload();
  return payload.email;
}

export { 
  app as authRouter,
  oAuth2Client as authClient
};