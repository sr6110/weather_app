import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';

test('renders the Card component', () => {
    const data = {
      dt: 1625184000,
      wind: {
        speed: 10,
      },
      main: {
        temp: 25,
        feels_like: 28,
        humidity: 50,
        pressure: 1012,
      },
    };
  
    render(<Card data={data} />);
  
    // Use a custom text matcher function to handle flexible matching
    const findElementWithText = (text) => {
      return screen.getByText((content, element) => {
        // Ignore certain node types
        const ignoredNodes = ['STYLE', 'SCRIPT', 'NOSCRIPT', 'TEXTAREA', 'PRE'];
        if (ignoredNodes.includes(element.tagName)) {
          return false;
        }
  
        // Match the text against the element's textContent
        return content.includes(text);
      });
    };
  
    // Use the custom text matcher to find the element
    const dayElement = findElementWithText('Day:');
    expect(dayElement).toBeInTheDocument();
  });