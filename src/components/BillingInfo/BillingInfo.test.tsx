//import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import BillingInfo from "./BillingInfo";

//PostalCode validation
describe("BillingInfo Component", () => {
  it("displays an error for an invalid postal code", async () => {
    render(<BillingInfo />);
    await userEvent.type(screen.getByLabelText(/Postal Code:/i), "invalid");
    const postalError = screen.queryByText("Invalid postal code entered.");
    expect(postalError).toBeInTheDocument();
  });
});
