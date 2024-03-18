//import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BillingInfo from "./BillingInfo";
import userEvent from "@testing-library/user-event";

//PostalCode validation
describe("BillingInfo Component", () => {
  it("displays an error for an invalid postal code", async () => {
    render(<BillingInfo />);
    await userEvent.type(screen.getByLabelText(/Postal Code:/i), "invalid");
    const postalError = screen.queryByText("Invalid postal code entered.");
    expect(postalError).toBeInTheDocument();
  });
  it("displays an error for invalid VAT", async () => {
    render(<BillingInfo />);
    await userEvent.type(screen.getByLabelText(/Company VAT:/i), "!#¤¤%&/(");
    const VATError = screen.queryByText(
      "Invalid VAT. Make sure only integers are present."
    );
    expect(VATError).toBeInTheDocument();
  });
});
