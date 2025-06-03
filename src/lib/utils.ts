import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UserResource } from '@clerk/types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function hasRole(
    user: UserResource | null | undefined,
    role: string
): boolean {
    return user?.publicMetadata?.role === role;
}

export function hasAnyRole(
    user: UserResource | null | undefined,
    roles: string[]
): boolean {
    return roles.includes(user?.publicMetadata?.role as string);
}

export function isSignedIn(user: UserResource | null | undefined): boolean {
    return !!user;
}
