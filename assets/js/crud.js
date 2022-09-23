window.CRUD = {
    get: function(url) {
        return new Promise(resolve => {
            fetch(url)
                .then(response => response.json())
                .then(result => resolve(result));
        })
    },
    delete: function(url, id) {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return new Promise(resolve => {
            fetch(url + '/' + id, options)
                .then(response => response.json())
                .then(result => resolve(result));
        })
    },
    create: function(url, data) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        return new Promise(resolve => {
            fetch(url, options)
                .then(response => response.json())
                .then(result => resolve(result));
        })
    },
    repair: function(url, data, id) {
        const options = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return new Promise(resolve => {
            fetch(url + '/' + id, options)
                .then(response => response.json())
                .then(result => resolve(result));
        })
    }
}