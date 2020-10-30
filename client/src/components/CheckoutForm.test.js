import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';

// Write up the two tests here and make sure they are testing what the title shows

test('form header renders', () => {
  render(<CheckoutForm />);
  const header = screen.getByText(/checkout form/i);
  expect(header).toBeInTheDocument();
});

test('form shows success message on submit with form details', () => {
  render(<CheckoutForm />);

  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const adressInput = screen.getByLabelText(/address/i);
  const cityInput = screen.getByLabelText(/city/i);
  const stateInput = screen.getByLabelText(/state/i);
  const zipInput = screen.getByLabelText(/zip/i);
  const submit = screen.getByRole('button');

  fireEvent.change(firstNameInput, { value: 'John' });
  fireEvent.change(lastNameInput, { value: 'Doe' });
  fireEvent.change(adressInput, { value: '100 Test Address' });
  fireEvent.change(cityInput, { value: 'New York' });
  fireEvent.change(stateInput, { value: 'NY' });
  fireEvent.change(zipInput, { value: '50555' });

  fireEvent.click(submit);

  expect(screen.getByText(/you have ordered some plants/i)).toBeInTheDocument();
});
