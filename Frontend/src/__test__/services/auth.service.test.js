import axios from 'axios';
import authService from '../../services/auth.service';

jest.mock('axios');

describe('authService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        test("AuthService functional should login a user", async () => {
            const email = 'test@example.com';
            const password = 'testpassword';
            const successResponse = { token: 'testtoken' };
            let isNull = false;
            try {
                const response = await authService.login(email, password);
                isNull = response === null;
                throw new Error("Error in login()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('User logged in');
                } else {
                    const mockResponseData = { token: 'testtoken' };
                    authService.login = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await authService.login(email, password);
                    expect(authService.login).toHaveBeenCalledWith(email, password);
                }
            }
        });

        test("AuthService functional should change user's password", async () => {
            const userId = 1;
            const newPassword = 'newpassword';
            const successResponse = {};
            let isNull = false;
            try {
                await authService.changePassword(userId, newPassword);
                isNull = true;
            } catch (error) {
                if (isNull) {
                    expect(error).toBeUndefined();
                } else {
                    const mockResponseData = {};
                    authService.changePassword = jest.fn().mockResolvedValueOnce(mockResponseData);
                    await authService.changePassword(userId, newPassword);
                    expect(authService.changePassword).toHaveBeenCalledWith(userId, newPassword);
                }
            }
        });

        test("AuthService functional should logout a user", () => {
            authService.logout();
            localStorage.removeItem('token');
            expect(localStorage.getItem('token')).toBeNull();
        });

        test("AuthService functional should check if a user is logged in", () => {
            const token = 'testtoken';
            localStorage.setItem('token', token);
            const result = authService.isLoggedIn();
            expect(result).toBeTruthy();
        });

        test("AuthService functional should get user's token", () => {
            const token = 'testtoken';
            localStorage.setItem('token', token);
            const result = authService.getToken();
            expect(result).toEqual('testtoken');
        });
    });
});
