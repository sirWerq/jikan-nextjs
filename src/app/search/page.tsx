'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState('');

    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setSearch(query);
        }
    }, [searchParams]);

    return (
        <div className='w-full h-full flex justify-center pt-[64px]'>
            <div className='container'>
                <h1 className='font-semibold text-3xl border-b-secondary border-b-2 py-4'>
                    Hasil Pencarian : {search}
                </h1>
                <div className='flex gap-4 border-b-secondary border-b-2'>
                    <span>Anime</span>
                    <span>Manga</span>
                </div>
                <div>
                    <p>test</p>
                </div>
            </div>
        </div>
    );
}
