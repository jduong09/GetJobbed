import express from 'express';
import dotenv from 'dotenv';
import { authClient } from './auth.js';

dotenv.config();
const app = express.Router();

app.get("/:user_uuid/messages", async (req, res) => {
  console.log('Check for authClient credentials: ', authClient.credentials);
  res.json({ messages: 'yo' });
});

export {
  app as userRouter
}