import s from "./App.module.css";
import ContactForm from "./Components/ContactForm/ContactForm";
import Filter from "./Components/Filter/Filter";
import ContactList from "./Components/ContactList/ContactList";
import react, { PureComponent } from "react";
import shortid from "shortid";

class App extends PureComponent {
  state = {
    contacts: [],
    filter: "",
  };

  lContacts = () => {
    return localStorage.getItem("contacts")
      ? JSON.parse(localStorage.getItem("contacts"))
      : [];
  };

  componentDidMount = () => {
    console.log("срабатывает в начале");

    const checkContacts = localStorage.getItem("contacts");

    if (checkContacts) {
      const parsedContacts = JSON.parse(checkContacts);

      this.setState({ contacts: parsedContacts });
    }
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };
  deleteFromLocaleStorage = (e) => {
    let updateContacts = this.lContacts().filter(
      (contacts) => contacts.id !== e
    );
    let updatedContacts = JSON.stringify(updateContacts);
    localStorage.setItem("contacts", updatedContacts);
  };
  deleteContact = (contactId) => {
    this.deleteFromLocaleStorage(contactId);

    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contacts) => contacts.id !== contactId
      ),
    }));
  };

  compairContacts = (e) => {
    if (this.lContacts().some(({ name }) => name === e)) {
      return true;
    }
    // let contacts = this.state.contacts;
    // if (contacts.some(({ name }) => name === e)) {
    //   return true;
    // }
  };

  addContact = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    let lContacts = localStorage.getItem("contacts")
      ? JSON.parse(localStorage.getItem("contacts"))
      : [];
    lContacts.unshift(newContact);
    localStorage.setItem("contacts", JSON.stringify(lContacts));

    this.setState({ contacts: lContacts });
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
