import React from 'react';
import { render, fireEvent, queryByAttribute } from '@testing-library/react';
// import { render,  } from 'react-testing-library';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/dom'
import Login from '../Login/Login';

describe('Login View', () => {
    it('should render without errors', () => {
        render(<Login />)
    });
});


describe('with invalid input values', () => {

    it('display required errors for username and password when empty', async () => {

        const getById = queryByAttribute.bind(null, 'id');
        const dom = render(<Login />);
        const usernameField = getById(dom.container, 'username');
        const passwordField = getById(dom.container, 'password');
        const signInButton = getById(dom.container, 'btn-login-submit');

        fireEvent.change(usernameField, { target: { value: '' } });
        fireEvent.change(passwordField, { target: { value: '' } });
        fireEvent.submit(signInButton);
        await screen.findByText('Username is required')
        await screen.findByText('Password is required')

    });
}); 