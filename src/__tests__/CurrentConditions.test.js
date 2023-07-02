import React from 'react';
import { render, screen} from '@testing-library/react';
import CurrentConditions from '../components/CurrentConditions';

describe("CurrentConditions", () => {
    test("renders the CurrentConditions component", () => {
      render(<CurrentConditions latitude={0} longitude={0} />);
  
      const locationElement = screen.getByText(/Location/i);
      expect(locationElement).toBeInTheDocument();
  
      const cardElement = screen.getByTestId('card-component');
      expect(cardElement).toBeInTheDocument();
    });
  });