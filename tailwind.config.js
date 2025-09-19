/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  safelist: [
    { pattern: /(bg|text)-(blue|green|purple|orange)-(100|600)/ },
    { pattern: /hover:bg-gray-200/ },
  ],
  theme: { extend: {} },
  plugins: [],
}