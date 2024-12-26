'use client';
import Link from 'next/link';
import { signInCredentials } from '@/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { useState } from 'react';

export default function LoginPage() {
    const [state, formAction] = useFormState(signInCredentials, null);
    const [lookPassword, setLookPassword] = useState(false);
    const { pending } = useFormStatus();

    const handleLookPassword = () => {
        setLookPassword((prev) => !prev);
    };

    return (
        <div className='container flex flex-col h-screen justify-center items-center'>
            <h1 className='font-semibold text-xl'>Login</h1>
            <form
                action={formAction}
                className='w-[100%] lg:w-[60%] flex flex-col items-center p-2 gap-4'
            >
                {state?.message && (
                    <div
                        className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 w-full'
                        role='alert'
                    >
                        <span className='font-medium'>{state?.message}</span>
                    </div>
                )}
                <div className='flex flex-col w-[70%]'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='your email'
                        className='p-1 rounded-lg ring-primary ring-2 focus:outline-none focus:ring-sky-500 w-[95%]'
                        autoComplete='off'
                    />
                    <div aria-live='polite' aria-atomic='true'>
                        <span className='text-sm text-red-500 mt-2 ml-1'>
                            {state?.error?.email}
                        </span>
                    </div>
                </div>
                <div className='flex flex-col w-[70%]'>
                    <label htmlFor='password'>Password</label>
                    <div className='flex items-center'>
                        <input
                            type={lookPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            placeholder='******'
                            className='p-1 rounded-lg ring-primary ring-2 focus:outline-none focus:ring-sky-500 w-[95%]'
                            autoComplete='off'
                        />
                        <span
                            className='ml-1 cursor-pointer'
                            onClick={handleLookPassword}
                        >
                            {lookPassword ? '🕶️' : '👁️'}
                        </span>
                    </div>
                    <div aria-live='polite' aria-atomic='true'>
                        <span className='text-sm text-red-500 mt-2 ml-1'>
                            {state?.error?.password}
                        </span>
                    </div>
                </div>
                <div>
                    <button
                        type='submit'
                        disabled={pending}
                        className='bg-tertiary border p-3 rounded-md text-white bg-primary active:bg-primary/70'
                    >
                        {pending ? 'Authenticating...' : 'Login'}
                    </button>
                </div>
            </form>
            <div className='text-center'>
                <p className='text-sm font-light text-gray-500'>
                    Don&apos;t have an account yet?
                </p>
                <Link
                    href='/register'
                    className='font-medium pl-1 text-blue-600 hover:text-blue-700'
                >
                    Sign Up here
                </Link>
            </div>
        </div>
    );
}
