/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary-marine': 'rgb(var(--primary-marine) / <alpha-value>)',
      'primary-purplish': 'rgb(var(--primary-purplish) / <alpha-value>)',
      'primary-pastel': 'rgb(var(--primary-pastel) / <alpha-value>)',
      'primary-light': 'rgb(var(--primary-light) / <alpha-value>)',
      'primary-strawberry': 'rgb(var(--primary-strawberry) / <alpha-value>)',
      'neutral-cool': 'rgb(var(--neutral-cool) / <alpha-value>)',
      'neutral-light': 'rgb(var(--neutral-light) / <alpha-value>)',
      'neutral-magnolia': 'rgb(var(--neutral-magnolia) / <alpha-value>)',
      'neutral-alabaster': 'rgb(var(--neutral-alabaster) / <alpha-value>)',
      'white': 'rgb(var(--white) / <alpha-value>)'
    },
    fontFamily: {
      'ubuntu': ['"Ubuntu"','"Noto Sans TC"', 'sans-serif', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas'],
    }
  },
  plugins: [],
}