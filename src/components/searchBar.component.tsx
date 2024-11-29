'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

export default function SearchBar({
    searchParam,
    setSearchParam,
}: {
    searchParam: string | null;
    setSearchParam: Dispatch<SetStateAction<string>>;
}): ReactNode {
    const Router = useRouter();
    const path = usePathname();

    const [searchString, setSearchString] = useState<string>('');

    const handleSubmit = () => {
        setSearchParam(searchString);
        Router.replace(path + `?search=${searchParam}`);
    };

    return (
        <div className="w-full flex flex-row flex-nowrap">
            <div className="relative w-full">
                <input
                    type="text"
                    className="w-full backdrop-blur-sm placeholder-grayscale-500 text-grayscale-500 bg-grayscale-900 py-2 pl-10 pr-4 rounded-full focus:outline-none border-2 border-grayscale-900 focus:border-grayscale-500 transition-colors duration-300"
                    placeholder="Search..."
                    value={searchString}
                    onChange={(event) => {
                        setSearchString(event.target.value);
                    }}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                        className="w-4 h-4 text-grayscale-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="bg-gray-300 inset-y-0 rounded-full px-2 mx-2 cursor-pointer"
            >
                Search
            </button>
        </div>
    );
}
