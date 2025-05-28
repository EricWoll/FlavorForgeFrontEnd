import { FC } from 'react';

interface FollowIconProps {
    isFollowed: boolean;
    isDisabled?: boolean;
}

const FollowIcon: FC<FollowIconProps> = ({
    isFollowed,
    isDisabled = false,
}) => {
    const width = isFollowed ? 90 : 66;
    const viewBox = `0 0 ${width} 23`;

    return (
        <div className="relative h-fit w-fit">
            {!isDisabled && (
                <svg
                    width={width}
                    height="23"
                    viewBox={`0 0 ${width} 23`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        width={width}
                        height="23"
                        rx="6"
                        fill="url(#followGradient)"
                    />
                    <defs>
                        <linearGradient
                            id="followGradient"
                            x1={width}
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
                className={`${
                    isDisabled
                        ? 'bg-tinted_gray_600 text-tinted_gray_700 rounded-md px-1'
                        : 'absolute inset-0'
                } flex items-center justify-center font-bold select-none text-white_1_000`}
            >
                {isFollowed ? 'UnFollow' : 'Follow'}
            </p>
        </div>
    );
};

export default FollowIcon;
