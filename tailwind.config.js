const { DEFAULT_CIPHERS } = require('tls');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
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
                light: '#EAECEF',
              },
              2: {
                DEFAULT: '#D9D9D9', 
                light: '#848E9C',
              },
            },
            1: {
              DEFAULT: '#EAECEF', 
              light: '#848E9C',
            },
            2: {
              DEFAULT: '#848E9C', 
              light: '#5A979E',
            },
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
              DEFAULT: '#2B3139', 
              light: '#2B3139',
            },
            3: {
              DEFAULT: '#23252A', 
              light: '#333545',
            },
            disable: {
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
                light: '#25B770',
              },
              3: {
                DEFAULT: '#1B2323', 
              }
            },
          },

          bg: {
            DEFAULT: '#181A20',
            light: '#E0E3E8', 

            stn: {
              DEFAULT: '#1E2329', 
              light: '#2B3139',
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
            light: '#848E9C',

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
                light: '#2B3139',
              },
              2: {
                DEFAULT: '#2B3139', 
                light: '#333545',
              },
              3: {
                DEFAULT: '#4F5660', 
                light: '#333545',
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
  plugins: [],
  darkMode: 'class',
}
