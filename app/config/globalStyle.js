import colors from "./colors";
import { StyleSheet } from 'react-native';


const globalStyle=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteBackgroundColor,
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
    padding: "5%", 
    fontSize: 28,
    marginBottom: "5%",
  },
  subHeading: {
    colors: colors.greenTextColor,
    padding: 5,
    fontSize: 18, 
  },
  inputContainer: {
    padding: "5%",
    width: "75%",
    backgroundColor: colors.whiteBackgroundColor,
  },
  input: {
    backgroundColor: colors.greyTextColor,
    paddingHorizontal: "3%",
    paddingVertical: "2%",
    borderRadius: "20%",
    marginTop: "7%",
    height:50,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "25%"
  },
  button: {
    backgroundColor: colors.primaryDarkGreen,
    width: "100%",
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
    width: "30%",
    height: "30%",
    justifyContent: "center",
    marginBottom: "5%",
    
  },


})

export default globalStyle;
      
  
    
  
