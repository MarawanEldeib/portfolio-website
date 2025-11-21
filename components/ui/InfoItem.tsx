/**
 * Reusable Info Item Component
 * Used for displaying location, date, and other metadata with icons
 * 
 * @component
 */

import { LucideIcon } from 'lucide-react';

interface InfoItemProps {
    icon: LucideIcon;
    children: React.ReactNode;
    className?: string;
    iconSize?: number;
}

export default function InfoItem({
    icon: Icon,
    children,
    className = '',
    iconSize = 14,
}: InfoItemProps) {
    return (
        <span className={`flex items-center gap-1 ${className}`}>
            <Icon size={iconSize} aria-hidden="true" />
            {children}
        </span>
    );
}
