window.Request = {

    baseUrl: '/',
    get: function(url, callback) {
        const xhttp = new XMLHttpRequest || ActiveXObject();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            }
        }
        xhttp.open('GET', this.baseUrl + url, true);
        xhttp.send();
    },
    getAsync: async function(url) {
        const self = this;
        return new Promise(function(resolve) {
            self.get(url, function(result) {
                return resolve(result);
            });
        });
    }

}