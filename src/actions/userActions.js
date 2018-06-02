export const setUser = (user) => (
    {
        type: 'SET_USER',
        user: {
            ...user
        }
    }
);

export const deleteUser = () => (
    {
        type: 'DELETE_USER',
        user: { undefined }
    }
);

export const createUserDb = (user) => (
    {
        type: 'CREATE_USER_DB',
        user: {
            ...user
        }

    }

);
