import React from 'react';
import { render } from '@testing-library/react';
import ShoppingBasket from './ShoppingBasket'
import CounterButton from './CounterButton';

//test block
test("increments counter", () => {
    // render the component on virtual dom
    render(<Counter />);
    
    //select the elements you want to interact with
    const counter = screen.getByTestId("counter");
    const incrementBtn = screen.getByTestId("increment");
    
    //interact with those elements
    fireEvent.click(incrementBtn);
    
    //assert the expected result
    expect(counter).toHaveTextContent("1");
    });