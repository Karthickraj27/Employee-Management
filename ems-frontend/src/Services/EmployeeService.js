import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

// Get all employees
export const listEmployees = () => axios.get(REST_API_BASE_URL);

// Create a new employee
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

// Get an employee by ID
export const getEmployeeById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

// Update an employee
export const updateEmployee = (id, employee) => axios.put(`${REST_API_BASE_URL}/${id}`, employee);

export const getEmployee=(employeeId)=>axios.get(REST_API_BASE_URL +'/'+employeeId);

