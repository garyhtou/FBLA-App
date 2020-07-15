/**
 *
*/

import {StyleSheet} from 'react-native'
import colors from "./colors"

const styles = StyleSheet.create ({

    // View Styles

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    authContainer: {
        flex: 1
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    errorContainer: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },

    // Text Styles

    heading: {
        marginTop: 32,
        fontSize: 24,
        textAlign: "center"
    },
    errorText: {
        color: colors.accent,
        fontSize: 13,
        textAlign: "center"
    },
    authLabelText: {
        color: colors.lightText,
        fontSize: 11,
        textTransform: "uppercase"
    },
    authRedirectText: {
        color: colors.mediumText,
        fontSize: 13
    },
    authButtonText: {
        color: colors.white,
        fontSize: 16
    },

    // Input styles

    authInput: {
        borderBottomColor: colors.lightText,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15
    },

    // Button styles

    authButton: {
        marginHorizontal: 30,
        backgroundColor: colors.accent,
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    signUpHere: {
        alignSelf: "center",
        marginTop: 32
    }


});

export default styles;