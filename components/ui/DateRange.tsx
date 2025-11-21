/**
 * Reusable Date Range Component
 * Used in Experience, Education, Projects, and Volunteering sections
 * 
 * @component
 */

import { Calendar } from 'lucide-react';

interface DateRangeProps {
    startDate: string;
    endDate: string | null;
    presentText: string;
    formatDate: (date: string) => string;
    showIcon?: boolean;
    className?: string;
}

export default function DateRange({
    startDate,
    endDate,
    presentText,
    formatDate,
    showIcon = true,
    className = '',
}: DateRangeProps) {
    return (
        <span className={`flex items-center gap-1 ${className}`}>
            {showIcon && <Calendar size={14} aria-hidden="true" />}
            <time dateTime={startDate}>{formatDate(startDate)}</time>
            {' - '}
            {endDate ? (
                <time dateTime={endDate}>{formatDate(endDate)}</time>
            ) : (
                <span>{presentText}</span>
            )}
        </span>
    );
}
