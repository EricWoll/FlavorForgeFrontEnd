import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

export default function FollowIcon({
    isFollowed,
    isDisabled = false,
}: {
    isFollowed: boolean;
    isDisabled?: boolean;
}) {
    return (
        <div className={`relative h-fit`}>
            {!isDisabled && (
                <svg
                    width={isFollowed ? '90' : '66'}
                    height="23"
                    viewBox={isFollowed ? '0 0 90 23' : '0 0 66 23'}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        width={isFollowed ? '90' : '66'}
                        height="23"
                        rx="6"
                        fill="url(#paint0_linear_104_8294)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_104_8294"
                            x1={isFollowed ? '90' : '66'}
                            y1="11.5"
                            x2="0"
                            y2="11.5"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#4C0B2F" />
                            <stop offset="0.181227" stopColor="#7A0420" />
                            <stop offset="0.550855" stopColor="#CA2C3F" />
                            <stop offset="0.95" stopColor="#FE7847" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
            <p
                className={`flex w-full items-center justify-center  text-white_1_000 font-bold select-none ${
                    isDisabled
                        ? 'bg-tinted_gray_600 text-tinted_gray_700 rounded-md px-1'
                        : 'absolute top-0'
                }`}
            >
                {isFollowed ? 'UnFollow' : 'Follow'}
            </p>
        </div>
    );
}
