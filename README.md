# REST Scheduler API
Code challenge for Associate Full Stack Engineer position with When I Work.

## User Stories

- [x] As an employee, I want to know when I am working, by being able to see all of the shifts assigned to me. 
- Example url = localhost:5005/employee/empSchedule?employee_id=3
- [x] As an employee, I want to know who I am working with, by being able to see the employees that are working during the same time period as me. 
- Example url = localhost:5005/employee/coworkers/?shift_id=1
- [ ] As an employee, I want to know how much I worked, by being able to get a summary of hours worked for each week.
- [x] As an employee, I want to be able to contact my managers, by seeing manager contact information for my shifts. 
- Example url = localhost:5005/employee/managerInfo?employee_id=5
- [x] As a manager, I want to schedule my employees, by creating shifts for any employee.
- Example url = localhost:5005/manager/addShift?manager_id=1&employee_id=4&start_time=2018-02-19T15:00:00.000Z&end_time=2018-02-19T19:00:00.000Z
- [x] As a manager, I want to see the schedule, by listing shifts within a specific time period. 
- Example url = localhost:5005/manager/scheduleByDate?start=2018-02-19&end=2018-02-25
- [x] As a manager, I want to be able to change a shift, by updating the time details.
- Example url = localhost:5005/manager/updateTime?id=1&start_time='2018-02-19 10:00:00'&end_time='2018-02-19 18:00:00'
- [x] As a manager, I want to be able to assign a shift, by changing the employee that will work a shift.
- Example url = localhost:5005/manager/changeEmployee?id=2&employee_id=4
- [x] As a manager, I want to contact an employee, by seeing employee details.
- Example url = localhost:5005/manager/empInfo