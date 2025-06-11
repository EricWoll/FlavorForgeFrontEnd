import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { LucideProps } from 'lucide-react';
import Link from 'next/link';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface NavItemProps {
    item: {
        id: string;
        label: string;
        icon: ForwardRefExoticComponent<
            Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
        >;
        href: string;
        count?: number;
        signedIn?: boolean;
    };
    isActive: boolean;
    onClick: (itemId: string) => void;
    isCollapsed: boolean;
}

export default function NavItem({
    item,
    isActive,
    onClick,
    isCollapsed,
}: NavItemProps) {
    const handleClick = () => {
        // Call the onClick callback for any additional handling
        onClick(item.id);
    };

    const buttonContent = (
        <Link href={item.href} className="w-full">
            <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={`w-full h-9 transition-all duration-200 ${
                    isCollapsed ? 'px-2 justify-center' : 'px-3 justify-start'
                } ${
                    isActive
                        ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300'
                        : 'hover:bg-accent'
                }`}
                onClick={handleClick}
                asChild={false}
            >
                <item.icon
                    className={`h-4 w-4 flex-shrink-0 transition-all duration-200 ${
                        isCollapsed ? '' : 'mr-3'
                    } ${isActive ? 'text-red-600' : 'text-muted-foreground'}`}
                />
                {!isCollapsed && (
                    <>
                        <span className="flex-1 text-left truncate transition-opacity duration-200">
                            {item.label}
                        </span>
                        {item.count !== undefined && item.count > 0 && (
                            <Badge
                                variant={isActive ? 'default' : 'secondary'}
                                className={`ml-auto h-5 px-1.5 text-xs transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                        : ''
                                }`}
                            >
                                {item.count > 99 ? '99+' : item.count}
                            </Badge>
                        )}
                    </>
                )}
            </Button>
        </Link>
    );

    // Wrap with tooltip when collapsed to show the label
    if (isCollapsed) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
                    <TooltipContent side="right" className="ml-2">
                        <div className="flex items-center gap-2">
                            <span>{item.label}</span>
                            {item.count !== undefined && item.count > 0 && (
                                <Badge
                                    variant="secondary"
                                    className="h-4 px-1 text-xs"
                                >
                                    {item.count > 99 ? '99+' : item.count}
                                </Badge>
                            )}
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return buttonContent;
}
