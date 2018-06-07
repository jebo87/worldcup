import database from '../helpers/database';
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

export const startCreateUserDb = (user = {}) => {
    return (dispatch) => {
        //return database.ref('users/')
    }
};

export const startCheckAdmin = (user = {}) => {
    return (dispatch) => {
        database.ref('users/' + user.uid).once('value', (snapshot) => {
            if (snapshot.val()) {
                let myUser = {
                    email: user.email,
                    userId: user.uid,
                    name: user.displayName,
                    image: user.photoURL,
                    admin: false
                }
                if (snapshot.val().type === 'administrator') {

                    myUser['admin'] = true;

                }
                dispatch(setUser(myUser));
            }
        });
    }
}
