import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import BillingInfo from "../components/BillingInfo/BillingInfo"
import { validateVAT } from "../components/BillingInfo/vatUtils";
import userEvent from "@testing-library/user-event";
import Basket from "../pages/Basket"


/*VAT NUMBERS AND FORM TEST*/ 
describe(validateVAT.name, () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should validate and recognized Danish VAT.", () => {
    const result = validateVAT("12345678");
    expect(result).toStrictEqual({ isValid: true, message: "Valid VAT: DanishVAT" });
  });

  it("Should validate and recognized non-Danish VAT.", () => {
    const result = validateVAT("23456789");
    expect(result).toStrictEqual({ isValid: true, message: "Valid VAT: Non-DanishVAT" });
  });

  it("Should validate and recognize a non-valid VAT.", () => {
    const result = validateVAT("invalid-vat");
    expect(result).toStrictEqual({
      isValid: false,
      message: "Invalid VAT. Make sure only integers are present.",
    });
  });
  it("Should remove whitespaces before validation.", () => {
    const result = validateVAT(" 12345678 ");
    expect(result).toStrictEqual({ isValid: true, message: "Valid VAT: DanishVAT" });
  });
});

