/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    screens: {
      sm: "400px",
      md: "500px",
      lg: "600px",
      xl: "1440px",
    },
    extend: {
      clipPath: {
        polygon:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Custom polygon shape
      },
      animation: {
        fadeouttopright: "fade-out-top-right 1s ease-in-out 0.25s 1",
      },
      backgroundImage: {
        'splash-back': "url('/splash-back.png')",
        'home-back': "url('/home-back.png')",
        'mine-back': "url('/miner-back.png')",
        'friend-back': "url('/friend-back.png')",
        'task-back': "url('/task-back.png')",
        'airdrop-back': "url('/airdrop-back.png')",
      }
    },
  },
  plugins: [flowbite.plugin(),],
};
