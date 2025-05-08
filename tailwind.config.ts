export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ["Montserrat", "snas-serif"],
            },
            bonxShadow: {
                custom: "0 0 15px rgba(0, 0, 0, 0.3)",
                right: "10px 0px 10px -5px rgba(0, 0 ,0 , 0.3)",
            },
            colors: {
                customBlue: "rgba(28, 100, 242, 1)",
                banner: {
                    color1: "#FDC200",
                    color2: "#FF2C2C",
                    color3: "#21AD61",
                    color4: "#723DA6",
                }
            },
            backgroundImage: {
                "custom-gradient": "linear-gradient(to right, #111827, #1f2937)",
                "button-gradient": "linear-gradient(to right, #7e22c2, #ef4444)",
                "custom-gradient2": "linear-gradient(135deg, #f5f5f5, #eae7dc)"
            }
        },
    },
    plugins: [],
}