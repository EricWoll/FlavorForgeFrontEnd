import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, LockIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    showLabel?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ label = 'Password', showLabel = true, className, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        return (
            <div className="w-full max-w-sm space-y-2">
                {showLabel && <Label htmlFor={props.id}>{label}</Label>}
                <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        {...props}
                        ref={ref}
                        type={showPassword ? 'text' : 'password'}
                        className={`pr-10 ${className || ''}`}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={togglePasswordVisibility}
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>
        );
    }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
