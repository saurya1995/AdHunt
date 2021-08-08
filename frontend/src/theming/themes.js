import { AppTheme } from "./themetypes";

const themeindependent = {
    mixins: {
        textfieldminheight: "38px",
    },
};

const appThemeOptions = {
    [AppTheme.LIGHT]: {
        typography: {
            fontFamily: `"Lato", "Helvetica", "Arial", sans-serif`,
            // "fontSize": 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500
           },
        overrides: {
            MuiButton: {
                root: {
                    textTransform: "unset",
                },
                label: {
                    fontFamily:  `"Lato", "sans-serif"`,
                    fontSize: "1rem",
                },
                containedPrimary: { 
                    color: "white",
                },
                containedSecondary: { 
                    color: "white",
                },
            },
        },
        palette: {
            type: "light",
            primary: {
                light: "#E8A8",
                main: "#40b3a2",
                dark: "#40b3a2",
            },
            secondary: {
                light: "#E8A87C",
                main: "#E27D60",
                dark: "#E27D60",
            },
            background: {
                paper: "#fff",
                default: "#fafafa",
            },
        },
        ...themeindependent,
    },
};

export default appThemeOptions;
