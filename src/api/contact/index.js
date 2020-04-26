export function doGetContact() {
    return fetch(process.env.REACT_APP_WS_URL + `/contact`, {
        method: 'GET',
    })
}

export function doGetContactById(id) {
    return fetch(process.env.REACT_APP_WS_URL + `/contact/${id}`, {
        method: "GET",
    });
}

export function doAddContact(Contact) {
    return fetch(process.env.REACT_APP_WS_URL + `/contact`, {
        method: 'POST',
        body: JSON.stringify(Contact)
    })
}

export function doDeleteContactById(id) {
    return fetch(process.env.REACT_APP_WS_URL + `/contact/${id}`, {
        method: "DELETE",
    });
}

export function doUpdateContact(id, UpdatedContact) {
    return fetch(process.env.REACT_APP_WS_URL + `/contact/${id}`, {
        method: 'PUT',
        body: JSON.stringify(UpdatedContact)
    })
}




