//Everything here is from DomoMaker

const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
};

const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if(result.redirect) {
        window.location = result.redirect;
    }

    if(result.error) {
        handleError(result.error);
    }

    if(handler) {
        handler(result);
    }
};

module.exports = {
    handleError,
    sendPost,
};