
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        fintown: {
          pr9:  '#25B770',

          lnr: {
            1: {
              DEFAULT: '#2B3139', 
              light: '#2B3139',
            },
            2: {
              DEFAULT: '#2B3139', 
              light: '#2B3139',
            },
          },

          txt: {
            tit9: {
              1: {
                DEFAULT: '#D9D9D9', 
                light: '#101010',
              },
              2: {
                DEFAULT: '#D9D9D9', 
                light: '#848E9C',
              },
            },
            1: {
              DEFAULT: '#EAECEF', 
              light: '#101010',
            },
            2: '#848E9C',
            3: {
              DEFAULT: '#5A979E', 
              light: '#202630',
            },
            btn: {
              DEFAULT: '#202630', 
              light: '#EAECEF',
            },
          },

          btn: {
            1: {
              DEFAULT: '#D9D9D9', 
              light: '#39414C',
            },
            2: {
              DEFAULT: 'rgb(43 49 57 / 40%)', 
              light: '#EAECEF',
            },
            3: {
              DEFAULT: '#23252A', 
              light: '#333545',
            },
            4: {
              DEFAULT: '#2B3139', 
              light: '#656F79',
            },
            active: {
              1: {
                DEFAULT: '#32A071', 
                light: '#25B770',
              },
              2: {
                DEFAULT: '#EAECEF', 
                light: '#EAECEF',
              },
              3: {
                DEFAULT: 'rgb(138 255 187 / 40%)', 
              }
            },
          },

          bg: {
            DEFAULT: '#181A20',
            light: '#FFFFFF', 

            stn: {
              DEFAULT: '#1E2329', 
              light: '#FFFFFF',
            },

            card: {
              DEFAULT: '#2B3139', 
              light: '#333545',
            },

            cardgood: "#489B75",
            cardverygood: "#489B75",
            cardgood: "#489B75"
          },

          br: {
            DEFAULT: '#2B3139',
            light: '#D9D9D9',

            btn: {
              DEFAULT: '#2B3139', 
              light: '#848E9C',
            },

            input: {
              DEFAULT: '#2B3139', 
              light: '#F6465D',
            },
          },

          stt: {
            buy: {
              DEFAULT: '#0ECB81', 
              1: "#0ECB81",
            },
            sell: {
              DEFAULT: '#F6465D', 
              1: "#F6465D",
            },
            hold: {
              DEFAULT: '#F0B90B'
            }
          },

          hvr: {
            borderInput: {
              DEFAULT: '#F6465D', 
              light: '#E14040',
            },
            btnBrand: {
              DEFAULT: '#F6465D', 
              light: '#39414C',
            },
            btn: {
              1: {
                DEFAULT: '#1E2026', 
                light: '#F3F3F3',
              },
              2: {
                DEFAULT: '#2B3139', 
                light: '#F3F3F3',
              },
              3: {
                DEFAULT: '#4F5660', 
                light: '#D0D1D3',
              },
            },
          },

          chart: {
            1: '#2B3139',
            2: '#656F79',
            3: '#D9D9D9',
            4: '#8A47FF',
            5: '#FFD147',
            6: '#16C784',
            7: '#E14040',
          },
        },
      },
    },
  },
}
