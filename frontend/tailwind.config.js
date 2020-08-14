const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: [
        './components/**/*.js',
        './components/**/*.tsx',
        './components/**/*.ts',
        './pages/**/*.js',
        './pages/**/*.mdx',
        './pages/**/*.tsx',
        './pages/**/*.ts',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            inset: {
                '19': '4.75rem',
            },
        },
    },
    variants: {
        borderColor: ['responsive', 'hover', 'focus', 'disabled'],
    },
    plugins: [require('@tailwindcss/ui')],
}
