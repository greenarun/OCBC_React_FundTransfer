import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Toolbar, Container, Grid, Paper, Typography, Skeleton } from '@mui/material';
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import axios from 'axios'
import moment from "moment";
import { NumberFormat } from '../../Utils/Function'



const Dashboard = (props) => {
    const { open, setOpen, setLoggedIn } = props
    const [balance, setBalance] = useState([])
    const [transactionHistory, setTransactionHistory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('https://green-thumb-64168.uc.r.appspot.com/balance', {
            headers: {
                'Authorization': `${props.token}`
            }
        })
            .then(function (response) {
                setBalance(response.data)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
            })

        /*transaction history*/
        axios.get('https://green-thumb-64168.uc.r.appspot.com/transactions', {
            headers: {
                'Authorization': `${props.token}`
            }
        })
            .then(function (response) {
                setTransactionHistory(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            })

    }, [props.token])



    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header open={open} setOpen={setOpen} setLoggedIn={setLoggedIn} title="Dashboard" {...props} />
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
                                height: 240,
                            }}
                            >
                                <Typography color="text.primary" sx={{ fontWeight: 'bold' }}>
                                    {loading ? <Skeleton sx={{ width: 250 }} /> : `You have`}
                                </Typography>
                                <Typography component="p" variant="h4">
                                    {loading ? <Skeleton sx={{ width: 200 }} /> : `SGD ${NumberFormat(balance.balance)}`}
                                </Typography>
                                <Typography color="text.secondary" sx={{ flex: 1, typography: 'body2', mt: 2 }}>
                                    {loading ? <Skeleton sx={{ width: 250 }} /> : `Account No`}
                                </Typography>
                                <Typography color="text.primary" sx={{ flex: 1, typography: 'body1', fontWeight: 'bold' }}>
                                    {loading ? <Skeleton sx={{ width: 230 }} /> : `${balance.accountNo}`}
                                </Typography>
                                <Typography color="text.secondary" sx={{ flex: 1, typography: 'body2', mt: 2 }}>
                                    {loading ? <Skeleton sx={{ width: 250 }} /> : `Account Holder`}
                                </Typography>
                                <Typography color="text.primary" sx={{ flex: 1, typography: 'body1', fontWeight: 'bold', textTransform: "capitalize" }}>
                                    {loading ? <Skeleton sx={{ width: 210 }} /> : `${props.name}`}
                                </Typography>

                            </Paper>
                        </Grid>


                        {/* Transaction History */}
                        <Grid item xs={12}>
                            <Typography color="text.primary" sx={{ fontWeight: 'bold' }}>
                                {loading ? <Skeleton sx={{ width: 250 }} /> : `Transaction History`}
                            </Typography>
                            {loading ? <Skeleton sx={{ minHeight: 150 }} /> :
                                <>
                                    {transactionHistory && transactionHistory.length !== 0 && transactionHistory?.map(transfer => (
                                        <Paper sx={{ p: 2, mt: 2 }}>
                                            <Typography component="p" color="text.secondary" sx={{ fontWeight: 'bold', mb: 2 }}>
                                                {moment(transfer.transactionDate).format("DD-MM-YYYY - hh:mm")}
                                            </Typography>
                                            <Box sx={{ display: 'flex' }}>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography component="p" color="text.primary" sx={{ fontWeight: 'bold' }}>
                                                        {transfer.transactionType === "received" ? (transfer.sender?.accountHolder) : (transfer.receipient?.accountHolder)}
                                                    </Typography>
                                                    <Typography component="p" color="text.secondary" sx={{ fontWeight: 'regular', typography: 'body2' }}>
                                                        {transfer.transactionType === "received" ? (transfer.sender?.accountNo) : (transfer.receipient?.accountNo)}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ alignItems: 'flex-end' }}>
                                                    <Typography component="p" color={transfer.transactionType === "received" ? 'success.main' : 'text.primary'} sx={{ fontWeight: 'bold', mb: 2 }}>
                                                        {transfer.transactionType === "received" ? NumberFormat(transfer.amount) : `-${NumberFormat(transfer.amount)}`}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Paper>
                                    ))}
                                </>
                            }

                        </Grid>
                    </Grid>
                    <Footer sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box>
    );
}

export default Dashboard 
