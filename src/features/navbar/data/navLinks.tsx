import { NavLinks } from '@/types/navLinks';
import { UserWithRole } from '@/types/userWithRole';
import { Home } from 'lucide-react';

export const navLinks: NavLinks[] = [
    { href: '/', label: 'Home', icon: Home, auth: false },
];

export function getFilteredLinks(
    navLinks: NavLinks[],
    isSignedIn: boolean | undefined,
    user: UserWithRole | null
): NavLinks[] {
    return navLinks.filter((link) => {
        if (link.auth && !isSignedIn) return false;
        // check user is not null before accessing role
        if (link.role && (!user || user.publicMetadata.role !== link.role))
            return false;
        return true;
    });
}

// Example!!!

// export const navLinks: NavLinks[] = [
//     { href: '/', label: 'Home', icon: Home, auth: false },
//     { href: '/recipes', label: 'Recipes', icon: BookOpen, auth: true },
//     { href: '/profile', label: 'Profile', icon: LucidUser, auth: true },
//     {
//         href: '/admin',
//         label: 'Admin',
//         icon: UserCog,
//         auth: false,
//         role: 'admin',
//     },
// ];
