/**
 * Reusable Status Badge Component
 * Used in Experience, Education, and Projects sections
 * 
 * @component
 */

export type StatusType = 'ongoing' | 'completed';

interface StatusBadgeProps {
    status: StatusType;
    ongoingText: string;
    completedText: string;
    variant?: 'default' | 'project';
}

const variantStyles = {
    default: {
        ongoing: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100',
        completed: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100',
    },
    project: {
        ongoing: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100',
        completed: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100',
    },
};

export default function StatusBadge({
    status,
    ongoingText,
    completedText,
    variant = 'default',
}: StatusBadgeProps) {
    const isOngoing = status === 'ongoing';
    const text = isOngoing ? ongoingText : completedText;
    const colorClass = isOngoing ? variantStyles[variant].ongoing : variantStyles[variant].completed;

    return (
        <span
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}
        >
            {text}
        </span>
    );
}
