import "./App.css";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import ContactForm from '../ContactForm/ContactForm'
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectLoading } from "../../redux/contactsSlice";
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contactsOps';

export default function App() {

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && <Loading />}
      {error && <Error />}
      <ContactList />
    </div>
  )


}