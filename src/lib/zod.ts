import { object, string } from 'zod';

export const RegisterSchema = object({
    name: string().min(1, 'Name must be more than 1 Characters'),
    email: string().email('Invalid Email'),
    password: string()
        .min(8, 'Password must be more than 8 Characters')
        .max(32, 'Password must be less than 32 Characters'),
    confirmPassword: string()
        .min(8, 'Password must be more than 8 Characters')
        .max(32, 'Password must be less than 32 Characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'password does not match',
    path: ['confirmPassword'],
});

export const SignInSchema = object({
    email: string().email('Invalid Email'),
    password: string()
        .min(8, 'Password must be more than 8 Characters')
        .max(32, 'Password must be less than 32 Characters'),
});
