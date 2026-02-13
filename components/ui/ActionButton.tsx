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

const edgeColors: Record<ButtonVariant, string> = {
    primary: 'hsl(221deg 83% 40%)',
    secondary: 'hsl(240deg 4% 36%)',
    success: 'hsl(142deg 71% 30%)',
    warning: 'hsl(32deg 95% 34%)',
    danger: 'hsl(340deg 100% 32%)',
};

const frontColors: Record<ButtonVariant, string> = {
    primary: 'hsl(221deg 83% 53%)',
    secondary: 'hsl(240deg 4% 46%)',
    success: 'hsl(142deg 71% 45%)',
    warning: 'hsl(32deg 95% 44%)',
    danger: 'hsl(345deg 100% 47%)',
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
            className={`relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 select-none group/btn ${fullWidth ? 'w-full' : ''} ${className}`}
            aria-label={ariaLabel}
            style={{ filter: 'brightness(1)', transition: 'filter 250ms' }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(110%)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(100%)'; }}
        >
            {/* Shadow */}
            <span
                className="absolute top-0 left-0 w-full h-full rounded-xl will-change-transform translate-y-[2px] transition-transform duration-[600ms] group-hover/btn:translate-y-[4px] group-active/btn:translate-y-[1px]"
                style={{ background: 'hsl(0deg 0% 0% / 0.25)', transitionTimingFunction: 'cubic-bezier(.3,.7,.4,1)' }}
            />
            {/* Edge */}
            <span
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                style={{ background: `linear-gradient(to left, ${edgeColors[variant]} 0%, ${frontColors[variant]} 8%, ${frontColors[variant]} 92%, ${edgeColors[variant]} 100%)` }}
            />
            {/* Front face */}
            <span
                className={`relative block rounded-xl text-white text-sm font-medium px-5 py-2 will-change-transform -translate-y-[4px] transition-transform duration-[600ms] group-hover/btn:-translate-y-[6px] group-active/btn:-translate-y-[2px] ${fullWidth ? 'w-full text-center' : ''}`}
                style={{ background: frontColors[variant], transitionTimingFunction: 'cubic-bezier(.3,.7,.4,1)' }}
            >
                <span className="inline-flex items-center gap-2">
                    {Icon && <Icon size={16} aria-hidden="true" />}
                    {children}
                </span>
            </span>
        </button>
    );
}
