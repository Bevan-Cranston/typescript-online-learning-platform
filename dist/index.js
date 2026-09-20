"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Note: function createCourses with default and optional parameters allows flexibility to handle multiple different uses:
function createCourse(title, category, description, prerequisites) {
    if (typeof prerequisites === "undefined") {
        return { title: title, category: category, description: description };
    }
    return { title: title, category: category, description: description, prerequisites: prerequisites };
}
// For example, Calculus 1 has no prerequisites so we leave out the optional parameter ‘prerequisites’ when we call the createCourse function to instantiate a new Course object:
const course = createCourse('Calculus 1', 'Mathematics', 'Introduction to derivatives and intergrals');
// In this example, Calculus 2 has the prerequisite of Calculus 1 so the optional ‘prerequisites’ parameter is used when calling createCourses:
const course2 = createCourse('Calculus 2', 'Mathematics', 'Intermediate derivatives and intergrals', [course]);
// enum lists all possible states of enrolment
var enrollmentStatus;
(function (enrollmentStatus) {
    enrollmentStatus[enrollmentStatus["Submitted"] = 0] = "Submitted";
    enrollmentStatus[enrollmentStatus["Pending"] = 1] = "Pending";
    enrollmentStatus[enrollmentStatus["Enrolled"] = 2] = "Enrolled";
    enrollmentStatus[enrollmentStatus["Cancelled"] = 3] = "Cancelled";
    enrollmentStatus[enrollmentStatus["Rejected"] = 4] = "Rejected";
})(enrollmentStatus || (enrollmentStatus = {}));
// For example, our changeName function helps us manage the Student, Teacher and Admin objects by taking an input of the union type User and outputting a variable of union type User, creating clean and readable code
function changeName(user, name) {
    user.name = name;
    return user;
}
function addTeachers(nameOrNames, coursesOrCoursesList) {
    // using type narrowing
    if (typeof nameOrNames === "string") {
        return { name: nameOrNames, courses: coursesOrCoursesList };
    }
    // Type assertion now we know which overload we are implementing
    const coursesList = coursesOrCoursesList;
    // Check to make sure the array lengths are equal
    if (nameOrNames.length !== coursesList.length) {
        throw new Error("Each teacher must have a corresponding course list.");
    }
    const teachers = [];
    for (let i = 0; i < nameOrNames.length; i++) {
        teachers.push({ name: nameOrNames[i], courses: coursesList[i] });
    }
    return teachers;
}
// example teacher
let teacher = addTeachers('Alice', [course]);
// example teachers
let teachers = addTeachers(['Alice', 'Bob'], [[course], [course2]]);
// example student
let student = { name: 'Bob', id: 12345 };
let enrolment = { student: student, courses: [], status: enrollmentStatus.Pending };
// Note: Generics will be used to offer flexibility and remove the need for multiple function definitions for similar tasks. This also allows us to maintain consistency between the input variables and output variables for greater type safety and error prevention
// For example: in this case, with the same addCourse function, we can add a course to a student to manage their enrolment, or to a teacher to allocate it to them:
function addCourse(arg, course) {
    arg.courses.push(course);
    // Note: although generics take multiple types, we can still perform actions for specific types  using type narrowing
    // For example - here we set the status of a student's enrollment to enrolled
    if ('status' in arg) {
        arg.status = enrollmentStatus.Enrolled;
    }
    return arg;
}
// In this example, we remove a course from either a teacher's allocation or from a student's enrollment
function removeCourse(arg, course) {
    // Recreate the courses array removing the selected course
    const updatedcourses = arg.courses.filter(item => item !== course);
    if (updatedcourses.length === arg.courses.length) {
        console.log("Course not found - nothing removed");
    }
    arg.courses = updatedcourses;
    // if this is a student and we have removed all courses from their enrollment we set the status to pending
    if ('status' in arg) {
        if (arg.courses.length == 0)
            arg.status = enrollmentStatus.Pending;
    }
    return arg;
}
// student example
console.log(enrolment);
addCourse(enrolment, course);
console.log(enrolment);
// student remove example
console.log(enrolment);
removeCourse(enrolment, course);
console.log(enrolment);
// teacher example
console.log(teacher);
addCourse(teacher, course2);
console.log(teacher);
//# sourceMappingURL=index.js.map