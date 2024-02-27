import { execute } from '../../db/db.js';

const createUser = async (email_address) => {
  try {
    const { rows: [data] } = await execute('backend/sql/users/put.sql', { email_address });
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getUserByEmail = async (email_address) => {
  try {
    const { rows: [data] } = await execute('backend/sql/users/getUserByEmail.sql', { email_address });
    return data;
  } catch(err) {
    console.log(err);
  }
};

export {
  createUser,
  getUserByEmail
}