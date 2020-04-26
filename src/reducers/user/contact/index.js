export const contactDetailReducer = (contact = {}, action) => {
    if (action.type === 'CONTACT_DETAIL') {
        return action.payload;
    }
    return contact;
};

