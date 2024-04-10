import { execute } from '../../db/db.js';

const createJob = async ({ name, position, status, user_id, email }) => {
  try {
    const { rows: [data] } = await execute('backend/sql/jobs/put.sql', {
      name,
      position,
      application_status: status === 0 || status === 1 || status === 2 ? status : null,
      user_id,
      email: email.length ? [email] : [],
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

const getJobByUuid = async (job_uuid) => {
  try {
    const { rows: [data] } = await execute('backend/sql/jobs/getJobByUuid.sql', {
      job_uuid
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

const editJob = async ({ name, position, status, job_uuid }) => {
  try {
    const { rows: [data] } = await execute('backend/sql/jobs/patchJobByUuid.sql', {
      name,
      position,
      application_status: status,
      job_uuid
    });
    return data;
  } catch(err) {
    console.log(err);
  }
}

const deleteJobByUuid = async (job_uuid) => {
  try {
    const { rows: [data] } = await execute('backend/sql/jobs/deleteJobByUuid.sql', {
      job_uuid
    });
    return data;
  } catch(err) {
    console.log(err);
  }
}

export {
  createJob,
  getAllJobsByUserId,
  getJobByUuid,
  editJob,
  deleteJobByUuid
}
