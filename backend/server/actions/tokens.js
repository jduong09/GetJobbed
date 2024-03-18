import { execute } from '../../db/db.js';

const createToken = async (refresh_token, expiry_date, user_id) => {
  try {
    await execute('backend/sql/tokens/put.sql', { refresh_token, expiry_date, user_id });
  } catch (err) {
    console.log(err);
  }
};

const getTokenByUserId = async (user_id) => {
  try {
    const { rows: [data] } = await execute('backend/sql/tokens/getTokenByUserId.sql', { user_id });
    return data;
  } catch (err) {
    console.log(err);
  }
}

export {
  createToken,
  getTokenByUserId
}