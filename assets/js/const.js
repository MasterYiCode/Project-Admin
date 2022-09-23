Element.prototype.select = HTMLDocument.prototype.select = function(el) {
    return this.querySelector(el);
}

Element.prototype.selectAll = HTMLDocument.prototype.selectAll = function(el) {
    return this.querySelectorAll(el);
}

HTMLFormElement.prototype.getDataForm = function() {
    const result = {};
    const formData = new FormData(this);
    formData.forEach(function(value, name) {
        result[name] = value;
    });
    return result;
}

Element.prototype.append = function(html) {
    this.insertAdjacentHTML('beforeend', html);
}
window.formatNumber = function(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

window.checkPrice = price => (typeof price == 'number' && price > 0);

window.createToast = function(status, message, timechangeAnimation, timeOut) {
        let templateInner = '';

        switch (status) {
            case 'success':
                templateInner = `
            <i class="fa-solid fa-circle-check"></i>
            <span class="message">${message}!</span>`;
                break;
            case 'warning':
                templateInner = `
            <i class="fa-solid fa-circle-exclamation"></i>
            <span class="message">${message}!</span>`;
                break;
            case 'error':
                templateInner = `
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span class="message">${message}!</span>`;
                break;
        }
        let toast = document.createElement('div');
        toast.classList.add('toast');
        toast.classList.add(status);

        toast.innerHTML = `${templateInner}<span class="countdown"></span>`;

        const toastList = document.getElementById('toast');
        toastList.appendChild(toast);

        setTimeout(function() {
            toast.style.animation = 'slide_hide 2s ease forwards'
        }, timechangeAnimation)
        setTimeout(function() {
            toast.remove();
        }, timeOut)

    }
    // Bạn muốn xóa sản phẩm này?
    // Nếu nhấn Delete thì sản phẩm sẽ bị xóa vĩnh viễn. Nhấn Cancel để quay lại!
window.ModalPropmt = {
    createHtml: function(title, description, btn1, btn2) {
        const html = `<div class="modal-overlay"></div>
                <div class="modal-body">
                    <div class="propmt">
                        <div class="propmt-top">
                            <span class="material-symbols-sharp">error</span>
                            <h2>${title}</h2>
                        </div>
                        <div class="propmt-body">
                            <p>${description}</p>
                        </div>
                        <div class="propmt-action">
                            <button class="btn ${btn1}">${btn1}</button>
                            <button class="btn ${btn2}">${btn2}</button>
                        </div>
                    </div>
                </div>`;

        const modal = document.createElement('div');
        modal.setAttribute('class', 'modal-propmt');
        modal.innerHTML = html;
        const body = document.querySelector('body');
        body.appendChild(modal);
    },
    setEventBtn: function(callback, btn) {
        const self = this;
        const btnAction = document.querySelector(`.propmt-action .${btn}`);
        btnAction.onclick = function() {
            self.setEventCloseModal();
            callback();
        }
    },
    setEventCloseModal: function() {
        const modal = document.querySelector('.modal-propmt');
        modal.remove();
    }

}