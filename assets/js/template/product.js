(() => {
    if (typeof window.Product != 'undefined') {
        return;
    }

    window.Product = {
        pageSize: 10,
        productsApi: 'http://localhost:3000/products',
        init: async function() {

            let productList = await CRUD.get(this.productsApi);

            this.starProduct(productList, this.pageSize, 1);
            this.setEventInputSearch();

        },
        starProduct: function(productList, size, pageCurrent) {
            this.showProductToViewByPage(productList, pageCurrent, size);
            this.showPageToView(productList, size, pageCurrent);
            this.addEventPage(productList, size);
        },
        setEventInputSearch: function() {
            const self = this;
            const delay = 500; //ms
            const inputSearch = document.select('.table-search input[type="search"]');
            let timeout = null;

            const filterFunc = async function() {
                

                const text = this.value;

                const isSearchId = !isNaN(parseInt(text));
                let productList = await CRUD.get(self.productsApi);
                productList = productList.filter(product => {
                    if (isSearchId && product.id == text) {
                        return true;
                    }
                    return product.supplier === text ||
                        product.name.indexOf(text) != -1
                });
                self.starProduct(productList, self.pageSize, 1);
            }

            inputSearch.addEventListener('input', async function() {
                clearTimeout(timeout);
                timeout = setTimeout(filterFunc.bind(this), delay);
            });
        },
        pageCurrent: function(productList, size) {
            let pageCurrent = parseInt(document.querySelector('.paging .pages .page.active').innerText);

            if (pageCurrent > Math.ceil(productList.length / size)) {
                const pageList = document.querySelectorAll('.paging .pages .page');
                pageList[pageCurrent - 1].classList.add('active');
                pageCurrent--;
            }
            return pageCurrent;
        },
        addEventPage: function(productList, size) {
            const pageList = document.querySelectorAll('.paging .pages .page');
            const that = this;
            pageList.forEach((page, index) => {
                page.addEventListener('click', function() {
                    document.querySelector('.paging .pages .page.active').classList.remove('active');
                    this.classList.add('active');

                    that.showProductToViewByPage(productList, index + 1, size);

                })
            })
        },
        showPageToView: function(productList, size, pageCurrent = 1) {
            const pages = document.querySelector('.paging .pages');

            const totalPage = Math.ceil(productList.length / size);

            let html = '';

            for (let i = 1; i <= totalPage; i++) {
                if (i == pageCurrent) {
                    html += `<span class="page active" >${i}</span>`;
                    continue;
                }
                html += `<span class="page">${i}</span>`;
            }

            pages.innerHTML = html;
        },
        showProductToViewByPage: function(productList, page, size) {

            if (page * size > productList.productList) {
                const productsPage = productList.slice((page - 1) * size, productList.length);
                this.showProductToView(productsPage);
                return;
            }

            const productsPage = productList.slice((page - 1) * size, page * size);
            this.showProductToView(productsPage);

        },
        showProductToView: function(products) {
            const that = this;
            const tbody = document.select('#tbody_product');
            tbody.selectAll('tr:not(.tr_row_template)').forEach(tr => tr.remove());

            for (const product of products) {
                const template = tbody.select('.tr_row_template').cloneNode(true);
                template.classList.remove('d-none', 'tr_row_template');

                for (const key in product) {
                    const item = template.select('[data-item="' + key + '"]');
                    if (key == 'price') {
                        item.innerText = window.formatNumber(product.price);
                        continue;
                    }
                    if (item != null) {
                        item.innerText = product[key];
                    }
                }
                template.select('.delete').addEventListener('click', async function(e) {
                    e.preventDefault();

                    const self = this;

                    window.ModalPropmt.createHtml("Bạn muốn xóa sản phẩm này?", "Nếu nhấn Delete thì sản phẩm sẽ bị xóa vĩnh viễn. Nhấn Cancel để quay lại!", "Delete", "Cancel");
                    window.ModalPropmt.setEventBtn(async function() {

                        self.closest("tr").remove();

                        await CRUD.delete(that.productsApi, product.id);

                        window.createToast('success', 'Xóa sản phẩm thành công', 1000, 3000);
                        const productList = await CRUD.get(that.productsApi);
                        const pageCurrent = that.pageCurrent(productList, 10);
                        that.starProduct(productList, 10, pageCurrent);
                    }, "Delete")
                    window.ModalPropmt.setEventBtn(function() {}, "Cancel")
                })

                template.select('.edit').addEventListener('click', async function(e) {
                    const modal = document.querySelector('.modal');
                    const btn = document.querySelector('.table-action .actions .btn');

                    modal.classList.add('open');

                    const modalOverlay = document.querySelector('.modal-overlay');
                    console.log(modalOverlay);
                    modalOverlay.addEventListener('click', function(e) {
                        e.stopPropagation();
                        that.setEventClose();
                        that.resetFormAddProduct();
                    })

                    that.handleRepairProduct(product);

                    that.setEventButtonConfirmForm("PUT", product.id)

                })
                tbody.appendChild(template);
            }
        },
        handleRepairProduct: function(product) {
            const form = document.select('#form_product_info');
            const inputId = document.select('#id-product');

            inputId.disabled = false;

            const dataForm = form.getDataForm();
            for (const key in dataForm) {
                const input = document.select(`input[name='${key}']`);
                input.value = product[key];
            }
            inputId.disabled = true;
        },
        handleConfirmProduct: async function(status, id) {
            const self = this;
            const form = document.select('#form_product_info');
            const dataForm = form.getDataForm();

            let dataFormisValid = true;

            for (const key in dataForm) {
                const input = document.select(`input[name='${key}']`);
                input.addEventListener('keyup', function() {
                    this.style.border = 'none';
                })
                if (dataForm[key].trim() == '') {
                    input.style.border = '1px solid var(--color-danger)';
                    dataFormisValid = false;
                } else {
                    input.style.border = '1px solid var(--color-success)';
                }
            }

            if (dataFormisValid) {
                if (status == "POST") {
                    await CRUD.create(this.productsApi, dataForm);
                }
                if (status == "PUT") {
                    await CRUD.repair(this.productsApi, dataForm, id);
                }
                this.resetFormAddProduct();
                this.setEventClose();
                const productList = await CRUD.get(this.productsApi);
                const pageCurrent = this.pageCurrent(productList, 10);
                this.starProduct(productList, 10, pageCurrent);
            }

        },
        resetFormAddProduct: function() {
            const form = document.select('#form_product_info');
            const dataForm = form.getDataForm();
            for (const key in dataForm) {
                const input = document.select(`input[name='${key}']`);
                input.style.border = 'none';
            }
            form.reset();
        },
        setEventButtonConfirmForm: function(status, id) {
            const self = this;
            const btnConfirm = document.select('.btn-confirm-form');
            if (status == "POST") {
                btnConfirm.innerHTML = "Thêm";
                btnConfirm.onclick = function() {
                    self.handleConfirmProduct("POST");
                }
            }
            if (status == "PUT") {
                btnConfirm.innerHTML = "Sửa";
                btnConfirm.onclick = function() {
                    self.handleConfirmProduct("PUT", id);
                }
            }

        },
        setEventButtonAddProduct: function() {
            const self = this;
            const modal = document.querySelector('.modal');
            const btn = document.querySelector('.table-action .actions .btn');

            modal.classList.add('open');

            btn.style.backgroundColor = "var(--color-primary)";
            btn.style.color = "var(--color-white)";

            const modalOverlay = document.querySelector('.modal-overlay');
            modalOverlay.addEventListener('click', function(e) {
                e.stopPropagation();
                self.setEventClose();
                self.resetFormAddProduct();
            })

            self.setEventButtonConfirmForm("POST");

        },
        setEventClose: function() {
            const modal = document.querySelector('.modal');
            const btn = document.querySelector('.table-action .actions .btn')

            this.resetFormAddProduct();

            modal.classList.remove('open');

            btn.style.backgroundColor = "var(--color-white)";
            btn.style.color = "var(--color-primary)";
        }
    }
    Product.init();
})();
