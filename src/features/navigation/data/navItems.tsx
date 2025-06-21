import { BookOpen, Heart, Home, PlusCircle, Search, Users } from 'lucide-react';

export const NavigationItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    {
        id: 'search',
        label: 'Search Recipes',
        icon: Search,
        href: '/recipes/search',
    },
    {
        id: 'create',
        label: 'Create Recipe',
        icon: PlusCircle,
        href: '/recipes/edit',
        signedIn: true,
    },
];

export const SocialItems = [
    {
        id: 'following',
        label: 'Following',
        icon: Users,
        href: '/social/following',
        // count: 15,
        signedIn: true,
    },
];
