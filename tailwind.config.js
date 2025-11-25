/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-main': 'var(--bg-main)',
                'bg-card': 'var(--bg-card)',
                'bg-card-hover': 'var(--bg-card-hover)',
                'border': 'var(--border)',
                'border-hover': 'var(--border-hover)',
                'primary': 'var(--primary)',
                'primary-inverse': 'var(--primary-inverse)',
                'accent': 'var(--accent)',
                'text-main': 'var(--text-main)',
                'text-muted': 'var(--text-muted)',
                'text-dim': 'var(--text-dim)',
                'success': 'var(--success)',
                'warning': 'var(--warning)',
                'danger': 'var(--danger)',
            },
            fontFamily: {
                sans: ['var(--font-sans)'],
            }
        },
    },
    plugins: [],
}
