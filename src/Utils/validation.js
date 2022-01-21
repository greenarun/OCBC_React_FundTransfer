/*Validation Logic is here */
/*FOR LOGIN SCREEN */
export const LoginValidate = (values) => {
    let loginErrors = {};

    if (!values.username) {
        loginErrors.username = "Username is required";
    }

    if (!values.password) {
        loginErrors.password = "Password is required";
    }
    return loginErrors;
}

/*FOR REGISTER SCREEN */
export const RegisterValidate = (values) => {
    let errors = {};

    if (!values.username) {
        errors.username = "Username is required";
    } else if (values.username.length < 3) {
        errors.password = "Enter valid username";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 6) {
        errors.password = "Password must be 6 or more characters";
    } else if (!/\d/.test(values.password)) {
        errors.password = "Password must contain atleast 1 number";
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
    }
    else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Your Password is not match";
    }
    if (!values.agree) {
        errors.agree = "You must agree terms and conditions to register";
    }
    return errors;
}

/*FOR TRANSFER FUNDS SCREEN */
export const TransferValidate = (values) => {
    let errors = {};

    if (!values.payee) {
        errors.payee = "Select Payee from list to transfer";
    }

    if (!values.amount) {
        errors.amount = "Please enter the amount";
    } else if (!/^\d{0,4}(\.\d{0,2})?$/.test(values.amount)) {
        errors.amount = "Amount should be number";
    }

    if (!values.description) {
        errors.description = "Description is required";
    }
    return errors;
}

export default {
    LoginValidate,
    RegisterValidate,
    TransferValidate
}