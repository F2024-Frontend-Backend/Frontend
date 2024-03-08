import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom/vitest";

import "@testing-library/jest-dom";
import { ItemDetails } from "./BasketItem";
import { describe, it, expect } from "vitest"; // Ensure `expect` is imported if necessary


describe("ItemDetails", () => {
  it("initializes items correctly", () => {
    const item = {

      id: 1,
      name: "Item 1",
      price: 10,
      currency: "DKK",
      count: 2,
      totalPrice: 20,

  
    };
    render(<ItemDetails {...item} />);
    expect(screen.getByText(item.name)).toBeInTheDocument();

  });
});
