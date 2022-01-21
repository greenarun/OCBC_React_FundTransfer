import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import { screen } from '@testing-library/dom' 
import Home from '../Home/Home';

describe('Home Page View', () => {
    it('should render without errors', () => {
        render(<Home />)
    });
});




