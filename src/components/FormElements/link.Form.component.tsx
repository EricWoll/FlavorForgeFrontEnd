import Link from 'next/link';

export default function FormLink({
    href,
    linkText,
}: {
    href: string;
    linkText: string;
}) {
    return (
        <Link
            href={href}
            className={`flex justify-center items-center w-full bg-transparent rounded-md border border-stroke py-1 text-dark-6 transition disabled:cursor-default disabled:bg-slate-800`}
        >
            {linkText}
        </Link>
    );
}
