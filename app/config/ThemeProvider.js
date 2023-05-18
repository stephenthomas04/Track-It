import React from "react";
import { colorss } from "./colorss";
import { StyleSheet } from "react-native";
const ThemeContext = React.createContext();
export const useTheme = () => React.useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const colors = isDarkTheme ? colorss.dark : colorss.light;
  const globalStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primaryDarkGreen,
    },
    buttonText: {
      color: colors.greyTextColor,
      fontWeight: "700",
      fontSize: 16,
    },
    title: {
      color: colors.darkGreenTextColor,
      padding: "5%",
      fontFamily: "Damascus",
      fontSize: 40,
      marginBottom: "5%",
    },
    subHeading: {
      color: colors.darkGreenTextColor,
      padding: "5%",
      fontSize: 30,
      marginRight: "60%",
      marginTop: "5%",
      width: "100%",
    },
    inputContainer: {
      padding: "5%",
      width: "75%",
      backgroundColor: colors.whiteBackgroundColor,
      marginLeft: "10%",
    },
    input: {
      backgroundColor: colors.primaryGreen,
      paddingHorizontal: "3%",
      paddingVertical: "2%",
      borderRadius: "10%",
      marginTop: "7%",
      height: 50,
    },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "10%",
      marginLeft: "19%",
    },
    button: {
      backgroundColor: colors.primaryButtonGreen,
      width: "60%",
      padding: 15,
      borderRadius: 15,
      borderColor: colors.primaryDarkGreen,
      borderWidth: 1,
      alignItems: "center",
    },
    buttonOutline: {
      backgroundColor: "white",
      marginTop: 5,
      borderColor: colors.primaryDarkGreen,
      borderWidth: 2,
    },
    buttonOutlineGreen: {
      backgroundColor: "#14AE5C",
      marginTop: 5,
      borderColor: "white",
      borderWidth: 2,
    },
    buttonText: {
      color: "white",
      fontWeight: "700",
      fontSize: 16,
    },
    buttonOutlineText: {
      color: colors.primaryDarkGreen,
      fontWeight: "700",
      fontSize: 16,
    },
    buttonLoginText: {
      color: "#FFFFFFFF",
      fontWeight: "700",
      fontSize: 16,
    },
    imageStyles: {
      width: "80%",
      height: "100%",
      justifyContent: "center",
      alignContent: "center",
      marginLeft: "9%",
      marginBottom: "-17%",
    },
    graphScreen: {
      backgroundColor: colors.secondaryDarkGreen,
    },
    defaultScreen: {
      backgroundColor: colors.whiteBackgroundColor,
    },
  });

  return (
    <ThemeContext.Provider
      value={{ colors, setIsDarkTheme, isDarkTheme, globalStyle }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
