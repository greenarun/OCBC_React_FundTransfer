import React, { useState } from 'react';
import axios from 'axios'
import { Avatar, Alert, Button, CssBaseline, CircularProgress, Dialog, TextField, Link, Grid, Box, Typography, Paper } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from "react-router-dom";
import Footer from '../../Components/Footer/Footer'
import useForm from '../../Utils/useForm'
import { LoginValidate } from "../../Utils/validation";

const theme = createTheme();

const Login = (props) => {
    const { values, errors, handleChange, handleSubmit, handleReset } = useForm(login, LoginValidate);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [signupStatus, setSignupStatus] = useState(false);
    const [statusCode, setStatusCode] = useState()
    const [loading, setLoading] = useState(false)

    function login() {
        if (values) {
            setLoading(true)
            axios.post('https://green-thumb-64168.uc.r.appspot.com/login', {
                username: values.username,
                password: values.password
            })
                .then(function (response) {
                    props.setToken(response.data.token)
                    props.setName(response.data.username)
                    setLoggedIn(true);
                    setSignupStatus(true)
                    setStatusCode(response.data.status)
                    setLoading(false)
                    props.parentCallback(true);
                    return <Navigate replace to="/" />

                })
                .catch(function (error) {
                    setSignupStatus(true)
                    if (error.response) {
                        setStatusCode(error.response.data?.error)
                    }
                    setLoading(false)
                });
            console.log(loggedIn)
            handleReset()
        }

    }



    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} sx={{
                    backgroundColor: '#3f0d12',
                    backgroundImage: 'linear-gradient(315deg, #3f0d12 0%, #a71d31 74%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                        {signupStatus &&
                            <Alert severity={statusCode === 'success' ? 'success' : 'error'}>{statusCode === 'success' ? "Authenticated successfully!" : statusCode} </Alert>
                        }
                        <Avatar sx={{ m: 1, bgcolor: '#a71d31' }}>
                            <LoginIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} data-testid="form">
                            <TextField
                                margin="normal"
                                autoComplete="off"
                                name="username"
                                required
                                fullWidth
                                data-testid="username"
                                id="username"
                                label="User Name"
                                onChange={handleChange}
                                value={values.username || ""}
                                helperText={errors.username}
                                error={errors.username ? true : false}
                                autoFocus />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                data-testid="password"
                                id="password"
                                helperText={errors.password}
                                error={errors.password ? true : false}
                                onChange={handleChange}
                                value={values.password || ""}
                                autoComplete="off"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                data-testid="submit"
                                variant="contained"
                                sx={{
                                    mt: 3, mb: 2, backgroundColor: "#a71d31", "&:hover": {
                                        backgroundColor: `#3f0d12`
                                    }
                                }}
                                id="btn-login-submit"
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Footer sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
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
            </Grid>
        </ThemeProvider>
    );

}

export default Login