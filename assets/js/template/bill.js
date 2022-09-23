(() => {
    if (typeof window.Bill != 'undefined') {
        return;
    }
    window.Bills = {
        pageSize: 10,
        billsApi: 'http://localhost:3000/bills',
        usersApi: 'http://localhost:3000/users',
        init: async function() {

            let billList = await CRUD.get(this.billsApi);

            this.starBills(billList, this.pageSize, 1);
            this.setEventInputSearch();

        },
        starBills: function(billList, size, pageCurrent) {
            this.showBillToViewByPage(billList, pageCurrent, size);
            this.showPageToView(billList, size, pageCurrent);
            this.addEventPage(billList, size);
        },
        setEventButtonShowAllBill: async function(element) {
            document.select('.table-action .actions .btn.active').classList.remove('active');
            element.classList.add('active');
            const billList = await CRUD.get(this.billsApi);
            this.starBills(billList, this.pageSize, 1);


        },
        setEventButtonShowPending: async function(element) {
            document.select('.table-action .actions .btn.active').classList.remove('active');
            element.classList.add('active');
            const billList = await CRUD.get(this.billsApi);
            const billPendingList = billList.filter(bill => {
                return bill.status == 'pending';
            })
            this.starBills(billPendingList, this.pageSize, 1);

        },
        setEventButtonShowBillBig: async function(element) {
            document.select('.table-action .actions .btn.active').classList.remove('active');
            element.classList.add('active');
            const billList = await CRUD.get(this.billsApi);
            billList.sort((user1, user2) => user2.total_money - user1.total_money);
            this.starBills(billList.length > 10 ? billList.splice(0, 10) : billList, this.pageSize, 1);

        },
        setEventInputSearch: function() {
            const self = this;
            const delay = 500; //ms
            const inputSearch = document.select('.table-search input[type="search"]');
            let timeout = null;

            const filterFunc = async function() {
                let billList = await CRUD.get(self.billsApi);

                const text = this.value;

                const isSearchId = !isNaN(parseInt(text));
                billList = billList.filter(product => {
                    if (isSearchId && product.id == text) {
                        return true;
                    }
                    return product.supplier === text ||
                        product.name.indexOf(text) != -1
                });
                self.starBills(billList, self.pageSize, 1);
            }

            inputSearch.addEventListener('input', async function() {
                clearTimeout(timeout);
                timeout = setTimeout(filterFunc.bind(this), delay);
            });
        },
        pageCurrent: function(billList, size) {
            let pageCurrent = parseInt(document.querySelector('.paging .pages .page.active').innerText);

            if (pageCurrent > Math.ceil(billList.length / size)) {
                const pageList = document.querySelectorAll('.paging .pages .page');
                pageList[pageCurrent - 1].classList.add('active');
                pageCurrent--;
            }
            return pageCurrent;
        },
        addEventPage: function(billList, size) {
            const pageList = document.querySelectorAll('.paging .pages .page');
            const that = this;
            pageList.forEach((page, index) => {
                page.addEventListener('click', function() {
                    document.querySelector('.paging .pages .page.active').classList.remove('active');
                    this.classList.add('active');

                    that.showBillToViewByPage(billList, index + 1, size);

                })
            })
        },
        showPageToView: function(billList, size, pageCurrent = 1) {
            const pages = document.querySelector('.paging .pages');

            const totalPage = Math.ceil(billList.length / size);

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
        showBillToViewByPage: function(billList, page, size) {

            if (page * size > billList.billList) {
                const productsPage = billList.slice((page - 1) * size, billList.length);
                this.showBillToView(productsPage);
                return;
            }

            const productsPage = billList.slice((page - 1) * size, page * size);
            this.showBillToView(productsPage);

        },
        showBillToView: async function(bills) {
            const that = this;
            const tbody = document.select('#tbody_bill');
            tbody.selectAll('tr:not(.tr_row_template)').forEach(tr => tr.remove());

            for (const bill of bills) {
                const template = tbody.select('.tr_row_template').cloneNode(true);
                template.classList.remove('d-none', 'tr_row_template');

                for (const key in bill) {
                    const item = template.select('[data-item="' + key + '"]');

                    if (key == 'customer_id') {
                        const userList = await CRUD.get(that.usersApi);
                        userList.forEach(user => {
                            if (user.id == bill.customer_id) {
                                item.innerText = user.name;
                                template.select('[data-item="customer_phone"]').innerText = user.phone;
                            }
                        })
                        continue;
                    }
                    if (key == 'status') {
                        if (bill.status == 'pending') {
                            const actions = template.select('.actions');
                            actions.innerHTML = actions.innerHTML + `<span class="material-symbols-sharp action-object check">check</span>`;
                            item.innerText = 'Đang chờ duyệt';
                            item.classList.add('warning');

                            const check = actions.select('.check');
                            check.addEventListener('click', function() {

                                window.ModalPropmt.createHtml("Bạn muốn duyệt đơn hàng này?", "Nếu nhấn Ok thì sản phẩm sẽ được duyệt. Nhấn Cancel để quay lại!", "Ok", "Cancel");
                                window.ModalPropmt.setEventBtn(async function() {

                                    bill.status = 'success';

                                    const status = template.select('[data-item="status"]');
                                    status.innerHTML = "Thành công";
                                    status.classList.remove('warning');
                                    status.classList.add('success');

                                    const data = {...bill };
                                    delete data["id"];

                                    await CRUD.repair(that.billsApi, data, bill.id);

                                    actions.select('.check').remove();

                                    window.createToast('success', 'Duyệt đơn thành công', 1000, 3000);



                                }, "Ok")
                                window.ModalPropmt.setEventBtn(function() {}, "Cancel")
                            });

                        }
                        if (bill.status == 'success') {
                            item.innerText = 'Thành công';
                            item.classList.add('success');
                        }
                        continue;
                    }

                    if (item != null) {
                        item.innerText = bill[key];
                    }
                }
                template.select('.delete').addEventListener('click', async function(e) {
                    e.preventDefault();

                    const self = this;

                    window.ModalPropmt.createHtml("Bạn muốn xóa bill này?",
                        "Nếu nhấn Delete thì bills sẽ bị xóa vĩnh viễn. Nhấn Cancel để quay lại!", "Delete", "Cancel");
                    window.ModalPropmt.setEventBtn(async function() {

                        if (that.handleDeleteBill(bill)) {
                            self.closest("tr").remove();

                            await CRUD.delete(that.billsApi, bill.id);

                            window.createToast('success', 'Xóa hóa đơn thành công thành công', 1000, 3000);
                            const billList = await CRUD.get(self.billsApi);
                            const pageCurrent = that.pageCurrent(billList, 10);
                            that.starBills(billList, 10, pageCurrent);
                        } else {
                            window.createToast('warning', 'Không thể xóa đơn hàng này!', 1000, 3000);
                        }

                    }, "Delete")
                    window.ModalPropmt.setEventBtn(function() {}, "Cancel")
                })
                tbody.appendChild(template);
            }

        },
        handleDeleteBill: function(bill) {
            return (bill.status == 'pending')
        }

    }

    Bills.init();
})();