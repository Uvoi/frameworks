// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // убедись, что пути к файлам указаны верно
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        menu: 'var(--color-menu)',
        card: 'var(--color-card)',
        accent: 'var(--color-accent)',
        'accent-50': 'var(--color-accent-50)',
        'accent-100': 'var(--color-accent-100)',
        muted: 'var(--color-muted)',
      },
    },
  },
  darkMode: 'class', // обязательно для переключения через .dark
  plugins: [],
}
