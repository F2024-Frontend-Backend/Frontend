const BillingInfo = () => {
  return (
    <form>
      <label htmlFor="fname">First name:</label>
      <input type="text" id="fname" name="fname" />

      <label htmlFor="lname">Last name:</label>
      <input type="text" id="lname" name="lname" />

      <label htmlFor="address">Address:</label>
      <input type="text" id="address" name="Address" />

      <label htmlFor="post">Postal Code.:</label>
      <input type="text" id="post" name="post" />

      <label htmlFor="city ">City:</label>
      <input type="text" id="city" name="city" />

      <label htmlFor="number">Phone Number:</label>
      <input type="text" id="number" name="number" />

      <label htmlFor="email">E-Mail:</label>
      <input type="email" id="email" name="email" />

      <button type="submit">Submit</button>
    </form>
  );
};

export default BillingInfo;
