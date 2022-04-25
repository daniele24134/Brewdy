import { StyleSheet } from "react-native";

export const theme = {
  bgDark: "#35363A",
  green: "#397D23",
  bgLight: "#EEEEEE",
  textDark: "#F2F2F2",
  textLight: "#454545",
  header: "#202124",
  buttonColor: "#53A2BE",
  padding: 30,
  bluebg: "#1b5e7b",
  pinkbg: "#D7B4C0",
  
  fontBold: "Quicksand-Bold",
  fontRegular: "Quicksand-Regular",
  fontMedium: "Quicksand-Medium",
  fontLight: "Quicksand-Light",
  fontSemiBold: "Quicksand-SemiBold",
};



export const global = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    color: theme.textDark,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.buttonColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: theme.header,
    borderWidth: 1
  },
  titleH2: {
    color: theme.textDark,
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  bold: { fontFamily: theme.fontBold },
  regular: { fontFamily: theme.fontRegular },
  semibold: { fontFamily: theme.fontSemiBold },
  medium: { fontFamily: theme.fontMedium },
});
