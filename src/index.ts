// note: custom class type with default primitive variables and an optional variable of an array of other courses to handle multiple current courses enrolled
// optional variables allow flexibility on assignment for new objects  
type Course = {title: string, category: string, description: string, prerequisites?: Course[]};

// Example 1: no prerequisites 
let course = {title: 'Calculus 1', category: 'Mathematics', description: 'Introduction to derivatives and intergrals'}
// Example 2: optional prerequisite argument variable used
let course2 = {title: 'Calculus 2', category: 'Mathematics', description: 'Intermediate derivatives and intergrals', 
    prequisites: course
};

type Student = {name: string, id: number};
type Teacher = {name: string, courses: Course[]};
type Admin = {name: string, department: string};

// Note: TypeScript allows us to use a union type which gives us the ability to work with objects more generally
type User = Student | Teacher | Admin;

// enum lists all possible states of enrollment
enum enrollmentStatus {
    Submitted,
    Pending,
    Enrolled,
    Cancelled,
    Rejected
}

type Enrolment = {student: Student, courses: Course[], status: enrollmentStatus}

// Note: we can define multiple function signatures for the same method with function overloading which allows greater flexibility
// Example - in this case, we can create either a single new Teacher or an array of them 

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

// Note: by taking a union type, this function has the flexibility to change the name of any sub-type of User
// however, the function doesn't know what sub-type of user it has, which is fine in this case, but we will see later how generics can be used for greater type consistency
function changeName(user: User, name: string): User {
    user.name = name;
    return user;
}

// example student
let student = {name: 'Bob', id: 12345}

let enrolment: Enrolment = {student: student, courses: [course], status: enrollmentStatus.Enrolled};

// Note: Generics will be used to offer flexibility and remove the need for multiple function definitions for similar tasks 
// Example: in this case, we can add a course to either a student enrollment or a teacher's current allocation using the same function
// this maintains consistency between the variable input and output type
function addCourse <T extends {courses: Course[]}>(arg: T, course: Course): T {
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

