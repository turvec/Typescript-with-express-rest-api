import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'password is required',
        }).min(6, "Too short -- not less than 6"),
        passwordConfirmation: string({
            required_error: 'passwordConfirmation is required',
        }),
        email: string({
            required_error: 'email is required',
        }).email('Not a valid email'),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    })
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>;