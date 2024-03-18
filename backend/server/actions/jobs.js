import { execute } from '../../db/db.js';

const createJob = async ({ name, position, status, user_id, email }) => {
  try {
    const { rows: [data] } = await execute('backend/sql/jobs/put.sql', {
      name,
      position,
      application_status: status || null,
      user_id,
      email: email || null,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export {
  createJob
}