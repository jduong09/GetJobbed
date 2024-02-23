import { execute } from '../../db/db';

const createUser = async ({ name, email_address }) => {
  try {
    await execute('backend/sql/users/put.sql', { name, email_address });
  } catch (err) {
    console.log(err);
  }
};

export default createUser;