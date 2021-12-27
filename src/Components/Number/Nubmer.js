import react from "react";
import propTypes from "prop-types";
import shortid from "shortid";

export default function Number({}) {
  return (
    <>
      <label htmlFor={shortid.generate()}>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
    </>
  );
}
