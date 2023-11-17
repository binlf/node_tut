//// const data = {
////     employees: require('../model/employees.json'),
////     setEmployees: function (data) { this.employees = data }
//// }
const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
  //// res.json(data.employees);
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ message: 'No employees found' });
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  ////   const newEmployee = {
  ////     id: data.employees?.length
  ////       data.employees[data.employees.length - 1].id + 1
  // //      : 1,
  ////     firstname: req.body.firstname,
  // //    lastname: req.body.lastname,
  ////   };
  if (!req?.body.firstname || !req?.body.lastname) {
    return res
      .status(400)
      .json({ message: 'First and last names are required' });
  }

  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }

  ////   if (!newEmployee.firstname || !newEmployee.lastname) {
  ////     return res
  ////       .status(400)
  ////       .json({ message: 'First and last names are required.' });
  ////  }

  ////   data.setEmployees([...data.employees, newEmployee]);
  ////   res.status(201).json(data.employees);
};

const updateEmployee = async (req, res) => {
  ////   const employee = data.employees.find(
  ////     (emp) => emp.id === parseInt(req.body.id)
  ////   );
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID param is required' });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No Employee matches ID ${req.body.id}` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  ////   const filteredArray = data.employees.filter(
  ////     (emp) => emp.id !== parseInt(req.body.id)
  ////   );
  ////   const unsortedArray = [...filteredArray, employee];
  ////   data.setEmployees(
  ////     unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  ////   );
  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: 'Employee ID required' });
  ////   const employee = data.employees.find(
  ////     (emp) => emp.id === parseInt(req.body.id)
  ////   );
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No Employee matches ID ${req.body.id}` });
  }
  ////   const filteredArray = data.employees.filter(
  ////     (emp) => emp.id !== parseInt(req.body.id)
  ////   );
  ////   data.setEmployees([...filteredArray]);
  const result = await employee.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Employee ID required' });
  ////   const employee = data.employees.find(
  ////     (emp) => emp.id === parseInt(req.params.id)
  ////   );
  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No Employee matches ID ${req.body.id}` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
