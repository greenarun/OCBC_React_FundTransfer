import React from 'react';
import { render, fireEvent, queryByAttribute } from '@testing-library/react';
import { screen } from '@testing-library/dom'
import Register from '../Register/Register';

describe('Login View', () => {
    it('should render without errors', () => {
        render(<Register />)
    });
});


describe('with invalid input values', () => {

    it('display required errors for username, password and confirm Password when empty', async () => {

        const getById = queryByAttribute.bind(null, 'id');
        const dom = render(<Register />);
        const usernameField = getById(dom.container, 'username');
        const passwordField = getById(dom.container, 'password');
        const confirmPasswordField = getById(dom.container, 'confirmPassword');
        const agreeField = getById(dom.container, 'agree');
        const signInButton = getById(dom.container, 'btn-submit');

        fireEvent.change(usernameField, { target: { value: '' } });
        fireEvent.change(passwordField, { target: { value: '' } });
        fireEvent.change(confirmPasswordField, { target: { value: '' } });
        fireEvent.change(agreeField, { target: { value: '' } });
        fireEvent.submit(signInButton);
        await screen.findByText('Username is required')
        await screen.findByText('Password is required')
        await screen.findByText('Confirm Password is required')
        await screen.findByText('You must agree terms and conditions to register')

    });
});



describe('with invalid input values', () => {

    it('display required errors for password and confirm Password not match', async () => {
        const getById = queryByAttribute.bind(null, 'id');
        const dom = render(<Register />);
        const passwordField = getById(dom.container, 'password');
        const confirmPasswordField = getById(dom.container, 'confirmPassword');
        const signInButton = getById(dom.container, 'btn-submit');

        fireEvent.change(passwordField, { target: { value: 'arun123' } });
        fireEvent.change(confirmPasswordField, { target: { value: 'arun12' } });
        fireEvent.submit(signInButton);
        await screen.findByText('Your Password is not match')
    });
}); 