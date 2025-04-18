import { MouseEventHandler } from 'react';

export default function LeftArrowIcon({
    className,
    fill = '#353E47',
}: {
    className?: string;
    fill?: string;
}) {
    return (
        <svg
            className={className}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21.1783 9.51193C21.8292 8.86105 21.8292 7.80578 21.1783 7.1549C20.5275 6.50403 19.4722 6.50403 18.8213 7.1549L7.15466 18.8216C6.50379 19.4724 6.50379 20.5277 7.15466 21.1786L18.8213 32.8453C19.4722 33.4961 20.5275 33.4961 21.1783 32.8453C21.8292 32.1944 21.8292 31.1391 21.1783 30.4882L12.3569 21.6667L31.6665 21.6667C32.587 21.6667 33.3332 20.9206 33.3332 20.0001C33.3332 19.0796 32.587 18.3334 31.6665 18.3334L12.3569 18.3334L21.1783 9.51193Z"
                fill={fill}
            />
        </svg>
    );
}
