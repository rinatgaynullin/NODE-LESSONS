export const postJson = (url,data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(result => result.json())
    .catch(error => {
        console.log(error)
    })
};

export const getJson = (url) => {
    return fetch(url)
    .then(result => result.json())
    .catch(error => {
        console.log(error)
    })
}