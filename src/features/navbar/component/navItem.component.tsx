import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function NavItem({
    href,
    label,
    Icon,
    collapsed,
    onClick,
}: any) {
    return (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-3 px-3 py-2 transition-all outline outline-none hover:outline-2 hover:outline-primary/50 rounded-lg',
                collapsed ? 'justify-center' : 'justify-start'
            )}
            onClick={onClick}
        >
            <Icon className="h-5 w-5" />
            {!collapsed && <span className="text-sm">{label}</span>}
        </Link>
    );
}
