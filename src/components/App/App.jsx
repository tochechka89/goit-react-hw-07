import "./App.css";
import { useDispatch, useSelector } from 'react-redux'
import {  selectError, selectLoading } from '../../redux/contactsSlice'
import ContactForm from '../ContactForm/ContactForm'
import ContactList from '../ContactList/ContactList'
import SearchBox from '../SearchBox/SearchBox'
import { useEffect } from 'react'
import { fetchContacts } from '../../redux/contactsOps'



export default function App() {
    const dispatch = useDispatch();
const loading = useSelector(selectLoading);
const isError = useSelector(selectError);

useEffect(() => {
    dispatch(fetchContacts());
}, [dispatch]);
    
    

    return (<div>
        <h1>Phonebook</h1>
        <ContactForm />
        <SearchBox />
        {loading && <p>Loading...</p>}
        {isError && <p>{isError}</p>}
        <ContactList />
        </div>
    )
}