interface OnboardingStep {
    label: string;
    completed: boolean;
}

interface Props {
    steps: OnboardingStep[];
}

export default function OnboardingProgress({ steps }: Props) {
    const completed = steps.filter((step) => step.completed).length;
    const progress = Math.round((completed / steps.length) * 100);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Build your career profile
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Complete these steps to unlock personalized job matches.
                    </p>
                </div>

                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {progress}%
                </span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                <div
                    className="h-full rounded-full bg-lime-700 transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="mt-6 space-y-3">
                {steps.map((step) => (
                    <div
                        key={step.label}
                        className="flex items-center gap-3"
                    >
                        <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                                step.completed
                                    ? 'bg-lime-700 text-white'
                                    : 'border border-gray-300 dark:border-gray-600'
                            }`}
                        >
                            {step.completed ? '✓' : ''}
                        </div>

                        <span className="text-sm text-gray-700 dark:text-gray-300">
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}