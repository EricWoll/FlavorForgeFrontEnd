'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader, Shield, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Declare Turnstile types
declare global {
    interface Window {
        turnstile: {
            render: (
                element: string | HTMLElement,
                options: {
                    sitekey: string;
                    callback: (token: string) => void;
                    'error-callback'?: (error: string) => void;
                    'expired-callback'?: () => void;
                    'timeout-callback'?: () => void;
                    theme?: 'light' | 'dark' | 'auto';
                    size?: 'normal' | 'compact';
                    action?: string;
                    cData?: string;
                    'retry-interval'?: number;
                    'refresh-expired'?: 'auto' | 'manual' | 'never';
                }
            ) => string;
            reset: (widgetId: string) => void;
            remove: (widgetId: string) => void;
            getResponse: (widgetId: string) => string;
        };
    }
}

interface TurnstileCaptchaProps {
    /** Called when CAPTCHA is successfully completed */
    onSuccess: (token: string) => void;
    /** Called when CAPTCHA encounters an error */
    onError?: (error: string) => void;
    /** Called when CAPTCHA token expires */
    onExpired?: () => void;
    /** Called when CAPTCHA times out */
    onTimeout?: () => void;
    /** Theme for the CAPTCHA widget */
    theme?: 'light' | 'dark' | 'auto';
    /** Size of the CAPTCHA widget */
    size?: 'normal' | 'compact';
    /** Show label above CAPTCHA */
    showLabel?: boolean;
    /** Custom label text */
    labelText?: string;
    /** Additional CSS classes for the container */
    className?: string;
    /** Whether to show loading state */
    showLoading?: boolean;
    /** Action parameter for Turnstile */
    action?: string;
    /** Custom data parameter */
    cData?: string;
    /** Retry interval in milliseconds */
    retryInterval?: number;
    /** How to handle expired tokens */
    refreshExpired?: 'auto' | 'manual' | 'never';
    /** Maximum retry attempts */
    maxRetries?: number;
}

