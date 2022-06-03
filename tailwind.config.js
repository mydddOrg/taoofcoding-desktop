module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        icon: "url('assets/icon.png')",
        close: "url('assets/titlebar/close.png')",
        back: "url('assets/titlebar/back.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
