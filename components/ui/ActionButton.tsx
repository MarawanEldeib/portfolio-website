/**
 * Reusable Action Button Component
 * Used across multiple sections for consistent button styling
 * 
 * @component
 */

import { LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

interface ActionButtonProps {
    onClick: (e: React.MouseEvent) => void;
    icon?: LucideIcon;
    children: React.ReactNode;
    variant?: ButtonVariant;
    fullWidth?: boolean;
    ariaLabel?: string;
    className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800',
    secondary: 'bg-zinc-600 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-800',
    success: 'bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800',
    warning: 'bg-yellow-600 dark:bg-yellow-700 hover:bg-yellow-700 dark:hover:bg-yellow-800',
    danger: 'bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800',
};

export default function ActionButton({
    onClick,
    icon: Icon,
    children,
    variant = 'primary',
    fullWidth = false,
    ariaLabel,
    className = '',
}: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors text-sm font-medium ${variantStyles[variant]
                } ${fullWidth ? 'w-full justify-center' : ''} ${className}`}
            aria-label={ariaLabel}
        >
            {Icon && <Icon size={16} aria-hidden="true" />}
            {children}
        </button>
    );
}
