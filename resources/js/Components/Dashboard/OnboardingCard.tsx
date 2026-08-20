interface OnboardingCardProps {
    title: string;
    description: string;
    completed: boolean;
    href?: string;
    actionLabel?: string;
    icon?: string;
}

export default function OnboardingCard({
    title,
    description,
    completed,
    href,
    actionLabel,
    icon = '✓',
}: OnboardingCardProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-start gap-4">
                
                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        completed
                            ? 'bg-lime-100 dark:bg-lime-950'
                            : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                >
                    <span className="text-lg">
                        {completed ? '✓' : icon}
                    </span>
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                        {completed
                            ? 'This step is complete.'
                            : description}
                    </p>

                    {!completed && href && (
                        <a
                            href={href}
                            className="mt-4 inline-flex items-center justify-center rounded-lg bg-lime-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-lime-800"
                        >
                            {actionLabel}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}