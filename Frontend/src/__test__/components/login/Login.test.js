import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../../components/login/Login';
import authService from '../../../services/auth.service';
import userService from '../../../services/user.service';

jest.mock('../../../services/auth.service');
jest.mock('../../../services/user.service');

describe('LoginComponent', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('boundary', () => {
        test('LoginComponent boundary Should render email and password fields', () => {
            const { getByLabelText } = render(<Login />);
            const emailInput = getByLabelText('Email:');
            const passwordInput = getByLabelText('Password:');
            expect(emailInput).toBeTruthy();
            expect(passwordInput).toBeTruthy();
        });

        test('LoginComponent boundary Should render "Create New Account" text when isRegistering is true', () => {
            const { getByText } = render(<Login />);
            const loginText = getByText('Login');
            expect(loginText).toBeTruthy();
            const toggleButton = getByText('Create Account');
            fireEvent.click(toggleButton);
            const createNewAccountText = getByText('Create New Account');
            expect(createNewAccountText).toBeTruthy();
        });

        test('LoginComponent boundary Should render username field when isRegistering is true', () => {
            const { getByText } = render(<Login />);
            const toggleButton = getByText('Create Account');
            fireEvent.click(toggleButton);
            const usernameInputAfterClick = getByText('Username:');
            expect(usernameInputAfterClick).toBeTruthy();
        });
    });
});
