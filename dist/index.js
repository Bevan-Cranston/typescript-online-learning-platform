"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Example 1: no prerequisites 
let course = { title: 'Calculus 1', category: 'Mathematics', description: 'Introduction to derivatives and intergrals' };
// Example 2: optional prerequisite argument variable used
let course2 = { title: 'Calculus 2', category: 'Mathematics', description: 'Intermediate derivatives and intergrals',
    prequisites: course
};
// enum lists all possible states of enrollment
var enrollmentStatus;
(function (enrollmentStatus) {
    enrollmentStatus[enrollmentStatus["Submitted"] = 0] = "Submitted";
    enrollmentStatus[enrollmentStatus["Pending"] = 1] = "Pending";
    enrollmentStatus[enrollmentStatus["Enrolled"] = 2] = "Enrolled";
    enrollmentStatus[enrollmentStatus["Cancelled"] = 3] = "Cancelled";
    enrollmentStatus[enrollmentStatus["Rejected"] = 4] = "Rejected";
})(enrollmentStatus || (enrollmentStatus = {}));
// Note: by taking a union type, this function has the flexibility to change the name of any sub-type of User
function changeName(user, name) {
    user.name = name;
    return user;
}
// example student
let student = { name: 'Bob', id: 12345 };
let enrolment = { student: student, courses: [course], status: enrollmentStatus.Enrolled };
// example teacher
let teacher = { name: 'Alice', courses: [course] };
// Note: Generics will be used to offer flexibility and remove the need for multiple function definitions for similar tasks 
// Example: in this case, we can add a course to either a student enrollment or a teacher's current allocation using the same function
// this maintains consistency between the variable input and output type
function addCourse(arg, course) {
    arg.courses.push(course);
    return arg;
}
// student example
console.log(enrolment);
addCourse(enrolment, course2);
console.log(enrolment);
// teacher example
console.log(teacher);
addCourse(teacher, course2);
console.log(teacher);
//# sourceMappingURL=index.js.map