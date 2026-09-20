
# Edutech Systems Online Learning Platform in TypeScript

Proposed by: Bevan Cranston

## Key requirements

- Type Safety
- Reusability
- Maintainability

## System components to manage

- Users
- Courses
- Enrolments

## TypeScript design decisions

Where required, functions will use generics for increased flexibility while maintaining type consistency versus functions that work on union types. For example, even though generally fine in this case, our `changeName` function does not know or maintain the subtype of `User`. Whereas with the `addCourse` method we know if it was passed an `Enrolment`, that is what is returned.

TypeScript checks consistency of function input and return types at compile time to prevent errors at this stage. This is a key advantage of TypeScript vs JavaScript where these errors may only pop up at runtime.

## TypeScript compiler configuration

Key compiler arguments in `tsconfig.json` are `module`, where we define what JavaScript module level behaviour is used in the compiled output files, in this case `nodenext`, also `target`, which defines the version of JavaScript syntax it should target in the output code, in this case `es2022`.

Also, with `strict = true` we get additional type safety by automatically setting other flags like `noImplicitAny` to true. When set to true, `noImplicitAny` avoids letting TypeScript infer variables as `any` if more concrete definitions aren’t provided.

In this project we have used type annotations for all function and object declarations, to further reduce the chances of running into issues with unexpected `any`s. `any` is the most flexible but least safe type, essentially defaulting to similar treatment as JavaScript.

With `strict = true` we are forced to better handle null variables e.g. `let name: string = null` is not allowed unless we define it as a union variable.

More strict typing makes code more explicit for increased readability, improving maintainability. Strict typing will also provide better scalability for production where there is a greater chance of user’s providing unexpected inputs.

### Example tsconfig.json snippet

```jsonc
{
    // Stricter Typechecking Options

    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Style Options

    "noImplicitAny": true,
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options

    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
}
```

On larger projects, a central `tsconfig.json` allows us to maintain the same compiler settings across multiple source code files helping to keep compilation consistent.

### Example: noUncheckedIndexedAccess

In our case `noUncheckedIndexedAccess = true` meant that we had to enforce in code that a certain variable is not undefined:

```ts
for (let i = 0; i < nameOrNames.length; i++) {
    teachers.push({
        name: nameOrNames[i]!,
        courses: coursesList[i]!
    });
}
```

This was because the compiler couldn’t rule out that elements in `nameOrNames` or `coursesList` would be undefined so we had to explicitly account for this and force TypeScript to assume the variable is defined.

## Scalability and reusability

Use of union types and generics also add to the scalability of the system. For example, the type `User` can be reused across new functions and narrowed to specific subtypes such as `Teacher`, `Student` or `Admin`, where required. This ability to reason over variable types is one of the key features of TypeScript.