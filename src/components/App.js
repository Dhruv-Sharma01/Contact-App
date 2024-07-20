import React, { useState, useEffect } from "react";
import './App.css';
import api from '../api/contacts';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";

function App() {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const retrieveContacts = async () => {
        const response = await api.get("/contacts");
        return response.data;
    }

    const addContactHandler = async (contact) => {
        const request = {
            id: uuid(),
            ...contact
        }
        const response = await api.post('/contacts', request);
        setContacts([...contacts, response.data]);
    };

    const updateContactHandler = async (contact) => {
        const response = await api.put(`/contacts/${contact.id}`, contact);
        const { id, name, email } = response.data;

        setContacts(contacts.map(contact => {
            return contact.id === id ? { ...response.data } : contact;
        }));
    };

    const removeContactHandler = async (id) => {
        await api.delete(`/contacts/${id}`);
        const newContactList = contacts.filter((contact) => contact.id !== id);
        setContacts(newContactList);
    };

    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm !== "") {
            const newContactList = contacts.filter((contact) => {
                return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
            });
            setSearchResults(newContactList);
        } else {
            setSearchResults(contacts);
        }
    }

    useEffect(() => {
        const getAllContacts = async () => {
            const allContacts = await retrieveContacts();
            if (allContacts) setContacts(allContacts);
        };
        getAllContacts();
    }, []);

    return (
        <div className="ui container">
            <Router>
                <Header />
                <Routes>
                    <Route 
                        path="/" 
                        element={<ContactList
                            contacts={searchTerm.length < 1 ? contacts : searchResults}
                            getContactId={removeContactHandler}
                            term={searchTerm}
                            searchKeyword={searchHandler}
                        />}
                    />
                    <Route 
                        path="/add" 
                        element={<AddContact addContactHandler={addContactHandler} />} 
                    />
                    <Route 
                        path="/edit/:id" 
                        element={<EditContact updateContactHandler={updateContactHandler} />} 
                    />
                    <Route 
                        path="/contact/:id" 
                        element={<ContactDetail />} 
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
