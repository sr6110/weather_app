import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../components/Home';

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
  };
  
  beforeAll(() => {
    global.navigator.geolocation = mockGeolocation;
  });
  
  test('renders the Home component', async () => {
    // Define a fake position object
    const position = {
      coords: {
        latitude: 51.5074,
        longitude: -0.1278,
      },
    };
  
    // Mock the geolocation function to return the fake position
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success(position)
    );
  
    render(<Home />);
  
    // ...
  });