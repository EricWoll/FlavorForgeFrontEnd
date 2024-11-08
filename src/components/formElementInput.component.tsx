import { ReactNode } from 'react';

export default function FormElementInput({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <section className="py-12 dark:bg-dark">
            <div className="container">
                <div className="flex flex-wrap">{children}</div>
            </div>
        </section>
    );
}

export function FormColumn({ children }: { children: ReactNode }) {
    return (
        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-12">{children}</div>
        </div>
    );
}

export function FormEmailInput() {
    return (
        <>
            <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                Email
            </label>
            <div className="relative">
                <input
                    type="email"
                    placeholder="JohnDevin@yourmail.com"
                    className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
                />
                <span className="absolute top-1/2 left-4 -translate-y-1/2">
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g
                            opacity={0.8}
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#9CA3AF"
                        >
                            <path d="M3.334 4.167A.838.838 0 0 0 2.501 5v10c0 .456.377.833.833.833h13.333a.838.838 0 0 0 .834-.833V5a.838.838 0 0 0-.834-.833H3.334ZM.834 5c0-1.377 1.123-2.5 2.5-2.5h13.333c1.377 0 2.5 1.123 2.5 2.5v10c0 1.377-1.123 2.5-2.5 2.5H3.334a2.505 2.505 0 0 1-2.5-2.5V5Z" />
                            <path d="M.985 4.522a.833.833 0 0 1 1.16-.205l7.856 5.499 7.855-5.5a.833.833 0 1 1 .956 1.366l-8.333 5.833a.833.833 0 0 1-.956 0L1.19 5.682a.833.833 0 0 1-.205-1.16Z" />
                        </g>
                    </svg>
                </span>
            </div>
        </>
    );
}

export function FormUsernameInput() {
    return (
        <>
            <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                Name
            </label>
            <div className="relative">
                <input
                    type="text"
                    placeholder="JohnDevin"
                    className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
                />
                <span className="absolute top-1/2 left-4 -translate-y-1/2">
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.72 12.886a4.167 4.167 0 0 1 2.947-1.22h6.666a4.167 4.167 0 0 1 4.167 4.167v1.666a.833.833 0 1 1-1.667 0v-1.666a2.5 2.5 0 0 0-2.5-2.5H6.667a2.5 2.5 0 0 0-2.5 2.5v1.666a.833.833 0 1 1-1.667 0v-1.666a4.17 4.17 0 0 1 1.22-2.947ZM10 3.333a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm-4.166 2.5a4.167 4.167 0 1 1 8.333 0 4.167 4.167 0 0 1-8.333 0Z"
                            opacity={0.8}
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#9CA3AF"
                        />
                    </svg>
                </span>
            </div>
        </>
    );
}
