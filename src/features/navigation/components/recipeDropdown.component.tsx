import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
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
import {
    BookOpen,
    ChefHat,
    ChevronDown,
    ChevronRight,
    Heart,
} from 'lucide-react';
import NavItem from './navItem.component';
import { useState } from 'react';
import Link from 'next/link';
import { useUserContext } from '@/contexts/user.context';

interface RecipeDropdownProps {
    activeItem: string;
    handleNavItemClick: (itemId: string) => void;
    isCollapsed: boolean;
}

export interface RecipeItem {
    id: string;
    label: string;
    icon: React.ElementType;
    href: string;
    // count?: number;
    signedIn: boolean;
}

export default function RecipeDropdown({
    activeItem,
    handleNavItemClick,
    isCollapsed,
}: RecipeDropdownProps) {
    const [recipesOpen, setRecipesOpen] = useState(false);
    const { user, isLoading } = useUserContext();

    const handleClick = (itemId: string) => {
        handleNavItemClick(itemId);
    };

    let RecipeItems: RecipeItem[] = [];

    if (!isLoading && user) {
        RecipeItems = [
            {
                id: 'my-recipes',
                label: 'My Recipes',
                icon: BookOpen,
                href: `/users/${user?.userId}`,
                // count: 12,
                signedIn: true,
            },
            {
                id: 'liked',
                label: 'Liked Recipes',
                icon: Heart,
                href: `/users/${user?.userId}/liked`,
                // count: 24,
                signedIn: true,
            },
        ];
    }

    // When collapsed, use DropdownMenu for side popup
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
                                    <ChefHat className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="ml-2">
                            <span>Recipes</span>
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
                        Recipes
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {RecipeItems.map((recipe) => (
                        <DropdownMenuItem key={recipe.id} asChild>
                            <Link
                                href={recipe.href}
                                onClick={() => handleClick(recipe.id)}
                                className={`cursor-pointer flex items-center w-full ${
                                    activeItem === recipe.id ? 'bg-accent' : ''
                                }`}
                            >
                                <recipe.icon className="mr-2 h-4 w-4" />
                                {recipe.label}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    // When expanded, use Collapsible for inline expansion
    return (
        <Collapsible open={recipesOpen} onOpenChange={setRecipesOpen}>
            <CollapsibleTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-full px-3 justify-start h-9 transition-all duration-200"
                >
                    <ChefHat className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span className="flex-1 text-left">Recipes</span>
                    {recipesOpen ? (
                        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                    ) : (
                        <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                    )}
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
                {RecipeItems.map((recipe) => (
                    <div key={recipe.id} className="ml-4">
                        <NavItem
                            item={recipe}
                            isActive={activeItem === recipe.id}
                            onClick={handleClick}
                            isCollapsed={false}
                        />
                    </div>
                ))}
            </CollapsibleContent>
        </Collapsible>
    );
}
