import express from 'express';
import dotenv from 'dotenv';
import { Base64 } from 'js-base64';
import { authClient } from './auth.js';
import { getAllJobsByUserId } from '../server/actions/jobs.js';


dotenv.config();
const app = express.Router();

app.post('/:user_uuid/messages', async (req, res) => {
  console.log('Hit /:user_uuid/messages route');
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
    console.log(arrMessageFromObjs);
    res.json({ data: 'nice' });
  } catch(err) {
    console.log(err);
    res.json({ data: 'No' });
  }
});

app.get('/:user_uuid/jobs', async (req, res) => {
  const { user_id }  = req.session.userInfo;
  const arrayEmails = [];
  try {
    const response = await getAllJobsByUserId({ user_id });
    response.forEach((application) => {
      if (application.email) {
        application.email.forEach(email => {
          arrayEmails.push(email);
        });
      }
    });

    await fetch(`http://localhost:5000/api/users/${req.params.user_uuid}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emails: arrayEmails
      })
    });

    // console.log(arrayEmails);
    res.json({ jobsArray: response });
  } catch(err) {
    console.log(err);
  }
  res.end();
});

export {
  app as userRouter
}