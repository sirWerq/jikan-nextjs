'use server';
import { RegisterSchema, SignInSchema } from './zod';
import { hashSync } from 'bcrypt-ts';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';

export const SignUpCredentials = async (
    prevState: unknown,
    formData: FormData
) => {
    const validateFields = RegisterSchema.safeParse(
        Object.fromEntries(formData.entries())
    );
    if (!validateFields.success) {
        return {
            error: validateFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validateFields.data;
    const hashedPassword = hashSync(password, 10);

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return { message: 'Failed to register user' };
    }
    redirect('/login');
};

export const signInCredentials = async (
    prevstate: unknown,
    formData: FormData
) => {
    const validateFields = SignInSchema.safeParse(
        Object.fromEntries(formData.entries())
    );
    if (!validateFields.success) {
        return {
            error: validateFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = validateFields.data;

    try {
        await signIn('credentials', { email, password, redirectTo: '/' });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { message: 'Invalid Credentials.' };
                default:
                    return { message: 'Something went wrong' };
            }
        }
        throw error;
    }
};
