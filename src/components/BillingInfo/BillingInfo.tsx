import React from "react";
import { useState } from "react";

import "./BillingInfo.css"

const BillingInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handlePostalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostal(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Address:", address);
    console.log("Postal Code:", postal);
    console.log("City:", city);
    console.log("Phone Number:", number);
    console.log("Email:", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fname">First name:</label>
      <input
        type="text"
        id="fname"
        name="fname"
        value={firstName}
        onChange={handleFirstNameChange}
      />

      <label htmlFor="lname">Last name:</label>
      <input
        type="text"
        id="lname"
        name="lname"
        value={lastName}
        onChange={handleLastNameChange}
      />

      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        name="address"
        value={address}
        onChange={handleAddressChange}
      />

      <label htmlFor="post">Postal Code:</label>
      <input
        type="text"
        id="post"
        name="post"
        value={postal}
        onChange={handlePostalChange}
      />

      <label htmlFor="city">City:</label>
      <input
        type="text"
        id="city"
        name="city"
        value={city}
        onChange={handleCityChange}
      />

      <label htmlFor="number">Phone Number:</label>
      <input
        type="text"
        id="number"
        name="number"
        value={number}
        onChange={handleNumberChange}
      />

      <label htmlFor="email">E-Mail:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default BillingInfo;
