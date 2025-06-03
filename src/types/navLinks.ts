import { LucideProps } from 'lucide-react';

export type NavLinks = {
    href: string;
    label: string;
    icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >;
    auth: boolean;
    role?: string | undefined;
};
