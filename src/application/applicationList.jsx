import PropTypes from 'prop-types';

const ApplicationList = ({ fetchAllApplications, applications, setApplicationFormData, handleOpenModal, setEditStatus, emailData }) => {
  const handleEdit = (e) => {
    e.preventDefault();
    const job_uuid = e.currentTarget.parentElement.parentElement.parentElement.getAttribute('data-uuid');

    const fetchApplicationInfo =  async (job_uuid) => {
      const response = await fetch(`/api/jobs/${job_uuid}`, {
        method: 'GET'
      });
      const { data } = await response.json();
      await setApplicationFormData(data);
      await setEditStatus(true);
      handleOpenModal(e);
    }
    fetchApplicationInfo(job_uuid);
  }

  const handleDelete = (e) => {
    e.preventDefault();

    const job_uuid = e.currentTarget.parentElement.parentElement.parentElement.getAttribute('data-uuid');

    const deleteApplication = async (job_uuid) => {
      const response = await fetch(`/api/jobs/${job_uuid}`, {
        method: 'DELETE'
      });
      const { data } = await response.json();
      if (data) {
        fetchAllApplications()
      }
    }
    deleteApplication(job_uuid);
  }

  const rowsBodyTable = applications.map((application, idx) => {
    let statusText;
    if (application.application_status === 0) {
      statusText = 'Applied';
    } else if (application.application_status === 1) {
      statusText = 'Received Offer';
    } else if (application.application_status === 2) {
      statusText = 'Rejected';
    }

    return (
      <li className='list-item-application' key={idx} data-uuid={application.job_uuid}>
        <div className='info-application'>
          <h3>{application.name}</h3>
          <h4>{application.position}</h4>
          <span>{statusText}</span>
        </div>
        <ul>
          <li>
            <button onClick={handleEdit}>
              <svg className='svg-edit-btn' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
            </button>
          </li>
          <li>
            <button onClick={handleDelete}>
              <svg className='svg-delete-btn' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </button>
          </li>
        </ul>
      </li>
    );
  });

  const itemsEmailData = emailData.map((email, idx) => {
    return (
      <li key={idx}>
        <h2>Sender: {email.value}</h2>
        <div>{email.bodyMessage}</div>
      </li>
    )
  })
  
  return (
    <div id="div-applications">
      <ul>{rowsBodyTable}</ul>
      <ul>{itemsEmailData}</ul>
    </div>
  );
};

export default ApplicationList;

ApplicationList.propTypes = {
  fetchAllApplications: PropTypes.func,
  applications: PropTypes.array,
  user_uuid: PropTypes.string,
  setApplicationFormData: PropTypes.func,
  handleOpenModal: PropTypes.func,
  setEditStatus: PropTypes.func,
  emailData: PropTypes.array
}