// Your code here
// index.js

// create a single employee record from an array
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

// create multiple employee records from arrays
function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord)
}

// add a TimeIn event
function createTimeInEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ")
  employee.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10)
  })
  return employee
}

// add a TimeOut event
function createTimeOutEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ")
  employee.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10)
  })
  return employee
}

// calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
  const inEvent = employee.timeInEvents.find(e => e.date === date)
  const outEvent = employee.timeOutEvents.find(e => e.date === date)
  return (outEvent.hour - inEvent.hour) / 100
}

// calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

// calculate total wages for an employee
function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, e) => {
    return total + wagesEarnedOnDate(employee, e.date)
  }, 0)
}

// calculate payroll for all employees
function calculatePayroll(employees) {
  return employees.reduce((total, e) => total + allWagesFor(e), 0)
}

// export functions so tests can access them
module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  calculatePayroll
}

