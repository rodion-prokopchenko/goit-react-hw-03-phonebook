import react, { Component } from "react";
import propTypes from "prop-types";
import shortid from "shortid";

const Filter = ({ value, onChange }) => (
  <form>
    <label>
      Find contacts by name
      <input type="text" value={value} onInput={onChange}></input>
    </label>
  </form>
);

Filter.propTypes = {
  value: propTypes.string,
};

export default Filter;
