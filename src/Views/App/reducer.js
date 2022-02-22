import { v4 as uuidv4 } from 'uuid';
import { ROOT_NODE_ID } from '../../constants';

export const ADD_ITEM = 'ADD_ITEM';
export const RENAME_ITEM = 'RENAME_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

const isRoot = id => id === ROOT_NODE_ID;
const findById = id => item => item.id === id;

const getParentTreeNode = (state, { id, parentPath }) => {
    if (isRoot(id)) {
        return state;
    }

    const parts = parentPath.split('.');

    return parts.reduce((stateItem, path) => isRoot(path)
        ? stateItem
        : stateItem.children.find((findById(path)))
    , state);
};

const getTreeNode = (parentNode, id) => {
    const node = parentNode.children.find(findById(id));

    return node || parentNode;
};

export const reducer = (state, action) => {
    switch (action.type) {
        case DELETE_ITEM: {
            const { id } = action.payload;
            const parentNode = getParentTreeNode(state, action.payload);
            const index = parentNode.children.findIndex(findById(id));

            parentNode.children.splice(index, 1);

            return { ...state };
        }
        case ADD_ITEM: {
            const { formValue: name, parentPath, id } = action.payload;
            const node = getTreeNode(getParentTreeNode(state, action.payload), id);
            const newId = uuidv4();

            node.children.push({
                children: [],
                id: newId,
                name,
                parentPath: !!parentPath ? `${parentPath}.${id}` : id,
            });

            return { ...state };
        }
        case RENAME_ITEM: {
            const { formValue: name, id } = action.payload;
            const node = getTreeNode(getParentTreeNode(state, action.payload), id);

            node.name = name;

            return { ...state };
        }

        default:
            return state;
    }
};
