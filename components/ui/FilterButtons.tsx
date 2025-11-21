/**
 * Reusable Filter Buttons Component
 * Generic filter button group with type-safe options
 * Used for filtering items with consistent styling
 *
 * @component
 * @example
 * ```tsx
 * <FilterButtons
 *   options={['all', 'completed', 'in-progress'] as const}
 *   activeFilter={filter}
 *   onChange={setFilter}
 *   getLabel={(option) => t(`filter.${option}`)}
 * />
 * ```
 */

interface FilterButtonsProps<T extends string> {
    /** Array of filter options */
    options: readonly T[];
    /** Currently active filter */
    activeFilter: T;
    /** Callback when filter changes */
    onChange: (filter: T) => void;
    /** Function to get display label for each option */
    getLabel: (option: T) => string;
    /** Additional CSS classes */
    className?: string;
}

export default function FilterButtons<T extends string>({
    options,
    activeFilter,
    onChange,
    getLabel,
    className = '',
}: FilterButtonsProps<T>) {
    return (
        <div className={`flex justify-center gap-4 ${className}`}>
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => onChange(option)}
                    className={`px-4 py-2 rounded-lg transition-colors ${activeFilter === option
                            ? 'bg-blue-600 dark:bg-blue-700 text-white'
                            : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600'
                        }`}
                >
                    {getLabel(option)}
                </button>
            ))}
        </div>
    );
}
