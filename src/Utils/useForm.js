/* Custom hook for Form Validation */

import { useState, useEffect } from "react";

const RegisterForm = (callback, validate) => {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);


    const handleSubmit = event => {
        if (event) event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    const handleChange = event => {

        // event.persist(); 
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    };

    const handleReset = e => {
        setValues({})
    }



    return {
        handleChange,
        handleSubmit,
        handleReset,
        values,
        errors,
    };
};

export default RegisterForm;
