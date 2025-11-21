/**
 * Reusable Tech Tag Component
 * Used in Projects, Experience, Education, and Volunteering sections
 * 
 * @component
 */

import { LucideIcon } from 'lucide-react';

export type TechTagVariant = 'default' | 'project' | 'experience' | 'education' | 'volunteering';

interface TechTagProps {
    tech: string;
    icon?: LucideIcon;
    variant?: TechTagVariant;
    onClick?: () => void;
}

const variantStyles: Record<TechTagVariant, string> = {
    default: 'bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200',
    project: 'bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 hover:scale-110 transition-all duration-200 cursor-pointer',
    experience: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    education: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    volunteering: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700',
};

export default function TechTag({ tech, icon: Icon, variant = 'default', onClick }: TechTagProps) {
    return (
        <span
            onClick={onClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md ${variantStyles[variant]}`}
        >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {tech}
        </span>
    );
}
