import React from "react";
import { render, screen } from "@testing-library/react";
import Forecast from "../components/Forecast";

jest.mock("../utils/api", () => ({
  fetchData: jest.fn(),
}));

describe("Forecast", () => {
  test("renders the Forecast component", async () => {
    const mockData = {
      list: [
        {
          dt: 1625184000,
          main: {
            temp: 30,
            feels_like: 32,
            humidity: 60,
            pressure: 1015,
          },
          wind: {
            speed: 5,
          },
        },
        // Add more sample data objects here if needed
      ],
    };

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(<Forecast latitude={0} longitude={0} />);

    const forecastElement = await screen.findByText(/Forecast/i);
    expect(forecastElement).toBeInTheDocument();

    const cardElements = screen.getAllByTestId("card-component");
    expect(cardElements.length).toBe(mockData.list.length);
  });
});
