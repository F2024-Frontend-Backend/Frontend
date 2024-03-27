import React, { useState } from "react";
import postalCodes from "./postalCode.json";
import "./vatUtils.ts";
import { validateVAT } from "./vatUtils.ts";

const BillingInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("DK");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);
  const [deliveryFirstName, setDeliveryFirstName] = useState("");
  const [deliveryLastName, setDeliveryLastName] = useState("");
  const [deliveryAddressLine1, setDeliveryAddressLine1] = useState("");
  const [deliveryAddressLine2, setDeliveryAddressLine2] = useState("");
  const [deliveryPostal, setDeliveryPostal] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [postalError, setPostalError] = useState("");
  const [deliveryPostalError, setDeliveryPostalError] = useState("");
  const [companyName, setCompany] = useState("");
  const [companyVAT, setVAT] = useState("");
  const [vatErrors, setVatErrors] = useState("");

  const findCityByPostalCode = (postalCode: string) => {
    const entry = postalCodes.find((item) => item.nr === postalCode);
    return entry ? entry.navn : null;
  };

  const handlePostalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const postalCode = event.target.value;
    setPostal(postalCode);

    if (!postalCode) {
      setPostalError("");
      setCity("");
      return;
    }

    if (/^\d{4}$/.test(postalCode)) {
      const cityName = findCityByPostalCode(postalCode);
      if (cityName) {
        setCity(cityName);
        setPostalError("");
      } else {
        setCity("");
        setPostalError("No city found for this postal code.");
      }
    } else {
      setCity("");
      setPostalError("Postal code should be 4 digits.");
    }
  };

  const handleDeliveryPostalChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const postalCode = event.target.value;
    setDeliveryPostal(postalCode);

    if (!postalCode) {
      setDeliveryPostalError("");
      setDeliveryCity("");
      return;
    }

    if (/^\d{4}$/.test(postalCode)) {
      const cityName = findCityByPostalCode(postalCode);
      if (cityName) {
        setDeliveryCity(cityName);
        setDeliveryPostalError("");
      } else {
        setDeliveryCity("");
        setDeliveryPostalError("Invalid delivery postal code entered.");
      }
    } else {
      setDeliveryCity("");
      setDeliveryPostalError("Delivery postal code should be 4 digits.");
    }
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(event.target.value);
  };

  const handleVATChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const vat = event.target.value;
    setVAT(vat);
    const valVat = validateVAT(vat);
    if (!valVat.isValid) {
      setVatErrors(valVat.message);
    } else {
      setVatErrors("");
    }
  };

  const checkIfCompNamePresent = (): boolean => {
    if (companyName === "") {
      return false;
    }
    return true;
  };

  const checkIfVATPresent = (): boolean => {
    if (companyVAT === "") {
      return false;
    }
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Submission:", {
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      postal,
      city,
      number,
      email,
      deliveryPostal: isBillingDifferent ? deliveryPostal : null,
      deliveryCity: isBillingDifferent ? deliveryCity : null,
      companyName,
      companyVAT,
    });
    // Add logic here to process form submission, such as sending data to a backend server
  };

  return (
    <form onSubmit={handleSubmit} className="billing-info-form">
      <div>
        <label htmlFor="fname">First Name:</label> <br />
        <input
          type="text"
          id="fname"
          name="fname"
          value={firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="lname">Last Name:</label> <br />
        <input
          type="text"
          id="lname"
          name="lname"
          value={lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="country">Country:</label> <br />
        <select
          id="country"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >
          <option value="DK">Denmark</option>
        </select>
      </div>

      <div>
        <label htmlFor="addressLine1">Address Line 1:</label> <br />
        <input
          type="text"
          id="addressLine1"
          name="addressLine1"
          value={addressLine1}
          required
          onChange={(e) => setAddressLine1(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="addressLine2">Address Line 2 (Optional):</label> <br />
        <input
          type="text"
          id="addressLine2"
          name="addressLine2"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="post">Postal Code:</label> <br />
        <input
          type="text"
          id="post"
          name="post"
          required
          value={postal}
          onChange={handlePostalChange}
          pattern="\d{4}"
          title="Postal code should be 4 digits."
          maxLength={4}
        />
        {postalError && <div className="error-message">{postalError}</div>}
      </div>

      <div>
        <label htmlFor="city">City:</label> <br />
        <input type="text" id="city" name="city" value={city} readOnly />
      </div>

      <div>
        <label htmlFor="number">Phone Number:</label> <br />
        <input
          type="text"
          id="number"
          name="number"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label> <br />
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isBillingDifferent}
            onChange={(e) => setIsBillingDifferent(e.target.checked)}
          />{" "}
          Delivery to a different address
        </label>
      </div>

      {isBillingDifferent && (
        <>
          <div>
            <label htmlFor="deliveryFirstName">First Name:</label> <br />
            <input
              type="text"
              id="deliveryFirstName"
              name="deliveryFirstName"
              required={isBillingDifferent}
              value={deliveryFirstName}
              onChange={(e) => setDeliveryFirstName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="deliveryLastName"> Last Name:</label> <br />
            <input
              type="text"
              id="deliveryLastName"
              required={isBillingDifferent}
              name="deliveryLastName"
              value={deliveryLastName}
              onChange={(e) => setDeliveryLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="deliveryAddressLine1">Address Line 1:</label> <br />
            <input
              type="text"
              id="deliveryAddressLine1"
              required={isBillingDifferent}
              name="deliveryAddressLine1"
              value={deliveryAddressLine1}
              onChange={(e) => setDeliveryAddressLine1(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="deliveryAddressLine2">
              Address Line 2 (Optional):
            </label>{" "}
            <br />
            <input
              type="text"
              id="deliveryAddressLine2"
              required={isBillingDifferent}
              name="deliveryAddressLine2"
              value={deliveryAddressLine2}
              onChange={(e) => setDeliveryAddressLine2(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="post"> Postal Code:</label> <br />
            <input
              type="text"
              id="deliveryPostal"
              name="deliveryPostal"
              required={isBillingDifferent}
              value={deliveryPostal}
              onChange={handleDeliveryPostalChange}
              maxLength={4}
            />
            {deliveryPostalError && (
              <div className="error-message">{deliveryPostalError}</div>
            )}
          </div>

          <div>
            <label htmlFor="deliveryCity"> City:</label> <br />
            <input
              type="text"
              id="deliveryCity"
              name="deliveryCity"
              required={isBillingDifferent}
              value={deliveryCity}
              readOnly
            />
          </div>
        </>
      )}
      <div>
        <label htmlFor="companyName">Company Name:</label> <br />
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={companyName}
          required={checkIfVATPresent()}
          onChange={handleCompanyChange}
        />
      </div>
      <div>
        <label htmlFor="companyVAT">Company VAT:</label> <br />
        <input
          type="numeric"
          inputMode="numeric"
          id="companyVAT"
          name="companyVAT"
          value={companyVAT}
          required={checkIfCompNamePresent()}
          pattern="((1[0-9]{7})|((0|[2-9])[0-9]*))"
          //not sure if we are allowed to just use the pattern then give it a regex. This should work for now, but I think it would be a bit complex later.
          onChange={handleVATChange}
        />
        {vatErrors && <div className="error-message">{vatErrors}</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BillingInfo;
