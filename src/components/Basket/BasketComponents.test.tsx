import { render, screen } from "@testing-library/react";
<<<<<<< HEAD
import "@testing-library/jest-dom/vitest";
import { ItemDetails } from "./BasketItem"; // Assuming this is the correct import for your component
import { describe, it } from "vitest"; // use `it` instead of `test`
import { expect } from "vitest";
=======
import "@testing-library/jest-dom";
import { ItemDetails } from "./BasketItem";
import { describe, it, expect } from "vitest"; // Ensure `expect` is imported if necessary
>>>>>>> 21f9374ac356bf21e9b9a135438377bcc09c2226

describe("ItemDetails", () => {
  it("initializes items correctly", () => {
    const item = {
<<<<<<< HEAD
      id: 1,
=======
      id: "1",
>>>>>>> 21f9374ac356bf21e9b9a135438377bcc09c2226
      name: "Item 1",
      price: 10,
      currency: "DKK",
      count: 2,
      totalPrice: 20,
<<<<<<< HEAD
    }; // Single item, not an array
    render(<ItemDetails {...item} />); // Adjusted for a single item
    expect(screen.getByText(item.name)).toBeInTheDocument(); // Correct usage of expect
=======
    };
    render(<ItemDetails {...item} />);
    expect(screen.getByText(item.name)).toBeInTheDocument();
>>>>>>> 21f9374ac356bf21e9b9a135438377bcc09c2226
  });
});
