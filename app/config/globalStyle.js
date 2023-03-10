import colors from "./colors";
import { StyleSheet } from 'react-native';


const globalStyle=StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.greyTextColor,
    fontWeight: "700",
    fontSize: 16,
  },
  title: {
    color: colors.darkGreenTextColor,
    padding: 10, 
    fontSize: 28,
    marginBottom: 10,
  },
  subHeading: {
    colors: colors.greenTextColor,
    padding: 5,
    fontSize: 18, 
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: colors.greyTextColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
    height:50,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: colors.primaryDarkGreen,
    width: "60%",
    padding: 15,
    borderRadius: 20,
    borderColor: colors.secondaryGreen,
    borderWidth: 2,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: colors.primaryDarkGreen,
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
  imageStyles:{
    width: "10%",
    height: "10%",
    justifyContent: "center",
  },


})

export default globalStyle;
      
  
    
  
