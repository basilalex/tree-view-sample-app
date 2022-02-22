import { useState, useReducer, useEffect, useMemo } from 'react';

import Tree from '../Tree';
import Form from '../Form';
import { FormContext, ROOT_NODE_ID } from '../../constants';
import styles from './styles.module.css';
import { reducer, ADD_ITEM, RENAME_ITEM, DELETE_ITEM } from './reducer';
import { sampleData } from './sampleData';
import { SAMPLE_DATA_KEY, StateContext } from '../../constants';

const App = () => {
    const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem(SAMPLE_DATA_KEY)) || { children: [] });
    const [formValue, setFormValue] = useState(null);
    const content = state.children.map(item => <Tree item={item} key={item.id} />);

    const stateContextValue = useMemo(
        () => ({
            addItem: payload =>
                dispatch({
                    type: ADD_ITEM,
                    payload,
                }),
            renameItem: payload =>
                dispatch({
                    type: RENAME_ITEM,
                    payload,
                }),
            deleteItem: payload =>
                dispatch({
                    type: DELETE_ITEM,
                    payload,
                }),
        }),
        [],
    );

    const formContextValue = useMemo(
        () => ({
            openForm: value => setFormValue(value),
            closeForm: () => setFormValue(null),
        }),
        [],
    );

    useEffect(() => {
        if (!localStorage.getItem(SAMPLE_DATA_KEY)) {
            try {
                localStorage.setItem(SAMPLE_DATA_KEY, JSON.stringify(sampleData));
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(SAMPLE_DATA_KEY, JSON.stringify(state));
        } catch (error) {
            console.log(error);
        }
    }, [state]);

    return (
        <div className={styles.app}>
            <p className={styles.app__description}>Unlimited Hierarchical Category Tree View</p>
            <div className={styles.app__content}>
                <h1>Category List</h1>
                <StateContext.Provider value={stateContextValue}>
                    <FormContext.Provider value={formContextValue}>
                        {content}
                        {!!formValue && <Form value={formValue} />}
                    </FormContext.Provider>
                </StateContext.Provider>
            </div>
            <div className={styles.app__footer}>
                <button onClick={() => formContextValue.openForm({ name: '', parentPath: '', id: ROOT_NODE_ID })}>
                    Create Category
                </button>
            </div>
        </div>
    );
};

export default App;
