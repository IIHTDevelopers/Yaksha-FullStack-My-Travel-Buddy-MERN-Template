import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Route, Router } from 'react-router-dom';
import DestinationService from '../../../services/destination.service';
import authService from '../../../services/auth.service';
import AddDestination from '../../../components/destination/AddDestination';

jest.mock('../../../services/destination.service');
jest.mock('../../../services/auth.service');

describe('AddDestinationComponent', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('boundary', () => {
        test('AddDestinationComponent boundary Should submit form with updated destination data when editing', async () => {
            const destinationId = 'destination123';
            const updatedData = {
                name: '',
                description: '',
                category: '',
                budget: 0,
                imageUrl: '',
                attractions: [],
            };
            DestinationService.getDestination.mockResolvedValue(updatedData);
            DestinationService.updateDestination.mockResolvedValue({ success: true });
            authService.isLoggedIn.mockReturnValue(true);
            const { getByText, getByLabelText } = render(
                <MemoryRouter initialEntries={[`/destination/edit/${destinationId}`]}>
                    <Route path="/destination/edit/:id">
                        <AddDestination />
                    </Route>
                </MemoryRouter>
            );
            const submitButton = getByText('Update');
            fireEvent.click(submitButton);
            await waitFor(() => {
                expect(DestinationService.updateDestination).toHaveBeenCalledWith(destinationId, updatedData);
            });
        });

        test('AddDestinationComponent boundary Should render "Add Destination" when there is no ID in the URL', () => {
            const { getByText } = render(<AddDestination />, { wrapper: MemoryRouter });
            const pageTitle = getByText('Add Destination');
            expect(pageTitle).toBeTruthy();
        });

        test('AddDestinationComponent boundary Should render "Edit Destination" when there is an ID in the URL', () => {
            const destinationId = 'destination123';
            const { getByText } = render(
                <MemoryRouter initialEntries={[`/destination/edit/${destinationId}`]}>
                    <Route path="/destination/edit/:id">
                        <AddDestination />
                    </Route>
                </MemoryRouter>
            );
            const pageTitle = getByText('Edit Destination');
            expect(pageTitle).toBeTruthy();
        });

        test('AddDestinationComponent boundary Should update destination state when input fields change', () => {
            const { getByLabelText } = render(<AddDestination />, { wrapper: MemoryRouter });
            const nameInput = getByLabelText('Name:');
            fireEvent.change(nameInput, { target: { value: 'New Destination' } });
            expect(nameInput.value).toBe('New Destination');
        });

        test('AddDestinationComponent boundary Should submit form with new destination data when creating', async () => {
            DestinationService.createDestination.mockResolvedValue({ success: true });
            const { getByText, getByLabelText } = render(<AddDestination />, { wrapper: MemoryRouter });
            const nameInput = getByLabelText('Name:');
            fireEvent.change(nameInput, { target: { value: 'New Destination' } });
            const submitButton = getByText('Create');
            fireEvent.click(submitButton);
            await waitFor(() => {
                expect(DestinationService.createDestination).toHaveBeenCalledWith({
                    name: 'New Destination',
                    description: '',
                    category: '',
                    budget: 0,
                    imageUrl: '',
                    attractions: [],
                });
            });
        });

        test('AddDestinationComponent boundary Should redirect to login when not logged in during edit', async () => {
            const destinationId = 'destination123';
            authService.isLoggedIn.mockReturnValue(false);
            const { getByText } = render(
                <MemoryRouter initialEntries={[`/destination/edit/${destinationId}`]}>
                    <Route path="/destination/edit/:id">
                        <AddDestination />
                    </Route>
                </MemoryRouter>
            );
            const submitButton = getByText('Update');
            fireEvent.click(submitButton);
            await waitFor(() => {
                expect(authService.isLoggedIn).toHaveBeenCalled();
                expect(authService.isLoggedIn).toHaveReturnedWith(false);
            });
        });

        test('AddDestinationComponent boundary Should redirect to destination/all after submission', async () => {
            DestinationService.createDestination.mockResolvedValue({ success: true });

            const history = createMemoryHistory(); // Create memory history
            const { getByText, getByLabelText } = render(
                <Router history={history}> {/* Use Router with history */}
                    <AddDestination />
                </Router>
            );

            const nameInput = getByLabelText('Name:');
            fireEvent.change(nameInput, { target: { value: 'New Destination' } });
            const submitButton = getByText('Create');
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(history.location.pathname).toBe('/destination/all');
            });
        });
    });
});
