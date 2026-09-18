## Edutech Systems Online Learning Platform in TypeScript

Proposed by: Bevan Cranston

Key requirements:
•	Type Safety
•	Reusability
•	Maintainability

System components to manage:
•	Users
•	Courses
•	Enrolments


Core types like string, number and Boolean will be used throughout to handle basic data. Also, as shown above, custom objects will be created such as Student and Teacher. Some objects will have arrays as well, for example a teacher may have multiple courses and so inside a teacher object there will be an array courses, which will also be strictly typed to contain only courses.

Where required, functions will use generics for increased flexibility while maintaining type consistency versus functions that work on union types. For example, even though generally fine in this case, our changeName function does not know or maintain the subtype of User. Whereas with the addCourse method we know if it was passed an Enrolment, that is what is returned.

In all cases Typescript checks consistency of function input and return types at compile time to prevent errors at this stage. This is a key advantage of TypeScript vs JavaScript where these errors are likely to pop up at runtime.
Key compiler arguments in tsconfig.json are module, where we define the version of nodejs being used, in this case nodenext, also target, which defines the version of typescript used in this case es2022, and other key settings like noImplicitAny. When set to true, noImplicitAny avoids letting variables assign to any to increase type safety. 

Also, inside tsconfig.json strict is set to True to enforce full type safety. This will ensure code safety by removing chances for unexpected variable types to be added. Also, this makes typing explicit for increased readability, improving maintainability. Strict typing will also provide better scalability for production where strange values can creep in.

Use of union types and generics add to the scalability of the system as well. For example, the type User can be reused across new functions and narrowed to specific subtypes such as Teacher, Student or Admin, where required. This ability to reason over variable types is one of the key features of TypeScript. 
