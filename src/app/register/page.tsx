'use client';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
    const [data, setData] = useState({ username: '', email: '', password: '' });
    const [isSubmitting, setIsSubmittiong] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmittiong(false);
        try {
            const res = await axios.post(
                'http://localhost:3000/api/register',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return res;
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || 'Registration failed.');
        } finally {
            setIsSubmittiong(true);
        }
    };

    return (
        <div className='container flex flex-col h-screen justify-center items-center'>
            <form
                className='w-[100%] lg:w-[60%] flex flex-col items-center p-2 gap-4'
                onSubmit={handleSubmit}
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
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    );
}
