/** @type {import('tailwindcss').Config} */
module.exports = {
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
                black_1_000: '#000000',
                white_1_000: '#FFFFFF',

                tinted_gray_100: '#353E47',
                tinted_gray_300: '#4C5966',
                tinted_gray_400: '#939EA7',
                tinted_gray_500: '#6F7D8A',
                tinted_gray_700: '#DFE6ED',

                green_200: '#555555',
                green_500: '#62A388',
                green_800: '#D3DFEA',

                red_500: '#CA2C3F',
                red_700: '#FE7847',
            },
            backgroundImage: {
                gradient_red:
                    'linear-gradient(270deg, #4C0B2F 0%, #7A0420 18.12%, #CA2C3F 55.09%, #FE7847 95%)',
            },
            dropShadow: {
                'inner_tinted_gray_0-5': '0px 0px 4px 0.5px #B0BCC7 inset',
                inner_tinted_gray_1: '0px 0px 10px 1px #B0BCC7 inset',
                'inner_tinted_gray_2-5': '0px 0px 10px 2.5px #B0BCC7 inset',
                inner_tinted_gray_4: '0px 0px 10px 4px #C6D2DD inset',

                tinted_gray_0: '0px 0px 4px 0px #00000040',
                tinted_gray_2: '0px 0px 4px 2px #B0BCC7',
                'tinted_gray_2-5': '0px 0px 10px 2.5px #DFE6ED',
            },
        },
    },

    plugins: [],
};
