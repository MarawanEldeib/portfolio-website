/**
 * Reusable Section Header Component
 * Used across all major sections for consistent title and subtitle styling
 * 
 * @component
 */

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
}

export default function SectionHeader({
    title,
    subtitle,
    align = 'center',
    className = '',
}: SectionHeaderProps) {
    const alignClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }[align];

    return (
        <div className={`mb-8 ${className}`}>
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${alignClass}`}>
                {title}
            </h2>
            {subtitle && (
                <p className={`text-xl text-zinc-600 dark:text-zinc-400 ${alignClass}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
