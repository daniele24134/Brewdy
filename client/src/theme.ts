import { StyleSheet } from "react-native";

export const theme = {
  bgDark: "#35363A",
  bgLight: "#EEEEEE",
  textDark: "#F2F2F2",
  textLight: "#454545",
  header: "#202124",
  buttonColor: "#53A2BE",
  padding: 30,
  bluebg: "#1b5e7b",
  pinkbg: "#DE9DB5",
  fontBold: "Quicksand-Bold",
  fontRegular: "Quicksand-Regular",
  fontMedium: "Quicksand-Medium",
  fontLight: "Quicksand-Light",
  fontSemiBold: "Quicksand-SemiBold",
};

export const chartTheme = {
  grid: {
    fill: "none",
    stroke: "none",
    pointerEvents: "painted"
  },
  axis: {
    fill: "transparent",
    style: {
      tickLabels: {
        fill: 'white',
      },
    },
  },
};

export const global = StyleSheet.create({
  buttonText: {
    fontSize: 26,
    color: theme.textDark,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.buttonColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  titleH2: {
    color: theme.textDark,
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  bold: {fontFamily: theme.fontBold},
  regular: {fontFamily: theme.fontRegular},
  semibold: {fontFamily: theme.fontSemiBold},
  medium: {fontFamily: theme.fontMedium},

});
