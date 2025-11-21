/**
 * Reusable Timeline Item Component
 * Renders timeline entries with vertical lines, icons, and color-coded styling
 * Used in Experience, Education, and Volunteering sections
 *
 * @component
 * @example
 * ```tsx
 * <TimelineItem
 *   icon={Briefcase}
 *   variant="experience"
 *   index={0}
 * >
 *   <Card variant="experience">...</Card>
 * </TimelineItem>
 * ```
 */

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export type TimelineVariant = 'experience' | 'education' | 'volunteering';

interface TimelineItemProps {
    /** Timeline item content (typically a Card component) */
    children: React.ReactNode;
    /** Lucide icon to display in the timeline dot */
    icon: LucideIcon;
    /** Color-coded variant matching section context */
    variant?: TimelineVariant;
    /** Item index for staggered animations */
    index?: number;
}

const variantStyles: Record<TimelineVariant, { border: string; dot: string; icon: string }> = {
    experience: {
        border: 'border-blue-300 dark:border-blue-700',
        dot: 'bg-white dark:bg-zinc-800 border-2 border-blue-500 dark:border-blue-600',
        icon: 'text-blue-600 dark:text-blue-400',
    },
    education: {
        border: 'border-green-300 dark:border-green-700',
        dot: 'bg-white dark:bg-zinc-800 border-2 border-green-500 dark:border-green-600',
        icon: 'text-green-600 dark:text-green-400',
    },
    volunteering: {
        border: 'border-purple-300 dark:border-purple-700',
        dot: 'bg-white dark:bg-zinc-800 border-2 border-purple-500 dark:border-purple-600',
        icon: 'text-purple-600 dark:text-purple-400',
    },
};

export default function TimelineItem({
    children,
    icon: Icon,
    variant = 'experience',
    index = 0,
}: TimelineItemProps) {
    const styles = variantStyles[variant];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative pl-8 border-l-2 ${styles.border}`}
        >
            <div className={`absolute -left-3 top-0 w-6 h-6 rounded-full ${styles.dot} flex items-center justify-center`}>
                <Icon size={14} className={styles.icon} />
            </div>
            {children}
        </motion.div>
    );
}
