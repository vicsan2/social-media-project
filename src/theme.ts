import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import darkScrollbar from "@mui/material/darkScrollbar"

export const pink = `#F0A6CA`
export const green = `#ADFC92`
export const lBlue = `#A8D0DB`
export const mBlue = `#496A81`
export const dBlue = `#2B3A67`

export const colors = {
  pink,
  green,
  lBlue,
  mBlue,
  dBlue,
}

export default responsiveFontSizes(
  createTheme({
    components: {
      //   MuiButton: {
      //     styleOverrides: {
      //       // This does not work in rehydration
      //       root: ({ ownerState: { variant, color }, theme }) =>
      //         ButtonTheme({ variant, color, theme }),
      //     },
      //   },
      MuiCssBaseline: {
        styleOverrides: {
          body: darkScrollbar(),
        },
      },
    },
    palette: {
      mode: `dark`,
      common: {
        black: `#fff`,
        white: `#000`,
      },
      background: {
        default: `#2B3A67`,
        paper: `transparent`,
      },
      primary: {
        main: pink,
      },
      secondary: {
        main: `#fff`,
      },
      ...Object.keys(colors).reduce(
        (prev, curr) => ({
          [curr]: { main: colors[curr] },
          ...prev,
        }),
        {}
      ),
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 425,
        md: 768,
        lg: 1024,
        xl: 1440,
      },
    },
    shape: {
      borderRadius: 4,
    },
    typography: {
      htmlFontSize: 16,
      fontFamily: `'Manrope', sans-serif`,
      fontSize: 16,
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
      h1: {
        fontFamily: `'Archivo Black', sans-serif`,
        fontWeight: 400,
        // fontSize: 56,
        // lineHeight: 60,
        fontSize: `3.5rem`,
        lineHeight: `3.75rem`,
        // letterSpacing: `normal`,
        // textTransform: `none`,
      },
      h2: {
        fontFamily: `'Archivo Black', sans-serif`,
        fontWeight: 400,
        // fontSize: 48,
        // lineHeight: 52,
        fontSize: `3rem`,
        lineHeight: `3.25rem`,
        // letterSpacing: `normal`,
        // textTransform: `none`,
      },
      h3: {
        fontFamily: `'Manrope', sans-serif`,
        fontWeight: 800,
        // fontSize: 24,
        // lineHeight: 32,
        fontSize: `1.5rem`,
        lineHeight: `2rem`,
        // letterSpacing: `0`,
        // textTransform: `none`,
      },
      h4: {
        fontFamily: `'Manrope', sans-serif`,
        fontWeight: 800,
        // fontSize: 16,
        // lineHeight: 22,
        fontSize: `1rem`,
        lineHeight: `1.375rem`,
        letterSpacing: `0.12rem`,
        textTransform: `uppercase`,
      },
      h5: {
        fontFamily: `'Manrope', sans-serif`,
        fontWeight: 300,
        // fontSize: 24,
        // lineHeight: 32,
        fontSize: `1.5rem`,
        lineHeight: `2rem`,
        // letterSpacing: `normal`,
        // textTransform: `none`,
      },
      h6: {
        fontFamily: `'Manrope', sans-serif`,
        fontWeight: 300,
        // fontSize: 16,
        // lineHeight: 16,
        fontSize: `1rem`,
        lineHeight: `1rem`,
        // letterSpacing: `normal`,
      },
      body1: {
        fontFamily: `'Manrope', sans-serif`,
        fontWeight: 300,
        fontSize: `1rem`,
      },
      body2: {
        fontFamily: `'Manrope', sans-serif`,
        fontWeight: 300,
        fontSize: `0.875rem`,
      },
    },
  }),
  {
    breakpoints: [`sm`, `md`, `lg`, `xl`],
    disableAlign: true,
    factor: 1.1,
  }
)
