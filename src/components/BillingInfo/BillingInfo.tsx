import React, { useState } from "react";
import postalCodes from "./postalCode.json"; // Make sure this path is correct for your project structure
import "./BillingInfo.css";

const BillingInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);
  const [deliveryPostal, setDeliveryPostal] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");

  const findCityByPostalCode = (postalCode: string) => {
    const entry = postalCodes.find((item) => item.nr === postalCode);
    return entry ? entry.navn : null;
  };

  const handlePostalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const postalCode = event.target.value;
    setPostal(postalCode);
    const cityName = findCityByPostalCode(postalCode);
    if (cityName) {
      setCity(cityName);
    } else {
      setCity("");
    }
  };

  const handleDeliveryPostalChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const postalCode = event.target.value;
    setDeliveryPostal(postalCode);
    const cityName = findCityByPostalCode(postalCode);
    if (cityName) {
      setDeliveryCity(cityName);
    } else {
      setDeliveryCity("");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Submission:", {
      firstName,
      lastName,
      address,
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
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
            <label htmlFor="deliveryPostal">Delivery Postal Code:</label>
            <input
              type="text"
              id="deliveryPostal"
              name="deliveryPostal"
              value={deliveryPostal}
              onChange={handleDeliveryPostalChange}
            />
          </div>

          <div>
            <label htmlFor="deliveryCity">Delivery City:</label>
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
