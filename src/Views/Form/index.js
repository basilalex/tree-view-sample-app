import styles from './styles.module.css';
import { useContext, useState } from 'react';
import { FormContext, StateContext } from '../../constants';

const Form = ({ value }) => {
    const { id, name, parentPath } = value;
    const [formValue, setFromValue] = useState(name || '');
    const { closeForm } = useContext(FormContext);
    const { renameItem, addItem } = useContext(StateContext);

    const onChange = e => {
        setFromValue(e.target.value);
    };

    const submit = e => {
        e.preventDefault();
        e.stopPropagation();

        if (name) {
            renameItem({ id, parentPath, formValue });
        } else {
            formValue && addItem({ id, parentPath, formValue });
        }

        closeForm();
    };

    return (
        <div className={styles.form}>
            <div className={styles.form__header}>
                <button onClick={closeForm}>Close</button>
            </div>
            <div className={styles.form__body}>
                <p>Name:</p>
                <input value={formValue} onChange={onChange} placeholder='New Category' />
                <button onClick={submit}>Submit</button>
            </div>
        </div>
    );
};

export default Form;
