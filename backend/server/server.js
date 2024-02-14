import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const { appKey, appId, PORT } = process.env;

const port = PORT || 5000;

app.get("/", (req, res) => {

});

app.listen(port, () => {
  console.log(`App is listening on Port ${port}`);
});