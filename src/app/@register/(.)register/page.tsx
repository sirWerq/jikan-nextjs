'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function ModalRegisterPage() {
    const [data, setData] = useState({ username: '', email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const quitModal = useRef(null);
    const router = useRouter();

    const clickModal = (e: any) => {
        if (e.target === quitModal.current) {
            router.back();
        }
    };

    const handleChangeData = (e: any) => {
        const { name, value } = e.target;
        setData((data) => ({
            ...data,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await axios.post('/api/register', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return res;
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || 'Registration failed.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    return (
        <div
            ref={quitModal}
            className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-black bg-opacity-60'
            onClick={clickModal}
        >
            <div className='bg-primary w-[40%] p-4 rounded-lg'>
                <form
                    className='flex flex-col items-center p-2 gap-4'
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
                            onChange={handleChangeData}
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
                            onChange={handleChangeData}
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
                            onChange={handleChangeData}
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
        </div>
    );
}
