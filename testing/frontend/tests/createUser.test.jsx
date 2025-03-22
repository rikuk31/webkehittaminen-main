import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateUser from '../src/components/CreateUser';


// Test if the "Create" button is rendered correctly and is of type submit
test('renders Create button', () => {
    render(<CreateUser />);
    const button = screen.getByRole('button', { name: /Create/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
});

// Test if the form submission works correctly
test('submit form and create user', async () => {
    render(<CreateUser />);

    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    const ageInput = screen.getByPlaceholderText(/Age/i);
    const submitButton = screen.getByRole('button', { name: /Create/i });

    // Fill out the form
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(ageInput, { target: { value: '30' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Wait for the message to appear
    await waitFor(() => {
        const message = screen.getByText(/User created successfully/i);
        expect(message).toBeInTheDocument();
    });
});
