import type { Config } from 'tailwindcss'
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        slateX: "#445",
        mist: "#e9ecef",
        accent: "#0b5fff"
      }
    },
  },
  plugins: [],
} satisfies Config
