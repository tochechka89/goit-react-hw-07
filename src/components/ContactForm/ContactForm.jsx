import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from "react";
import * as Yup from "yup";
import css from './ContactForm.module.css'
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';

export default function ContactForm() {
    const nameId = useId();
    const numberId = useId();

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
        .min(3, 'Too Short!')
            .max(50, 'Too Long!')
        .required(),
        number: Yup.number()
            .min(3, 'Too Short!')
            // .max(500, 'Too Long!')
        .required(),
    })

    const dispatch = useDispatch();

    const handleSubmit = (value, { resetForm }) => {
        dispatch(addContact({name: value.name, number: value.number }))
        resetForm()
    }

    return <Formik initialValues={{
        name: '',
        number: '',
    }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}>
        <Form className={css.container}>
            <div className={css.wrapper}>
            <label htmlFor={nameId}>Name</label>
            <Field type="text" name="name" id={nameId}></Field>
                <ErrorMessage name="name" component="span" className={ css.message}/>
        
            <label htmlFor={numberId}>Number</label>
            <Field type="text" name="number" id={numberId}></Field>
                <ErrorMessage name="number" component="span" className={ css.message} />
            </div>
                <button type="submit">Add contact</button>
             
        </Form>
    </Formik>
}