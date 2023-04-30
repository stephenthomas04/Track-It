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
  },
  inputContainer: {
    padding: "5%",
    width: "75%",
    backgroundColor: colors.whiteBackgroundColor,
  
  },
  input: {
    backgroundColor: colors.primaryGreen,
    paddingHorizontal: "3%",
    paddingVertical: "2%",
    borderRadius: "10%",
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
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  imageStyles:{
    width: "50%",
    height: "50%",
    justifyContent: 'center',
    alignContent:'center',
    marginTop: "50%",
    
  },
  graphScreen:{
    backgroundColor: colors.secondaryDarkGreen,
  },
  defaultScreen:{
    backgroundColor: colors.whiteBackgroundColor,
  }


})

export default globalStyle;
      
  
    
  
