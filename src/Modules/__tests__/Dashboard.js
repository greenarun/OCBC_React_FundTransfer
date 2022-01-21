import React from 'react';
import { render, fireEvent, queryByAttribute } from '@testing-library/react';
import { screen } from '@testing-library/dom'
import Dashboard from '../Dashboard/Dashboard';

describe('Fund Transfer View', () => {
    it('should render without errors', () => {
        render(<Dashboard />)
    });
});

