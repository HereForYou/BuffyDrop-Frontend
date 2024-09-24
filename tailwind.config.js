/** @type {import('tailwindcss').Config} */
// const flowbite = require("flowbite-react/tailwind");
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            xxxs: "350px",
            xxs: "380px",
            xs: "400px",
            sm: "450px",
            md: "500px",
            lg: "600px",
            xl: "1440px",
        },
        extend: {
            clipPath: {
                polygon: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Custom polygon shape
            },
            animation: {
                fadeouttopright: "fade-out-top-right 1s ease-in-out 0.25s 1",
            },
            fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
                consolas: ['Consolas', 'monospace'],
            },
            backgroundColor: {
                main: "#4b37dd"
            }
        },
    },
    plugins: [],
};