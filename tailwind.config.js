/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,css}",
        "./app/globals.css",
        "./app/*.module.css",
        "./components/*.{js,ts,jsx,tsx,css}",
        "./pages/*.{js,ts,jsx,tsx,css}",
    ],
    theme: {
        extend: {
            animation: {
                "fade-infinite": "fade-loop 5.0s linear infinite",
            },
            keyframes: {
                "fade-loop": {
                    "0%": { opacity: 0 },
                    "25%, 50%, 75%": { opacity: 1 },
                    "100%": { opacity: 0 },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
