
import { StyleSheet } from "react-native"

export const theme = {
  bgDark: '#35363A',
  bgLight: '#EEEEEE',
  textDark: '#F2F2F2',
  textLight: '#454545',
  header: '#202124',
  buttonColor: '#53A2BE',
  padding: 30,
  bluebg: '#1b5e7b'
  
}

export const global = StyleSheet.create({
  buttonText: {
    fontSize: 26,
    color: theme.textDark,
    textAlign: 'center'
  },
  button: {
    backgroundColor: theme.buttonColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  titleH2: {
    color: theme.textDark,
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 10
  }
})