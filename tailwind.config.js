/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    mode: 'jit', // Enable JIT mode
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            roboto: ['Roboto', 'sans-serif'],
        },
        extend: {
            colors: {
                tinted_gray_100: '#353E47',
                tinted_gray_300: '#4C5966',
                tinted_gray_500: '#6F7D8A',
                tinted_gray_600: '#939EA7',
                tinted_gray_700: '#DFE6ED',
                green_400: '#4C7C81',
                green_500: '#62A388',
                green_800: '#D3DFEA',
                red_400: '#733C49',
                red_500: '#CA2C3F',
                red_700: '#FE7847',
                black_1_000: '#000000',
                white_1_000: '#FFFFFF',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    1: 'hsl(var(--chart-1))',
                    2: 'hsl(var(--chart-2))',
                    3: 'hsl(var(--chart-3))',
                    4: 'hsl(var(--chart-4))',
                    5: 'hsl(var(--chart-5))',
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground':
                        'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground':
                        'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))',
                },
            },

            boxShadow: {
                'inset-gray-sm': 'inset 0px 3px 5px 1px #00000040',
                'inset-gray-md': 'inset 0px 0px 10px 2.5px #ADB5BD',
                'inset-pale-gray-md': 'inset 0px 0px 4px 2.5px #B0BCC780',
                'inset-blue-gray-lg': 'inset 0px 0px 10px 4px #C6D2DD',
                'inset-blue-gray-xl': 'inset 0px 0px 14.9px 1px #C6D2DD',
                'blue-sm': '0px 0px 3px 1px #B0BCC7',
                'blue-md': '0px 0px 4px 2px #B0BCC7',
                'inset-blue-md': 'inset 0px 0px 10px 1px #B0BCC7',
                'inset-blue-lg': 'inset 0px 0px 10px 2.5px #B0BCC7',
                'inset-blue-xl': 'inset 0px 0px 14.1px 8px #D3DFEA',
                'gray-sm': '0px 3px 5px 1px #00000040',
            },
            borderRadius: {
                4: '4px',
                5: '5px',
                8: '8px',
                10: '10px',
                500: '500px',
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0',
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                    to: {
                        height: '0',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },

    plugins: [require('tailwindcss-animate')],
};
