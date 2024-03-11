import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/vitest";
import { useBasketState } from "./useBasketState";
import { ItemDetails } from "./BasketItem";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import BasketItems from "./ShoppingBasket";
import JsonData from "../../data.json";
import itemComponent from "./ShoppingBasket";
import { renderHook, act } from "@testing-library/react-hooks";

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

describe("useBasketState", () => {
  it("Change item counts", () => {
    // Assuming `JsonData` is correctly imported and contains an array of items
    //const JsonData = [...]; // Make sure this is defined or imported correctly
    const { result } = renderHook(() => useBasketState(JsonData.slice(0, 4)));
    const { handleItemCountChange } = result.current;

    // Mock item details for testing
    const item = {
      id: "1", // Ensure this matches the ID type expected by your components (string in this case)
      name: "Item 1",
      price: 10,
      currency: "DKK",
      count: 2, // Initial count before the test action
      totalPrice: 20,
    };

    act(() => {
      result.current.handleItemCountChange("1", 3); // Adjust based on your actual itemId and new count value
    });

    // Assuming you want to test the itemCounts state, adjust the assertion as necessary
    expect(result.current.itemCounts["1"]).to.equal(3);

    // Simulate item count change
    act(() => {
      handleItemCountChange(item.id, 4); // Changing count to 4 for this test
    });

    // Assuming you have a way to retrieve the updated itemCounts from the hook
    const updatedCount = result.current.itemCounts[item.id];

    // Assertion
    expect(updatedCount).toBe(4);
  });
});

{
  /*

describe("useBasketState", () => {
  it("Change item counts", async () => {
      const json =[...]
    const item = {
      id: 1,
      name: "Item 1",
      price: 10,
      currency: "DKK",
      count: 2,
      totalPrice: 20,
    };
    const {handleItemCountChange}=useBasketState(JsonData.slice(0,4))
    render(<ItemDetails {...item} />);
    render(<itemComponent {onItemCountChange = handleItemCountChange} />);
    render(<BasketItems {...item} />);
    const itemCount = 2;
    const itemCountTest = handleItemCountChange(item.id, 2);
    expect(item.count).to.equal(itemCount);
    expect(item.count).to.equal(itemCountTest);
  });
});

describe("useBasketState", () => {
  it("Remove item", () => {
    render(<BasketItems />);

    //Simulate the deletion event
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    expect(deleteButtons.length).toBeGreaterThan(0);
    fireEvent.click(deleteButtons[0]);
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
  });
});
*/
}
