'use server';
import { RegisterSchema } from './zod';
import { hashSync } from 'bcrypt-ts';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

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
