import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../app/App";
import { store } from "../app/store";

const MockApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

it("renders greetings", () => {
  render(<MockApp />);
  const greetingElement = screen.getByText(/hello/i);
  expect(greetingElement).toBeInTheDocument();
});
