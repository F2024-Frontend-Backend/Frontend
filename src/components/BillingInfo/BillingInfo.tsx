import React, { useState } from "react";
import postalCodes from "./postalCode.json"; // Make sure this path is correct for your project structure
import "./BillingInfo.css";

const BillingInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //const [address, setAddress] = useState("");
  const [addressLine1, setAddressLine1] = useState(""); // Tilføjet
  const [addressLine2, setAddressLine2] = useState(""); // Tilføjet
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

  const findCityByPostalCode = (postalCode: string) => {
    const entry = postalCodes.find((item) => item.nr === postalCode);
    return entry ? entry.navn : null;
  };

  const handlePostalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const postalCode = event.target.value;
    setPostal(postalCode);
    // Clear the error message if the postal code field is empty
    if (!postalCode) {
      setPostalError("");
      setCity("");
      return; // Exit the function early
    }
    const cityName = findCityByPostalCode(postalCode);
    if (cityName) {
      setCity(cityName);
      setPostalError(""); // Clear any existing error message
    } else {
      setCity("");
      setPostalError("Invalid postal code entered."); // Set an error message
    }
  };

  const handleDeliveryPostalChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const postalCode = event.target.value;
    setDeliveryPostal(postalCode);

    // Clear the error message if the postal code field is empty
    if (!postalCode) {
      setDeliveryPostalError(""); // Correctly clear the delivery postal error message
      setDeliveryCity("");
      return; // Exit the function early
    }

    const cityName = findCityByPostalCode(postalCode);
    if (cityName) {
      setDeliveryCity(cityName);
      setDeliveryPostalError(""); // Correctly clear any existing error message for delivery postal code
    } else {
      setDeliveryCity("");
      setDeliveryPostalError("Invalid delivery postal code entered."); // Set an error message for delivery postal code
    }
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
    });
    // Add logic here to process form submission, such as sending data to a backend server
  };

  return (
    <form onSubmit={handleSubmit} className="billing-info-form">
      <div>
        <label htmlFor="fname">First Name:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="lname">Last Name:</label>
        <input
          type="text"
          id="lname"
          name="lname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="addressLine1">Address Line 1:</label>
        <input
          type="text"
          id="addressLine1"
          name="addressLine1"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="addressLine2">Address Line 2 (Optional):</label>
        <input
          type="text"
          id="addressLine2"
          name="addressLine2"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="post">Postal Code:</label>
        <input
          type="text"
          id="post"
          name="post"
          value={postal}
          onChange={handlePostalChange}
        />
        {postalError && <div className="error-message">{postalError}</div>}
      </div>

      <div>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" value={city} readOnly />
      </div>

      <div>
        <label htmlFor="number">Phone Number:</label>
        <input
          type="text"
          id="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
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
            <label htmlFor="deliveryFirstName">First Name:</label>
            <input
              type="text"
              id="deliveryFirstName"
              name="deliveryFirstName"
              value={deliveryFirstName}
              onChange={(e) => setDeliveryFirstName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="deliveryLastName"> Last Name:</label>
            <input
              type="text"
              id="deliveryLastName"
              name="deliveryLastName"
              value={deliveryLastName}
              onChange={(e) => setDeliveryLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="deliveryAddressLine1">Address Line 1:</label>
            <input
              type="text"
              id="deliveryAddressLine1"
              name="deliveryAddressLine1"
              value={deliveryAddressLine1}
              onChange={(e) => setDeliveryAddressLine1(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="deliveryAddressLine2">
              Address Line 2 (Optional):
            </label>
            <input
              type="text"
              id="deliveryAddressLine2"
              name="deliveryAddressLine2"
              value={deliveryAddressLine2}
              onChange={(e) => setDeliveryAddressLine2(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="deliveryPostal"> Postal Code:</label>
            <input
              type="text"
              id="deliveryPostal"
              name="deliveryPostal"
              value={deliveryPostal}
              onChange={handleDeliveryPostalChange}
            />
            {deliveryPostalError && (
              <div className="error-message">{deliveryPostalError}</div>
            )}
          </div>

          <div>
            <label htmlFor="deliveryCity"> City:</label>
            <input
              type="text"
              id="deliveryCity"
              name="deliveryCity"
              value={deliveryCity}
              readOnly
            />
          </div>
        </>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default BillingInfo;
