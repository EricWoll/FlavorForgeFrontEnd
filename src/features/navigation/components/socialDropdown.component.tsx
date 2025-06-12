import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Users } from 'lucide-react';
import { SocialItems } from '../data/navItems';
import NavItem from './navItem.component';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

interface SocialDropdownProps {
    activeItem: string;
    handleNavItemClick: (itemId: string) => void;
    isCollapsed: boolean;
}

export default function SocialDropdown({
    activeItem,
    handleNavItemClick,
    isCollapsed,
}: SocialDropdownProps) {
    const [socialOpen, setSocialOpen] = useState(false);

    const handleClick = (itemId: string) => {
        handleNavItemClick(itemId);
    };

    if (isCollapsed) {
        return (
            <DropdownMenu>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-center h-9 px-2"
                                >
                                    <Users className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="ml-2">
                            <span>Social</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DropdownMenuContent
                    align="start"
                    side="right"
                    sideOffset={8}
                    className="w-48 z-50"
                    avoidCollisions={true}
                    collisionPadding={8}
                >
                    <DropdownMenuLabel className="select-none cursor-default">
                        Social
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {SocialItems.map((social) => (
                        <DropdownMenuItem key={social.id} asChild>
                            <Link
                                href={social.href}
                                onClick={() => handleClick(social.id)}
                                className={`cursor-pointer flex items-center w-full ${
                                    activeItem === social.id ? 'bg-accent' : ''
                                }`}
                            >
                                <social.icon className="mr-2 h-4 w-4" />
                                {social.label}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <Collapsible open={socialOpen} onOpenChange={setSocialOpen}>
            <CollapsibleTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-full px-3 justify-start h-9 transition-all duration-200"
                >
                    <Users className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span className="flex-1 text-left">Social</span>
                    {socialOpen ? (
                        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                    ) : (
                        <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                    )}
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
                {SocialItems.map((social) => (
                    <div key={social.id} className="ml-4">
                        <NavItem
                            item={social}
                            isActive={activeItem === social.id}
                            onClick={handleClick}
                            isCollapsed={false}
                        />
                    </div>
                ))}
            </CollapsibleContent>
        </Collapsible>
    );
}
