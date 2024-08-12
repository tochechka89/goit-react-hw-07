import css from './Contact.module.css'
import { useDispatch } from 'react-redux'
import { deleteContact } from '../../redux/contactsOps';

export default function Contact({ contact: { name, number, id } }) {

    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteContact(id));
    }

    return (
        <div className={css.box}>
            <div>
                <p className={css.text}>{name}</p>
                <p className={css.text}>{number}</p>
            </div>
            <button className={css.btn} type="button" onClick={handleDelete}>Delete</button>
        </div>
    )
}