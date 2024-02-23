import { execute } from '../../db/db.js';

const createUser = async (email_address) => {
  try {
    await execute('backend/sql/users/put.sql', { email_address });
  } catch (err) {
    console.log(err);
  }
};

const getUserByEmail = async(email_address) => {
  try {
    await execute('backend/sql/users/getByEmail.sql', { email_address });
  } catch(err) {
    console.log(err);
  }
};

export {
  createUser,
  getUserByEmail
}