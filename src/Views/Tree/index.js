import { useContext, useState, memo } from 'react';
import styles from './styles.module.css';
import { FormContext, StateContext } from '../../constants';

const Tree = ({ item, level = 0 }) => {
    const { name, children } = item;
    const [isOpen, setIsOpen] = useState();
    const { openForm } = useContext(FormContext);
    const { deleteItem } = useContext(StateContext);

    const toggleTree = e => {
        e.stopPropagation();
        setIsOpen(state => !state);
    };

    const onAdd = e => {
        e.stopPropagation();
        openForm({ ...item, name: '' });
    };

    const onRename = e => {
        e.stopPropagation();
        openForm(item);
    };

    const onDelete = e => {
        e.stopPropagation();
        deleteItem(item);
    };

    const hasItems = !!children.length;

    return (
        <div className={styles.tree}>
            <div className={styles.tree__header}>
                <div>
                    <button onClick={toggleTree}>{!hasItems || isOpen ? '-' : '+'}</button>
                </div>
                <div>
                    <span>{name}</span>
                </div>
                <div>
                    <button onClick={onAdd}>Add</button>
                    <button onClick={onRename}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            </div>
            {hasItems && isOpen && (
                <div>
                    {children.map(item => (
                        <Tree item={item} key={item.id} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default memo(Tree);
