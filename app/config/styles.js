import colors from "../config/colors";

export default{
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      button: {
        backgroundColor: colors.primaryButtonGreen,
        width: "60%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 40,
      },
      buttonText: {
        color: colors.greyTextColor,
        fontWeight: "700",
        fontSize: 16,
      },
      title: {
        color: colors.darkGreenTextColor,
      },
}