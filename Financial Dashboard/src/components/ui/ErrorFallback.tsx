import { AlertCircle } from 'lucide-react';

interface ErrorFallbackProps {
    message?: string;
    onRetry?: () => void;
}

export function ErrorFallback({ message = "Something went wrong", onRetry }: ErrorFallbackProps) {
    return (
        <div className="flex flex-col items-center justify-center p-6 text-center h-full min-h-[200px] rounded-xl border border-red-100 bg-red-50 text-red-900">
            <AlertCircle className="h-10 w-10 mb-2 text-red-500" />
            <p className="font-medium mb-2">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="text-sm text-red-700 hover:text-red-900 underline underline-offset-4"
                >
                    Try again
                </button>
            )}
        </div>
    );
}
