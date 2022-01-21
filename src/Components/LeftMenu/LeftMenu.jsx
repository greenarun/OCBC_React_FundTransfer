import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const MainListItems = (props) => {

    return (
        <>
            <ListItem button onClick={() => props.setContent('dashboard')}>
                <ListItemIcon>
                    <AccountBalanceWalletIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => props.setContent('fundTransfer')}>
                <ListItemIcon>
                    <PaymentsIcon />
                </ListItemIcon>
                <ListItemText primary="Transfer Funds" />
            </ListItem>

        </>)
}

export const SecondaryListItems = () => {
    return (
        <div>
            <ListSubheader inset>E Statement</ListSubheader>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Current month" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Last Month" />
            </ListItem>

        </div>)
}

export default {
    MainListItems,
    SecondaryListItems

}