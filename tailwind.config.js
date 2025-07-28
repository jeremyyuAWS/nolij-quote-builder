/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0053D6', // Nolij.ai primary blue
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0066FF',
          600: '#0053D6', // Primary blue
          700: '#003DA1',
          800: '#00285C',
          900: '#001326',
        },
        secondary: {
          DEFAULT: '#00D1C3', // Teal accent
          50: '#E6FAF9',
          100: '#CCF5F2',
          200: '#99ECE5',
          300: '#66E2D9',
          400: '#33D9CC',
          500: '#00D1C3',
          600: '#00A79C',
          700: '#007D74',
          800: '#00544D',
          900: '#002A26',
        },
        dark: {
          DEFAULT: '#0F172A', // Dark blue/slate
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
    },
  },
  plugins: [],
};