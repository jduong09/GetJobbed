import { execute } from '../../db/db.js';

const createJob = async ({ name, position, status, user_id, email }) => {
  try {
    const { rows: [data] } = await execute('backend/sql/jobs/put.sql', {
      name,
      position,
      application_status: status === 0 || status === 1 || status === 2 ? status : null,
      user_id,
      email: email || null,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getAllJobsByUserId = async({ user_id }) => {
  try {
    const { rows: data } = await execute('backend/sql/jobs/getAllByUserId.sql', {
      user_id
    });
    return data;
  } catch(err) {
    console.log(err);
  }
};

export {
  createJob,
  getAllJobsByUserId
}