// Note: custom object type Course with default primitive variables and an optional variable of an array of other Course objects for flexibility to handle the case where one or many prerequisite courses are required:
type Course = {title: string, category: string, description: string, prerequisites?: Course[]};
// Note: function createCourse with default and optional parameters allows flexibility to handle multiple different uses:
function createCourse(title: string, category: string, description: string, prerequisites?: Course[]): Course {
    if (typeof prerequisites === "undefined") {
        return {title: title, category: category, description: description};
    } 
    return {title: title, category: category, description: description, prerequisites: prerequisites as Course[]};
}
// For example, Calculus 1 has no prerequisites so we leave out the optional parameter ‘prerequisites’ when we call the createCourse function to instantiate a new Course object:
const course = createCourse('Calculus 1', 'Mathematics', 'Introduction to derivatives and intergrals');
// In this example, Calculus 2 has the prerequisite of Calculus 1 so the optional ‘prerequisites’ parameter is used when calling createCourses:
const course2 = createCourse('Calculus 2', 'Mathematics', 'Intermediate derivatives and intergrals', [course]);
// enum lists all possible states of enrolment
enum enrollmentStatus {
    Submitted,
    Pending,
    Enrolled,
    Cancelled,
    Rejected
}
// Custom object types defined to handle the various user categories in the Edutech system: 
type Student = {name: string, id: number};
// Note: courses is defined as an array since each teacher may have one or many courses assigned to them
type Teacher = {name: string, courses: Course[]};
type Admin = {name: string, department: string};
// Custom object type to handle enrolment which takes the custom object type Student as well as an array of the custom object type Course and our enum for enrolment status, combining powerful type concepts into a unified Enrollment data structure capable of handling complex operations to manage enrolments. 
type Enrolment = {student: Student, courses: Course[], status: enrollmentStatus}
// Note: TypeScript allows us to use a union type which gives us the ability to work with objects more generally:
type User = Student | Teacher | Admin;
// For example, our changeName function helps us manage the Student, Teacher and Admin objects by taking an input of the union type User and outputting a variable of union type User, creating clean and readable code
function changeName(user: User, name: string): User {
    user.name = name;
    return user;
}
// however, the function doesn't know what sub-type of user it has, which is fine in this case, but we will see later how generics can be used for greater type consistency
// Note: we can define multiple function signatures for the same method with function overloading which allows greater flexibility
// Example - in this case, we can create either a single new Teacher or an array of them with the addTeachers function: 
function addTeachers(name: string, courses: Course[]): Teacher;
function addTeachers(names: string[], coursesList: Course[][]): Teacher[];

function addTeachers(
        nameOrNames: string | string[],
        coursesOrCoursesList: Course[] | Course[][]
) : Teacher | Teacher[] {
    // using type narrowing
    if (typeof nameOrNames === "string") {
        return {name: nameOrNames, courses: coursesOrCoursesList as Course[]};
    } 
    // Type assertion now we know which overload we are implementing
    const coursesList = coursesOrCoursesList as Course[][];
    // Check to make sure the array lengths are equal
    if (nameOrNames.length !== coursesList.length) {
        throw new Error("Each teacher must have a corresponding course list.");
    }
    const teachers: Teacher[] = [];
    for (let i = 0; i < nameOrNames.length; i++) {
        teachers.push({name: nameOrNames[i]!, courses: coursesList[i]!})
    }
    return teachers;
}

// example teacher
let teacher = addTeachers('Alice', [course]);

// example teachers
let teachers = addTeachers(['Alice', 'Bob'], [[course], [course2]]);

// example student
let student = {name: 'Bob', id: 12345}

let enrolment: Enrolment = {student: student, courses: [], status: enrollmentStatus.Pending};

// Note: Generics will be used to offer flexibility and remove the need for multiple function definitions for similar tasks. This also allows us to maintain consistency between the input variables and output variables for greater type safety and error prevention
// For example: in this case, with the same addCourse function, we can add a course to a student to manage their enrolment, or to a teacher to allocate it to them:
function addCourse <T extends {courses: Course[]}>(arg: T, course: Course): T {
    arg.courses.push(course);
    // Note: although generics take multiple types, we can still perform actions for specific types  using type narrowing
    // For example - here we set the status of a student's enrollment to enrolled
    if ('status' in arg) {
        arg.status = enrollmentStatus.Enrolled;
    }
    return arg;
}

// In this example, we remove a course from either a teacher's allocation or from a student's enrollment
function removeCourse <T extends {courses: Course[]}>(arg: T, course: Course): T {
    // Recreate the courses array removing the selected course
    const updatedcourses = arg.courses.filter(item => item !== course);
    if (updatedcourses.length === arg.courses.length){
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
