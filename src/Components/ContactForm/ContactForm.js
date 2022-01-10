import react, { Component } from "react";
import propTypes from "prop-types";
import shortid from "shortid";
import s from "./ContactForm.module.css";

export default class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  onNameChange = (e) => {
    this.setState({ name: e.currentTarget.value });
  };
  onNumberChange = (e) => {
    this.setState({ number: e.currentTarget.value });
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };

  onSumbitButton = (e) => {
    e.preventDefault();
    if (this.state.name === "" && this.state.number === "") {
      alert("Введите имя и номер");
      return;
    }
    if (this.state.name === "") {
      alert("Введите имя");
      return;
    }
    if (this.state.number === "") {
      alert("Введите номер");
      return;
    }
    if (this.props.compairContacts(this.state.name)) {
      return alert(`${this.state.name} is already in contacts`);
    }
    this.props.addContact(this.state.name, this.state.number);
    this.reset();
  };

  render() {
    return (
      <>
        <form className={s.form}>
          <label htmlFor={"nameInput"} className={s.form__item}>
            Name
          </label>
          <input
            className={s.form__item}
            id="nameInput"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            ref={this.nameInput}
            onInput={this.onNameChange}
            value={this.state.name}
          />
          <label htmlFor={"numberInput"} className={s.form__item}>
            Number
          </label>
          <input
            className={s.form__item}
            id="numberInput"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            ref={this.numberInput}
            onInput={this.onNumberChange}
            value={this.state.number}
          />
          <button type="button" onClick={this.onSumbitButton}>
            Добавить
          </button>
        </form>
      </>
    );
  }
}
ContactForm.propTypes = {
  addContact: propTypes.func.isRequired,
};
