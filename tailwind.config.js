/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,css}",
        "./app/globals.css",
        "./app/*.module.css",
        "./components/*.{js,ts,jsx,tsx,css}",
        "./components/mdx/*.{js,ts,jsx,tsx,css}",
        "./pages/*.{js,ts,jsx,tsx,css}",
    ],
    theme: {
        extend: {
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        // Remove "`" before and after inline code elements
                        "code::before": {
                            content: "none",
                        },
                        "code::after": {
                            content: "none",
                        },
                        // Make bullets more visible
                        "--tw-prose-bullets": theme("colors.slate[500]"),
                        "--tw-prose-invert-bullets": theme("colors.slate[300]"),
                    },
                },
            }),
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/typography"),
    ],
};
