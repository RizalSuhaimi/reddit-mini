import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect } from 'chai';
import Greeting from './Greeting';

describe('Greeting Component', () => {
  it('renders the correct greeting message', () => {
    render(<Greeting name="John" />);
    
    const greetingElement = screen.getByText(/hello, john/i);
    
    expect(greetingElement).to.exist;
  });
});