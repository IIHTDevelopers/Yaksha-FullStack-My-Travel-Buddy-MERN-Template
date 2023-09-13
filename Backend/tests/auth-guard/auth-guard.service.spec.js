const jwt = require('jsonwebtoken');
const User = require('../../modules/user/dao/models/user.model');
const authGuard = require('../../modules/auth/middleware/auth.guard');

jest.mock('jsonwebtoken');
jest.mock('../../modules/user/dao/models/user.model');

const mockRequest = (headers = {}) => ({
    headers,
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = () => jest.fn();

const mockToken = 'mockToken';
const mockUserId = 'mockUserId';
const mockUser = { _id: mockUserId };

let authGuardServiceBoundaryTest = `AuthGuard functional test`;
describe('AuthGuard Service', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        next = mockNext();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        it(`${authGuardServiceBoundaryTest} should pass when valid token and user found`, async () => {
            req.headers.authorization = `Bearer ${mockToken}`;
            jwt.verify.mockReturnValue({ userId: mockUserId });
            User.findById.mockResolvedValue(mockUser);
            await authGuard(req, res, next);
            expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'your-secret-key');
            expect(User.findById).toHaveBeenCalledWith(mockUserId);
            expect(req.user).toBe(mockUser);
            expect(next).toHaveBeenCalled();
        });

        it(`${authGuardServiceBoundaryTest} should return 401 when token is missing`, async () => {
            await authGuard(req, res, next);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Access denied. Token missing.' });
            expect(next).not.toHaveBeenCalled();
        });

        it(`${authGuardServiceBoundaryTest} should return 401 when invalid token`, async () => {
            req.headers.authorization = `Bearer ${mockToken}`;
            jwt.verify.mockImplementation(() => {
                throw new Error();
            });
            await authGuard(req, res, next);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Access denied. Invalid token.' });
            expect(next).not.toHaveBeenCalled();
        });

        it(`${authGuardServiceBoundaryTest} should return 401 when user not found`, async () => {
            req.headers.authorization = `Bearer ${mockToken}`;
            jwt.verify.mockReturnValue({ userId: mockUserId });
            User.findById.mockResolvedValue(null);
            await authGuard(req, res, next);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Access denied. User not found.' });
            expect(next).not.toHaveBeenCalled();
        });
    });
});
