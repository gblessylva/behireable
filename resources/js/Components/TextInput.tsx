import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md border-[#B59F3B] shadow-sm focus:border-[#B59F3B] focus:ring-[#B59F3B] dark:border-[#B59F3B] dark:bg-gray-100 dark:text-gray-900 dark:focus:border-[#B59F3B] dark:focus:ring-[#B59F3B] ' +
                className
            }
            ref={localRef}
        />
    );
});
