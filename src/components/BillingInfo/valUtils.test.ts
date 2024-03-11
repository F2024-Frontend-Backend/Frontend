//import React from "react";
import {describe, expect, it} from "vitest";
import { validateVAT } from "./vatUtils";


/*VAT NUMBERS AND FORM TEST*/ 
describe(validateVAT.name, () => {
    it("Should validate and recognized Danish VAT.", () => {
      const result = validateVAT("12345678");
      expect(result).toStrictEqual({ isValid: true, message: "Valid VAT: DanishVAT" });
    });
    it("Recognize non-valid Danish VAT", () => {
      const result = validateVAT("1234567")
      expect(result).toStrictEqual({isValid: false, message: "Invalid Danish VAT. Danish VAT has 8 integers exactly."})
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
  
  
  
  