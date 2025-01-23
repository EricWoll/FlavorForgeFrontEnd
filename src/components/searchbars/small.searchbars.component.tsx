import SearchIcon from '@/svgs/icon-search.svg';
import { Dispatch, SetStateAction } from 'react';

export default function SmallSearchBar({
    onClick,
}: {
    onClick: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <div
            className={`flex items-center justify-end rounded-md select-none cursor-pointer p-1`}
        >
            <SearchIcon
                onClick={onClick}
                className="w-6 h-6 rounded-sm select-none cursor-pointer"
            />
        </div>
    );
}
