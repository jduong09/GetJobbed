import express from 'express';
import dotenv from 'dotenv';
import { Base64 } from 'js-base64';
import { authClient } from './auth.js';
import { getAllJobsByUserId } from '../server/actions/jobs.js';


dotenv.config();
const app = express.Router();

app.post('/:user_uuid/messages', async (req, res) => {
  const { emails } = await req.body;
  let regex = emails.reduce((accumulator, currentValue) => {
    return accumulator += `|${currentValue}`;
  }, `(${emails[0]}`);
  regex += ')';
  const accessToken = await authClient.credentials.access_token;
  try {  
    const fetchMessageIds = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?access_token=${accessToken}`);
    const objListOfMessageIds = await fetchMessageIds.json();
    
    const arrMessageFromObjs = await Promise.all(objListOfMessageIds.messages.map(async (message) => {
      const fetchMessage = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}?access_token=${accessToken}`);
      const dataMessage = await fetchMessage.json();
      const resultObj = dataMessage.payload.headers.find(header => header.name === 'From');
      if (resultObj.value.match(regex)) {
        const decodedMessage = Base64.decode(dataMessage.payload.parts[0].body.data.replace(/-/g, '+').replace(/_/g, '/'));
        return { ...resultObj, messageId: message.id, bodyMessage: decodedMessage };
      }
    })).then(response => {
      return response.filter(email => {
        return email !== undefined;
      });
    });
    // { ...resultObj, messageId, bodyMessage };
    /*
     name: 'From',
[0]  value: '"Nicolò Bardi - Joinrs" <workwithus@joinrs.com>',
[0]  messageId: '18dd3e868988a741',
[0]  bodyMessage: '\r\n' +
    */
    res.json({ data: arrMessageFromObjs });
  } catch(err) {
    console.log(err);
    res.json({ data: 'No' });
  }
});

app.get('/:user_uuid/jobs', async (req, res) => {
  const { user_id }  = await req.session.userInfo;
  console.log('Session User_ud: ', user_id);
  const arrayEmails = [];
  try {
    const response = await getAllJobsByUserId({ user_id });
    console.log('Response: ', response);
    response.forEach((application) => {
      if (application.email) {
        application.email.forEach(email => {
          arrayEmails.push(email);
        });
      }
    });

    /*
    const messageResponse = await fetch(`http://localhost:5000/api/users/${req.params.user_uuid}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emails: arrayEmails
      })
    });

    const array = await messageResponse.json();

    // console.log(arrayEmails);
    */
    res.json({ jobsArray: response, emailsArray: [] });
  } catch(err) {
    console.log(err);
  }
  res.end();
});

export {
  app as userRouter
}