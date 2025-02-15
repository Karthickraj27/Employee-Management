import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createEmployee, getEmployeeById, updateEmployee } from '../Services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams(); // Retrieves the ID from the URL
  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  const navigator = useNavigate();

  // Fetch employee data if ID is present (for update)
  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => {
          const { firstname, lastname, email } = response.data;
          console.log('Fetched employee for update:', response.data); // Debugging log
          setFirstName(firstname);
          setLastName(lastname);
          setEmail(email);
        })
        .catch((error) => {
          console.error('Error fetching employee data:', error);
        });
    }
  }, [id]);

  // Handle save or update operation
  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstname, lastname, email };

      if (id) {
        // Update employee
        updateEmployee(id, employee)
          .then(() => {
            console.log('Employee updated successfully:', employee);
            navigator('/employees');
          })
          .catch((error) => {
            console.error('Error updating employee:', error);
          });
      } else {
        // Create new employee
        createEmployee(employee)
          .then(() => {
            console.log('Employee created successfully:', employee);
            navigator('/employees');
          })
          .catch((error) => {
            console.error('Error creating employee:', error);
          });
      }
    }
  };

  // Form validation logic
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstname.trim()) {
      errorsCopy.firstname = '';
    } else {
      errorsCopy.firstname = 'First Name is required';
      valid = false;
    }

    if (lastname.trim()) {
      errorsCopy.lastname = '';
    } else {
      errorsCopy.lastname = 'Last Name is required';
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">{id ? 'Update Employee' : 'Add Employee'}</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">First Name:</label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    value={firstname}
                    className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstname && (
                    <div className="invalid-feedback">{errors.firstname}</div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastname}
                    className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {errors.lastname && (
                    <div className="invalid-feedback">{errors.lastname}</div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
                  {id ? 'Update' : 'Submit'}
                </button>
                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => navigator('/employee')}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
