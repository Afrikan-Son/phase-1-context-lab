/* Your Code Here */

function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

const employeeData = ["John", "Doe", "Manager", 25];
const employeeRecord = createEmployeeRecord(employeeData);
console.log(employeeRecord);








function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(employeeData => createEmployeeRecord(employeeData));
}
  






function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");

    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });

    return employeeRecord;
}
  




function createTimeOutEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  });
  return employeeRecord;
}







function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
}
  






function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wagesEarned = hoursWorked * employeeRecord.payPerHour;
    return wagesEarned;
}








function allWagesFor(employeeRecord) {
    let totalWages = 0;
    employeeRecord.timeInEvents.forEach(timeInEvent => {
      const date = timeInEvent.date;
      const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
      totalWages += wagesEarned;
    });
    return totalWages;
}
 







function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(record) {
      return record.firstName === firstName;
    });
}

  




function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;
    employeeRecords.forEach(function(record) {
      totalPayroll += allWagesFor(record);
    });
    return totalPayroll;
}
  


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

