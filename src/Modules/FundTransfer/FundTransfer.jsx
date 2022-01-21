import React, { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Button, Dialog, CssBaseline, Toolbar, Container, Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField } from '@mui/material';
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import axios from 'axios'
import useForm from '../../Utils/useForm'
import { TransferValidate } from '../../Utils/validation'
import { NumberFormat } from '../../Utils/Function'


const FundTransfer = (props) => {
    const { values, errors, handleChange, handleSubmit, handleReset } = useForm(transferForm, TransferValidate);
    const { open, setOpen, setLoggedIn, token } = props
    const [transferData, setTransferData] = useState([])
    const [payees, setPayees] = useState([])
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorCode, setErrorCode] = useState()
    const [loading, setLoading] = useState(false)

    function transferForm() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        if (values) {
            setLoading(true)
            let data = {
                receipientAccountNo: values.payee,
                amount: parseFloat(values.amount),
                description: values.description,

            }
            axios.post('https://green-thumb-64168.uc.r.appspot.com/transfer', data, { headers: headers })
                .then(function (response) {
                    setErrorStatus(true)
                    setErrorCode(response.data.status)
                    setTransferData(response.data)
                    setLoading(false)
                })
                .catch(function (error) {

                    setErrorStatus(true)
                    if (error.response) {
                        console.log(error.response);
                        setErrorCode(error.response.data?.error)
                    }
                    setLoading(false)
                });
        }

    }

    useEffect(() => {
        axios.get('https://green-thumb-64168.uc.r.appspot.com/payees', {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(function (response) {
                setPayees(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [token])

    const handleBtnReset = () => {
        setTransferData([])
        setErrorStatus(false)
        setErrorCode('')
        handleReset()
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header open={open} setOpen={setOpen} setLoggedIn={setLoggedIn} title="Transfer Funds" {...props} />
            <Box component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                            >
                                {errorStatus &&
                                    <Alert severity={errorCode === 'success' ? 'success' : 'error'}>{errorCode === 'success' ? `Successfully transferred amount to the payee !  ` : errorCode} </Alert>

                                }

                                {transferData?.transactionId ?
                                    <Box sx={{ pl: 2 }}>
                                        <Typography color="text.primary" sx={{ typography: 'body', fontWeight: 'regular', mt: 2, mb: 3 }}>
                                            Transaction Id: {transferData.transactionId}
                                        </Typography>

                                        <Typography color="text.primary" sx={{ typography: 'body', fontWeight: 'regular', mt: 2, mb: 3 }}>
                                            Recipient Acc No: {transferData.recipientAccount}
                                        </Typography>
                                        <Typography color="text.primary" sx={{ typography: 'body', fontWeight: 'regular', mt: 2, mb: 3 }}>
                                            Amount: SGD {NumberFormat(transferData.amount)}
                                        </Typography>
                                        <Typography color="text.primary" sx={{ typography: 'body', fontWeight: 'regular', mt: 2, mb: 3 }}>
                                            Description: {transferData.description}
                                        </Typography>
                                        <Grid xs={12}>

                                            <Button
                                                onClick={handleBtnReset}
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                xs={6}
                                            >
                                                Transfer Again
                                            </Button>
                                        </Grid>
                                    </Box>
                                    :
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                        <Typography color="text.primary" sx={{ typography: 'body', fontWeight: 'regular', mt: 2, mb: 3 }}>
                                            Transfer Funds to Beneficiary Account
                                        </Typography>
                                        <FormControl sx={{ m: 1, minWidth: 250 }} error={errors.payee ? true : false}>
                                            <InputLabel id="payee">Payee</InputLabel>
                                            <Select
                                                labelId="payee"
                                                id="payee"
                                                value={values.payee}
                                                label="Payee"
                                                name="payee"
                                                onChange={(e) => handleChange(e)}
                                                renderValue={value => `${value}`}
                                            >
                                                {payees.map(payto => (
                                                    <MenuItem value={payto.accountNo}>{payto.accountNo} - {payto.name}</MenuItem>
                                                )
                                                )}

                                            </Select>
                                            <FormHelperText>{errors.payee}</FormHelperText>
                                        </FormControl>
                                        <Box component="div" >
                                            <TextField
                                                required
                                                name="amount"
                                                label="Amount (SGD)"
                                                type="amount"
                                                id="amount"
                                                helperText={errors.amount}
                                                error={errors.amount ? true : false}
                                                onChange={handleChange}
                                                value={values.amount || ""}
                                                autoComplete="off"
                                                sx={{ m: 1, minWidth: 250 }}
                                            />
                                        </Box>

                                        <Box component="div" >
                                            <TextField
                                                required
                                                name="description"
                                                label="Description"
                                                type="description"
                                                id="description"
                                                helperText={errors.description}
                                                error={errors.description ? true : false}
                                                onChange={handleChange}
                                                value={values.description || ""}
                                                autoComplete="off"
                                                sx={{ ml: 1, mt: 2, mb: 3, minWidth: 250 }}
                                            />
                                        </Box>

                                        <Grid xs={12}>

                                            <Button
                                                id="fund-transfer-submit"
                                                type="submit"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2, ml: 1 }}
                                                xs={6}
                                                disabled={loading}
                                            >
                                                Transfer
                                            </Button>
                                        </Grid>

                                    </Box>}
                            </Paper>
                        </Grid>
                    </Grid>
                    <Footer sx={{ pt: 4 }} />
                </Container>
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
        </Box>
    );
}

export default FundTransfer 
