import React, { useEffect, useState } from 'react';
import { deleteEmployeeAPI, getEmployeeAPI, updateEmployeeAPI } from '../services/allAPI';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Display = () => {
  const [fetchedEmpDet, setFetchedEmpDet] = useState([]);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAllEmpDet();
  }, [fetchedEmpDet]);

  const getAllEmpDet = async () => {
    try {
      const result = await getEmployeeAPI();
      if (result.status >= 200 && result.status < 300) {
        setFetchedEmpDet(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEmp = async (id) => {
    try {
      await deleteEmployeeAPI(id);
      getAllEmpDet();
    } catch (err) {
      console.log(err);
    }
  };

  const handleShow = (empDetails) => {
    setUpdatedDetails(empDetails); // Set the selected employee details
    setShow(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedResult = await updateEmployeeAPI(updatedDetails);
      console.log(updatedResult);
      if (updatedResult.status >= 200 && updatedResult.status < 300) {
        getAllEmpDet(); // Refresh employee list
        setShow(false); // Close the modal
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Username */}
          <Form.Label htmlFor="name">User Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            value={updatedDetails.username || ''}
            onChange={(e) => setUpdatedDetails({ ...updatedDetails, username: e.target.value })}
          />
          {/* Email */}
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            value={updatedDetails.email || ''}
            onChange={(e) => setUpdatedDetails({ ...updatedDetails, email: e.target.value })}
          />
          {/* Status */}
          <Form.Label htmlFor="status">Status</Form.Label>
          <Form.Select
            id="status"
            value={updatedDetails.status || ''}
            onChange={(e) => setUpdatedDetails({ ...updatedDetails, status: e.target.value })}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="warning" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex justify-content-center">
        <table
          className="table border"
          style={{ width: '60%', border: 'solid 0.5px', fontSize: '15px' }}
        >
          <tbody>
            <tr className="table" style={{ borderBottom: 'solid 0.5px', height: '50px' }}>
              <th className="m-3">#id</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            {fetchedEmpDet &&
              fetchedEmpDet.map((details) => (
                <tr key={details.id}>
                  <td>{details.id}</td>
                  <td>{details.username}</td>
                  <td>{details.email}</td>
                  <td>
                    {details.status}
                  </td>
                  <td>
                    <button
                      onClick={() => handleShow(details)}
                      className="btn btn-success me-3"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteEmp(details.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Display;
