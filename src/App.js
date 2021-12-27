import s from "./App.module.css";
import ContactForm from "./Components/ContactForm/ContactForm";
import Filter from "./Components/Filter/Filter";
import ContactList from "./Components/ContactList/ContactList";
import react, { Component } from "react";
import shortid from "shortid";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contacts) => contacts.id !== contactId
      ),
    }));
  };

  compairContacts = (e) => {
    let contacts = this.state.contacts;
    if (contacts.some(({ name }) => name === e)) {
      return true;
    }
  };

  addContact = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  findByName = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filtreredContacts = this.findByName();
    return (
      <div className={s.app}>
        <ContactForm
          addContact={this.addContact}
          compairContacts={this.compairContacts}
        />
        <h2>Contacts</h2>
        <Filter onChange={this.changeFilter} />
        <ContactList
          contacts={contacts}
          deleteContact={this.deleteContact}
          filtreredContacts={filtreredContacts}
        />
      </div>
    );
  }
}

export default App;
