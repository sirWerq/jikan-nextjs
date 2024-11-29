'use client';
import { useState } from 'react';
import { Register } from '../api/backend/controllers/authController';

export default function RegisterPage() {
    const [data, setData] = useState({ username: '', email: '', password: '' });

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Register();
    };

    return (
        <div className='w-full h-screen flex justify-center items-center pt-[64px]'>
            <div className='container flex flex-col items-center'>
                <form
                    className='w-[100%] lg:w-[60%] flex flex-col items-center p-2 gap-4'
                    onSubmit={handleRegister}
                >
                    <h1 className='font-semibold text-xl'>Register</h1>
                    <div className='flex flex-col w-[70%]'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            placeholder='Username'
                            className='p-1 rounded-lg focus:ring-tertiary focus:ring-1 focus:outline-none'
                            onChange={(e) =>
                                setData({ ...data, username: e.target.value })
                            }
                            autoComplete='off'
                            required
                        />
                    </div>
                    <div className='flex flex-col w-[70%]'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Email'
                            className='p-1 rounded-lg focus:ring-tertiary focus:ring-1 focus:outline-none'
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                            autoComplete='off'
                            required
                        />
                    </div>
                    <div className='flex flex-col w-[70%]'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Password'
                            className='p-1 rounded-lg focus:ring-tertiary focus:ring-1 focus:outline-none'
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                            autoComplete='off'
                            required
                        />
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='bg-tertiary border p-3 rounded-md text-white'
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
