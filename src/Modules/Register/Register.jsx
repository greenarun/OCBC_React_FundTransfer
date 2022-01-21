import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, Alert, Button, CircularProgress, Dialog, Tooltip, CssBaseline, TextField, FormControlLabel, FormControl, FormHelperText, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../Components/Footer/Footer'
import InfoIcon from '@mui/icons-material/Info';
import useForm from '../../Utils/useForm'
import { RegisterValidate } from "../../Utils/validation";

const theme = createTheme();

const Register = (props) => {
    const { values, errors, handleChange, handleSubmit, handleReset } = useForm(register, RegisterValidate);
    const [signupStatus, setSignupStatus] = useState(false);
    const [statusCode, setStatusCode] = useState()
    const [loading, setLoading] = useState(false)

    function register() {
        if (values) {
            setLoading(true)
            axios.post('https://green-thumb-64168.uc.r.appspot.com/register', {
                username: values.username,
                password: values.password
            })
                .then(function (response) {
                    setSignupStatus(true)
                    setStatusCode(response.data.status)
                    setLoading(false)

                })
                .catch(function (error) {
                    setSignupStatus(true)
                    if (error.response) {
                        setStatusCode(error.response.data?.error)
                        setLoading(false)
                    }
                });

            handleReset()
        }

    }


    return (
        <ThemeProvider theme={theme}>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {signupStatus &&
                        <Alert severity={statusCode === 'success' ? 'success' : 'error'}>{statusCode === 'success' ? "Your account has been created successfully!" : statusCode} </Alert>

                    }
                    <Avatar sx={{ m: 1, bgcolor: '#a71d31' }}>
                        <AppRegistrationIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="off"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="User Name"
                                    onChange={handleChange}
                                    value={values.username || ""}
                                    helperText={errors.username}
                                    error={errors.username ? true : false}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ position: 'relative' }}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    helperText={errors.password}
                                    error={errors.password ? true : false}
                                    onChange={handleChange}
                                    value={values.password || ""}
                                    autoComplete="off"
                                />
                                <Tooltip title="Password must be 6 characters and atleast one number" sx={{ cursor: 'pointer', position: 'absolute', top: "30px", right: "-28px", color: '#d3ad56' }}>
                                    <InfoIcon />
                                </Tooltip>


                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    onChange={handleChange}
                                    value={values.confirmPassword || ""}
                                    helperText={errors.confirmPassword}
                                    error={errors.confirmPassword ? true : false}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    error={errors.agree}
                                    variant="standard"
                                >
                                    <FormControlLabel
                                        control={<Checkbox color="primary"
                                            name="agree"
                                            id="agree"
                                            onChange={handleChange}
                                            checked={values.agree || false} />}
                                        label="I agree terms and conditions"
                                    />

                                    <FormHelperText>
                                        {
                                            errors.agree
                                        }
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            id="btn-submit"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3, mb: 2, bgcolor: '#a71d31', "&:hover": {
                                    backgroundColor: `#3f0d12`
                                }
                            }}
                            disabled={loading}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Dialog open={loading}
                    PaperProps={{
                        style: {
                            overflow: 'hidden',
                            boxShadow: 'none',
                            borderRadius: 50
                        },
                    }} >
                    <CircularProgress
                        variant="indeterminate" />
                </Dialog>
                <Footer sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

export default Register