import css from './ContactList.module.css'
import Contact from '../Contact/Contact'
import { useSelector } from 'react-redux'
import { selectFilteredContacts } from '../../redux/contactsSlice'

export default function ContactList() {
    const contactsFilter = useSelector(selectFilteredContacts)


    return (
        <ul className={css.container}>
            {contactsFilter.map((contact) => (
                <li key={contact.id}><Contact contact={contact} /></li>
            ))}
        </ul>
    )
}