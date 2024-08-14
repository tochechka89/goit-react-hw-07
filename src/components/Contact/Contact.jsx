import css from "./Contact.module.css"
import { IoMdContact } from "react-icons/io";
import { FaPhoneFlip } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

export default function Contact({ contact}) {
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        dispatch(deleteContact(id))
    }
    
    return (
        <div className={css.container}>
            <span>
            <p><IoMdContact className={css.icon} size="16"/>{contact.name}</p>
                <p><FaPhoneFlip className={css.icon} size="16"/>{contact.number}</p>
                </span>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
        </div>
    )
}