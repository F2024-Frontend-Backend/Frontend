import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ItemDetails } from "./BasketItem"; // Assuming this is the correct import for your component
import { describe, it } from "vitest"; // use `it` instead of `test`
import { expect } from "vitest";

describe("ItemDetails", () => {
  it("initializes items correctly", () => {
    const item = {
      id: 1,
      name: "Item 1",
      price: 10,
      currency: "DKK",
      count: 2,
      totalPrice: 20,
    }; // Single item, not an array
    render(<ItemDetails {...item} />); // Adjusted for a single item
    expect(screen.getByText(item.name)).toBeInTheDocument(); // Correct usage of expect
  });
});
