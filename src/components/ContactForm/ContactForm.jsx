import css from './ContactForm.module.css';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps'; 

const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too short!').max(50, 'Too long!').required('Required'),
    number: Yup.string().min(3, 'Too short!').max(50, 'Too long!').required('Required'),
});

export default function ContactForm() {
    const dispatch = useDispatch();
    const nameId = useId(); 
    const numberId = useId();

    const initialValues = {
        name: '',
        number: '',
    };

    const handleSubmit = (values, actions) => {
        dispatch(addContact(values)); 
        actions.resetForm();
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor={nameId} className={css.label}>Name</label>
                    <Field type="text" name="name" id={nameId} />
                    <ErrorMessage name="name" component="span" className={css.error} />
                </div>
                <div className={css.formGroup}>
                    <label htmlFor={numberId} className={css.label}>Number</label>
                    <Field type="text" name="number" id={numberId} />
                    <ErrorMessage name="number" component="span" className={css.error} />
                </div>
                <button type="submit" className={css.btn}>Add contact</button>
            </Form>
        </Formik>
    );
}