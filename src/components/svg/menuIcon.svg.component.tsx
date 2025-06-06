import { MouseEventHandler } from 'react';

export default function MenuIcon({
    className,
    fill = '#353E47',
    onClick,
}: {
    className?: string;
    fill?: string;
    onClick?: MouseEventHandler<SVGSVGElement>;
}) {
    return (
        <svg
            onClick={onClick}
            className={className}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3.33337 9.99967C3.33337 9.0792 4.07957 8.33301 5.00004 8.33301H35C35.9205 8.33301 36.6667 9.0792 36.6667 9.99967C36.6667 10.9201 35.9205 11.6663 35 11.6663H5.00004C4.07957 11.6663 3.33337 10.9201 3.33337 9.99967Z"
                fill={fill}
            />
            <path
                d="M3.33337 19.9997C3.33337 19.0792 4.07957 18.333 5.00004 18.333H35C35.9205 18.333 36.6667 19.0792 36.6667 19.9997C36.6667 20.9201 35.9205 21.6663 35 21.6663H5.00004C4.07957 21.6663 3.33337 20.9201 3.33337 19.9997Z"
                fill={fill}
            />
            <path
                d="M5.00004 28.333C4.07957 28.333 3.33337 29.0792 3.33337 29.9997C3.33337 30.9201 4.07957 31.6663 5.00004 31.6663H35C35.9205 31.6663 36.6667 30.9201 36.6667 29.9997C36.6667 29.0792 35.9205 28.333 35 28.333H5.00004Z"
                fill={fill}
            />
        </svg>
    );
}
