const request = require('supertest');
const express = require('express');
const router = require('../../modules/auth/route/auth.routes');
const User = require('../../modules/user/dao/models/user.model');
const AuthController = require('../../modules/auth/controller/auth.controller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

app.use(router);

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

jest.mock('../../modules/user/dao/models/user.model');

let authGuardControllerBoundaryTest = `AuthGuard boundary test`;
describe('AuthGuard Controller', () => {
    describe('boundary', () => {
        it(`${authGuardControllerBoundaryTest} should login a user with valid credentials and return a token`, async () => {
            const mReq = {
                body: {
                    email: 'testuser@example.com',
                    password: 'password123',
                },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mockUser = {
                _id: 'mockUserId',
                email: 'testuser@example.com',
                comparePassword: jest.fn().mockResolvedValue(true),
            };
            const mockToken = 'mockToken';
            User.findOne.mockResolvedValueOnce(mockUser);
            jwt.sign.mockReturnValueOnce(mockToken);
            await new AuthController().login(mReq, mRes);
            expect(User.findOne).toHaveBeenCalledWith({ email: 'testuser@example.com' });
            expect(mockUser.comparePassword).toHaveBeenCalledWith('password123');
            expect(jwt.sign).toHaveBeenCalledWith({ userId: 'mockUserId' }, 'your-secret-key', { expiresIn: '1h' });
            expect(mRes.json).toHaveBeenCalledWith({ token: 'mockToken' });
            expect(mRes.status).not.toHaveBeenCalled();
        });

        it(`${authGuardControllerBoundaryTest} should return a 401 error when user is not found`, async () => {
            const mReq = {
                body: {
                    email: 'nonexistent@example.com',
                    password: 'password123',
                },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            User.findOne.mockResolvedValueOnce(null);
            await new AuthController().login(mReq, mRes);
            expect(User.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
            expect(mRes.status).toHaveBeenCalledWith(401);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Authentication failed. User not found.' });
        });

        it(`${authGuardControllerBoundaryTest} should return a 401 error when password is incorrect`, async () => {
            const mReq = {
                body: {
                    email: 'testuser@example.com',
                    password: 'wrongpassword',
                },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mockUser = {
                _id: 'mockUserId',
                email: 'testuser@example.com',
                comparePassword: jest.fn().mockResolvedValue(false),
            };
            User.findOne.mockResolvedValueOnce(mockUser);
            await new AuthController().login(mReq, mRes);
            expect(User.findOne).toHaveBeenCalledWith({ email: 'testuser@example.com' });
            expect(mockUser.comparePassword).toHaveBeenCalledWith('wrongpassword');
            expect(mRes.status).toHaveBeenCalledWith(401);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Authentication failed. Incorrect password.' });
        });

        it(`${authGuardControllerBoundaryTest} should return a 500 error when login fails`, async () => {
            const mReq = {
                body: {
                    email: 'testuser@example.com',
                    password: 'password123',
                },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            User.findOne.mockRejectedValueOnce(new Error('Failed to find user'));
            await new AuthController().login(mReq, mRes);
            expect(User.findOne).toHaveBeenCalledWith({ email: 'testuser@example.com' });
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to authenticate user.' });
        });

        it(`${authGuardControllerBoundaryTest} should change user password and return a success message`, async () => {
            const mReq = {
                body: {
                    userId: 'mockUserId',
                    newPassword: 'newpassword123',
                },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const hashedPassword = 'hashedNewPassword';
            bcrypt.hash.mockResolvedValueOnce(hashedPassword);
            User.findByIdAndUpdate.mockResolvedValueOnce(null);
            await new AuthController().changePassword(mReq, mRes);
            expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith('mockUserId', { password: hashedPassword });
            expect(mRes.json).toHaveBeenCalledWith({ message: 'Password changed successfully.' });
            expect(mRes.status).not.toHaveBeenCalled();
        });

        it(`${authGuardControllerBoundaryTest} should return a 500 error when password change fails`, async () => {
            const mReq = {
                body: {
                    userId: 'mockUserId',
                    newPassword: 'newpassword123',
                },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const hashedPassword = 'hashedNewPassword';
            bcrypt.hash.mockResolvedValueOnce(hashedPassword);
            User.findByIdAndUpdate.mockRejectedValueOnce(new Error('Failed to update password'));
            await new AuthController().changePassword(mReq, mRes);
            expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith('mockUserId', { password: hashedPassword });
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to change password.' });
        });
    });
});
