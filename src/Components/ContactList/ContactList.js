import react, { Component } from "react";
import propTypes from "prop-types";
import shortid from "shortid";
import s from "./ContactList.module.css";

export default class ContactList extends Component {
  render() {
    return (
      <>
        <ul className={s.contactList}>
          {this.props.filtreredContacts.map((contacts) => (
            <li
              className={s.contactList__item}
              key={shortid.generate()}
              id={contacts.id}
              onClick={(e) => {
                if (e.target.nodeName !== "BUTTON") {
                  return;
                }
                this.props.deleteContact(e.currentTarget.id);
                console.log(e.currentTarget.id);
              }}
            >
              {contacts.name}: {contacts.number}
              <button type="button" className={s.contactList__button}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

ContactList.propTypes = {
  contacts: propTypes.array.isRequired,
};