export default function TurnstileCaptcha({
    onSuccess,
    onError,
    onExpired,
    onTimeout,
    theme = 'light',
    size = 'normal',
    showLabel = true,
    labelText = 'Security Verification',
    className = '',
    showLoading = true,
    action,
    cData,
    retryInterval = 8000,
    refreshExpired = 'auto',
    maxRetries = 3,
}: TurnstileCaptchaProps) {
    const [captchaLoaded, setCaptchaLoaded] = useState(false);
    const [scriptError, setScriptError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [isRetrying, setIsRetrying] = useState(false);
    const captchaRef = useRef<HTMLDivElement>(null);
    const widgetId = useRef<string>('');
    const scriptLoaded = useRef(false);
    const retryTimeout = useRef<NodeJS.Timeout>();

    // Load Turnstile script
    useEffect(() => {
        // Check if script is already loaded
        if (window.turnstile || scriptLoaded.current) {
            setCaptchaLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.defer = true;

        script.onload = () => {
            setCaptchaLoaded(true);
            scriptLoaded.current = true;
        };

        script.onerror = () => {
            setScriptError(true);
            onError?.('Failed to load CAPTCHA script');
        };

        document.head.appendChild(script);

        return () => {
            // Clean up retry timeout
            if (retryTimeout.current) {
                clearTimeout(retryTimeout.current);
            }
            // Only remove if we added it
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, [onError]);

    // Clean up widget when component unmounts
    useEffect(() => {
        return () => {
            if (widgetId.current && window.turnstile) {
                try {
                    window.turnstile.remove(widgetId.current);
                    widgetId.current = '';
                } catch (error) {
                    console.warn('Failed to remove CAPTCHA widget:', error);
                }
            }
        };
    }, []);

    // Handle retry logic
    const handleRetry = () => {
        if (retryCount >= maxRetries) {
            onError?.(
                'Maximum retry attempts reached. Please refresh the page.'
            );
            return;
        }

        setIsRetrying(true);
        setRetryCount((prev) => prev + 1);

        // Clean up existing widget
        if (widgetId.current && window.turnstile) {
            try {
                window.turnstile.remove(widgetId.current);
                widgetId.current = '';
            } catch (error) {
                console.warn('Failed to remove widget during retry:', error);
            }
        }

        // Retry after a delay
        retryTimeout.current = setTimeout(() => {
            setIsRetrying(false);
            renderCaptcha();
        }, retryInterval);
    };

    // Render CAPTCHA widget
    const renderCaptcha = () => {
        if (!captchaRef.current || !window.turnstile || widgetId.current) {
            return;
        }

        const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

        if (!siteKey) {
            const error = 'CAPTCHA site key not configured';
            console.error(error);
            onError?.(error);
            return;
        }

        try {
            widgetId.current = window.turnstile.render(captchaRef.current, {
                sitekey: siteKey,
                callback: (token: string) => {
                    setRetryCount(0); // Reset retry count on success
                    onSuccess(token);
                },
                'error-callback': (error: string) => {
                    console.error('Turnstile error:', error);

                    // Handle specific error types
                    if (
                        error.includes('Private Access Token') ||
                        error.includes('challenge loop') ||
                        error.includes('timeout')
                    ) {
                        if (retryCount < maxRetries) {
                            console.log(
                                `Retrying CAPTCHA (attempt ${
                                    retryCount + 1
                                }/${maxRetries})`
                            );
                            handleRetry();
                            return;
                        }
                    }

                    const errorMessage = error.includes('Private Access Token')
                        ? 'CAPTCHA verification failed due to browser settings. Please try refreshing the page or using a different browser.'
                        : 'CAPTCHA verification failed. Please try again.';

                    onError?.(errorMessage);
                },
                'expired-callback': () => {
                    console.log('CAPTCHA expired');
                    onExpired?.();
                },
                'timeout-callback': () => {
                    console.log('CAPTCHA timeout');
                    onTimeout?.();

                    // Retry on timeout if we haven't exceeded max retries
                    if (retryCount < maxRetries) {
                        handleRetry();
                    }
                },
                theme,
                size,
                action,
                cData,
                'retry-interval': retryInterval,
                'refresh-expired': refreshExpired,
            });
        } catch (error) {
            console.error('Failed to render CAPTCHA:', error);
            onError?.('Failed to initialize CAPTCHA');
        }
    };

    // Render CAPTCHA when script is loaded
    useEffect(() => {
        if (captchaLoaded && !isRetrying) {
            renderCaptcha();
        }
    }, [
        captchaLoaded,
        isRetrying,
        onSuccess,
        onError,
        onExpired,
        onTimeout,
        theme,
        size,
        action,
        cData,
        retryInterval,
        refreshExpired,
    ]);

    // Public method to reset CAPTCHA
    const reset = () => {
        if (widgetId.current && window.turnstile) {
            try {
                window.turnstile.reset(widgetId.current);
                setRetryCount(0);
            } catch (error) {
                console.warn('Failed to reset CAPTCHA:', error);
            }
        }
    };

    // Public method to get current response
    const getResponse = () => {
        if (widgetId.current && window.turnstile) {
            try {
                return window.turnstile.getResponse(widgetId.current);
            } catch (error) {
                console.warn('Failed to get CAPTCHA response:', error);
                return '';
            }
        }
        return '';
    };

    // Expose methods via ref (if needed)
    useEffect(() => {
        if (captchaRef.current) {
            // Add methods to the ref for parent components to use
            (captchaRef.current as any).reset = reset;
            (captchaRef.current as any).getResponse = getResponse;
        }
    }, []);

    if (scriptError) {
        return (
            <div className={`space-y-2 ${className}`}>
                {showLabel && (
                    <Label className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        {labelText}
                    </Label>
                )}
                <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">
                        Failed to load security verification. Please refresh the
                        page.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className={`space-y-2 ${className}`}>
            {showLabel && (
                <Label className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    {labelText}
                </Label>
            )}

            <div className="flex justify-center">
                <div ref={captchaRef}></div>

                {(!captchaLoaded || isRetrying) && showLoading && (
                    <div className="flex items-center justify-center p-4 bg-gray-50 rounded-md min-h-[78px]">
                        <Loader className="w-4 h-4 animate-spin mr-2" />
                        <span className="text-sm text-gray-600">
                            {isRetrying
                                ? `Retrying security verification... (${retryCount}/${maxRetries})`
                                : 'Loading security verification...'}
                        </span>
                    </div>
                )}
            </div>

            {retryCount > 0 && !isRetrying && (
                <div className="text-xs text-gray-500 text-center">
                    Retry attempt {retryCount}/{maxRetries}
                </div>
            )}
        </div>
    );
}

// Export the component with additional utility functions
export { TurnstileCaptcha };

// Enhanced hook for easier usage
export const useTurnstileCaptcha = () => {
    const [token, setToken] = useState<string>('');
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState<string>('');
    const [isRetrying, setIsRetrying] = useState(false);

    const handleSuccess = (newToken: string) => {
        setToken(newToken);
        setIsValid(true);
        setError('');
        setIsRetrying(false);
    };

    const handleError = (errorMessage: string) => {
        setToken('');
        setIsValid(false);
        setError(errorMessage);
        setIsRetrying(false);
    };

    const handleExpired = () => {
        setToken('');
        setIsValid(false);
        setError('CAPTCHA expired. Please verify again.');
        setIsRetrying(false);
    };

    const handleTimeout = () => {
        setToken('');
        setIsValid(false);
        setError('CAPTCHA timed out. Retrying...');
        setIsRetrying(true);
    };

    const reset = () => {
        setToken('');
        setIsValid(false);
        setError('');
        setIsRetrying(false);
    };

    return {
        token,
        isValid,
        error,
        isRetrying,
        handleSuccess,
        handleError,
        handleExpired,
        handleTimeout,
        reset,
    };
};
