import React from 'react';
import { render, fireEvent, queryByAttribute } from '@testing-library/react';
import { screen } from '@testing-library/dom'
import FundTransfer from '../FundTransfer/FundTransfer';

describe('Fund Transfer View', () => {
    it('should render without errors', () => {
        render(<FundTransfer />)
    });
});


describe('with invalid input values', () => {
    it('display required errors amount and description when empty', async () => {
        const getById = queryByAttribute.bind(null, 'id');
        const dom = render(<FundTransfer />);
        const amountField = getById(dom.container, 'amount');
        const descField = getById(dom.container, 'description');
        const TransferButton = getById(dom.container, 'fund-transfer-submit');

        fireEvent.change(amountField, { target: { value: '' } });
        fireEvent.change(descField, { target: { value: '' } });
        fireEvent.submit(TransferButton);
        await screen.findByText('Please enter the amount')
        await screen.findByText('Description is required')

    });
});


