import React, { useEffect, useState } from 'react';
import { listEmployees, deleteEmployee } from '../Services/EmployeeService';

import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is loaded

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    // Fetch employees data from the API
    listEmployees()
      .then((response) => {
        console.log('Fetched employees:', response.data); // Debugging log
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  function addNewEmployee() {
    navigator('/add-employee');
  }

  function updateEmployee(id) {
    navigator(`/update-employee/${id}`);
  }

  function removeEmployee(id) {
    console.log('Deleting employee with ID:', id); // Debugging log
    // Call the delete API function
    deleteEmployee(id)
      .then(() => {
        console.log('Employee deleted successfully');
        // Refresh the employee list
        setEmployees(employees.filter(employee => employee.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Employees</h2>
      <button className="btn btn-primary mb-3" onClick={addNewEmployee}>
        Add Employee
      </button>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
                <td>
                  <button
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#17a2b8', // Bootstrap "info" color
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => updateEmployee(employee.id)}
                  >
                    Update
                  </button>
                  {/* Add delete button */}
                  <button
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#dc3545', // Bootstrap "danger" color
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginLeft: '10px',
                    }}
                    onClick={() => removeEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
