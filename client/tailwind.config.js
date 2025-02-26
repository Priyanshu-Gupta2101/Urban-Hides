/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      minWidth: {
        110: "110px",
        250: "250px",
        350: "350px",
        600: "600px",
        pfp: "48px",
      },
      minHeight: {
        110: "110px",
        250: "250px",
        350: "350px",
        480: "480px",
        pfp: "48px",
      },
    },
  },
  plugins: [],
};
