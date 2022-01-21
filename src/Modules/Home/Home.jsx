import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dashboard from '../Dashboard/Dashboard';
import FundTransfer from '../FundTransfer/FundTransfer';

const mdTheme = createTheme();

const Home = (props) => {
    const [open, setOpen] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [content, setContent] = useState('dashboard');
    return (
        <ThemeProvider theme={mdTheme}>
            {
                content === 'dashboard' ?
                    <Dashboard open={open} setOpen={setOpen} setLoggedIn={setLoggedIn} setContent={setContent} {...props} /> :
                    <FundTransfer open={open} setOpen={setOpen} setLoggedIn={setLoggedIn} setContent={setContent}  {...props} />
            }


        </ThemeProvider >
    );
}

export default Home 
