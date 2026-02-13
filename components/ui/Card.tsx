/**
 * Reusable Card Component
 * Provides consistent card styling with hover effects and color-coded variants
 * Used across all sections for timeline items, projects, and volunteering
 *
 * @component
 * @example
 * ```tsx
 * <Card variant="experience">
 *   <h3>Software Engineer</h3>
 *   <p>Description...</p>
 * </Card>
 * ```
 */

export type CardVariant = 'default' | 'experience' | 'education' | 'project' | 'volunteering';

interface CardProps {
    /** Card content */
    children: React.ReactNode;
    /** Color-coded variant matching section context */
    variant?: CardVariant;
    /** Additional CSS classes */
    className?: string;
}

const variantStyles: Record<CardVariant, string> = {
    default: 'bg-white dark:bg-zinc-800 hover:shadow-lg',
    experience: 'bg-white dark:bg-zinc-800 hover:shadow-2xl hover:scale-[1.02] hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-950/30 dark:hover:to-blue-900/30 hover:border-2 hover:border-blue-500 dark:hover:border-blue-600',
    education: 'bg-white dark:bg-zinc-800 hover:shadow-2xl hover:scale-[1.02] hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 dark:hover:from-green-950/30 dark:hover:to-green-900/30 hover:border-2 hover:border-green-500 dark:hover:border-green-600',
    project: 'bg-white dark:bg-zinc-800 hover:shadow-2xl hover:scale-[1.02] hover:bg-gradient-to-br hover:from-blue-50 hover:to-sky-50 dark:hover:from-blue-950/30 dark:hover:to-sky-950/30 hover:border-2 hover:border-blue-500 dark:hover:border-blue-500',
    volunteering: 'bg-white dark:bg-zinc-800 hover:shadow-2xl hover:scale-[1.02] hover:bg-gradient-to-br hover:from-sky-50 hover:to-blue-50 dark:hover:from-sky-950/30 dark:hover:to-blue-950/30 hover:border-2 hover:border-sky-500 dark:hover:border-sky-500',
};

export default function Card({
    children,
    variant = 'default',
    className = '',
}: CardProps) {
    const baseStyles = 'relative rounded-lg p-6 shadow-md transition-all duration-300 cursor-pointer';
    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

    return (
        <div className={combinedStyles}>
            {children}
        </div>
    );
}
