/**
 * Reusable Contact Info Component
 * Displays contact information with icon, label, and value
 * Supports links, buttons, or static display
 * Used in Contact section for displaying contact methods
 *
 * @component
 * @example
 * ```tsx
 * <ContactInfo
 *   icon={Mail}
 *   label="Email"
 *   value="example@email.com"
 *   href="mailto:example@email.com"
 * />
 * ```
 */

import { LucideIcon } from 'lucide-react';

interface ContactInfoProps {
    /** Lucide icon component */
    icon: LucideIcon;
    /** Label text (e.g., "Email", "Phone") */
    label: string;
    /** Contact value to display */
    value: string;
    /** Optional link URL (renders as <a>) */
    href?: string;
    /** Optional click handler (renders as <button>) */
    onClick?: () => void;
}

export default function ContactInfo({
    icon: Icon,
    label,
    value,
    href,
    onClick,
}: ContactInfoProps) {
    const content = (
        <>
            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
                <p className="text-lg font-medium">{value}</p>
            </div>
        </>
    );

    const baseClasses = 'flex items-center gap-4 p-4 bg-white dark:bg-zinc-800 rounded-lg hover:shadow-lg transition-shadow';

    if (href) {
        return (
            <a href={href} className={baseClasses} target="_blank" rel="noopener noreferrer">
                {content}
            </a>
        );
    }

    if (onClick) {
        return (
            <button onClick={onClick} className={`${baseClasses} w-full text-left`}>
                {content}
            </button>
        );
    }

    return (
        <div className={baseClasses}>
            {content}
        </div>
    );
}
