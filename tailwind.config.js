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
                        // Remove "`" before and after inline code elements and blockquotes
                        "code::before": {
                            content: "none",
                        },
                        "code::after": {
                            content: "none",
                        },
                        "blockquote p::before": {
                            content: "none",
                        },
                        "blockquote p::after": {
                            content: "none",
                        },
                        // Make bullets and other border elements more visible
                        "--tw-prose-bullets": theme("colors.slate[500]"),
                        "--tw-prose-invert-bullets": theme("colors.slate[300]"),
                        "--tw-prose-quote-borders": theme("colors.slate[400]"),
                        "--tw-prose-th-borders": theme("colors.slate[400]"),
                        "--tw-prose-td-borders": theme("colors.slate[400]"),
                    },
                },
            }),
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
