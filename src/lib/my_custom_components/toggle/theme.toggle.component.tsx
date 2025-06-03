'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '../buttons/button.shadcn.component';
import { Switch } from '@/components/ui/switch';

export function ThemeSwitchToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <Button
            variant="ghost"
            size="md"
            onClick={toggleTheme}
            className="relative h-8 w-14 p-1 bg-muted hover:bg-muted/80 transition-colors rounded-full"
        >
            <span
                className={cn(
                    'absolute top-1 left-1 h-6 w-6 rounded-full bg-background shadow-md flex items-center justify-center transition-all duration-300 outline-none focus:ring-none',
                    isDark ? 'translate-x-6' : 'translate-x-0'
                )}
            >
                {isDark ? (
                    <Moon className="h-4 w-4 text-blue-500" />
                ) : (
                    <Sun className="h-4 w-4 text-yellow-400" />
                )}
            </span>
        </Button>
    );
}

export function ThemeButtonToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

    return (
        <Button
            variant="ghost"
            color="primary"
            size="md"
            className=""
            rounded="full"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-400" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-500" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
