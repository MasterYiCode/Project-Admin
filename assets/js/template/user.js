(() => {
    if (typeof window.User != 'undefined') {
        return;
    }
    window.User = {
        pageSize: 10,
        usersApi: 'http://localhost:3000/users',
        init: async function() {

            let userList = await CRUD.get(this.usersApi);

            this.starUser(userList, this.pageSize, 1);
            this.setEventInputSearch();

        },
        starUser: function(userList, size, pageCurrent) {
            this.showUserToViewByPage(userList, pageCurrent, size);
            this.showPageToView(userList, size, pageCurrent);
            this.addEventPage(userList, size);
        },
        setEventButtonShowAllUser: async function(element) {
            document.select('.table-action .actions .btn.active').classList.remove('active');
            element.classList.add('active');
            const userList = await CRUD.get(this.usersApi);
            this.starUser(userList, this.pageSize, 1);


        },
        setEventButtonShowAdmins: async function(element) {
            document.select('.table-action .actions .btn.active').classList.remove('active');
            element.classList.add('active');
            const userList = await CRUD.get(this.usersApi);
            const adminList = userList.filter(user => {
                return user.type == 'admin';
            })
            this.starUser(adminList, this.pageSize, 1);

        },
        setEventButtonShowCustomers: async function(element) {
            document.select('.table-action .actions .btn.active').classList.remove('active');
            element.classList.add('active');
            const userList = await CRUD.get(this.usersApi);
            const customerList = userList.filter(user => {
                return user.type == 'customer';
            })
            this.starUser(customerList, this.pageSize, 1);

        },
        setEventInputSearch: function() {
            const self = this;
            const delay = 500; //ms
            const inputSearch = document.select('.table-search input[type="search"]');
            let timeout = null;

            const filterFunc = async function() {
                let userList = await CRUD.get(self.usersApi);
                const btnActive = document.select('.table-action .actions .btn.active');

                const text = this.value;
                const isSearchId = !isNaN(parseInt(text));
                userList = userList.filter(user => {
                    const type = btnActive.getAttribute("type").trim();
                    if (user.type == type || type == 'user') {
                        if (isSearchId && user.id == text) {
                            return true;
                        }
                        return user.phone === text ||
                            user.name.indexOf(text) != -1
                    }
                });
                self.starUser(userList, self.pageSize, 1);
            }

            inputSearch.addEventListener('input', async function() {
                clearTimeout(timeout);
                timeout = setTimeout(filterFunc.bind(this), delay);
            });
        },
        pageCurrent: function(userList, size) {
            let pageCurrent = parseInt(document.querySelector('.paging .pages .page.active').innerText);

            if (pageCurrent > Math.ceil(userList.length / size)) {
                const pageList = document.querySelectorAll('.paging .pages .page');
                pageList[pageCurrent - 1].classList.add('active');
                pageCurrent--;
            }
            return pageCurrent;
        },
        addEventPage: function(userList, size) {
            const pageList = document.querySelectorAll('.paging .pages .page');
            const that = this;
            pageList.forEach((page, index) => {
                page.addEventListener('click', function() {
                    document.querySelector('.paging .pages .page.active').classList.remove('active');
                    this.classList.add('active');

                    that.showUserToViewByPage(userList, index + 1, size);

                })
            })
        },
        showPageToView: function(userList, size, pageCurrent = 1) {
            const pages = document.querySelector('.paging .pages');

            const totalPage = Math.ceil(userList.length / size);

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
        showUserToViewByPage: function(userList, page, size) {

            if (page * size > userList.userList) {
                const usersPage = userList.slice((page - 1) * size, userList.length);
                this.showUserToView(usersPage);
                return;
            }

            const usersPage = userList.slice((page - 1) * size, page * size);
            this.showUserToView(usersPage);

        },
        showUserToView: function(users) {
            const that = this;
            const tbody = document.select('#tbody_user');
            tbody.selectAll('tr:not(.tr_row_template)').forEach(tr => tr.remove());

            for (const user of users) {
                const template = tbody.select('.tr_row_template').cloneNode(true);
                template.classList.remove('d-none', 'tr_row_template');

                for (const key in user) {
                    const item = template.select('[data-item="' + key + '"]');
                    if (key == 'type') {
                        if (user.type == 'admin') {
                            item.innerText = 'Admin';
                        }
                        if (user.type == 'customer') {
                            item.innerText = 'Khách hàng'
                        }
                        continue;
                    }
                    if (item != null) {
                        item.innerText = user[key];
                    }
                }
                template.select('.delete').addEventListener('click', async function(e) {
                    e.preventDefault();

                    const self = this;

                    window.ModalPropmt.createHtml("Bạn muốn xóa người dùng này?", "Nếu nhấn Delete thì sản phẩm sẽ bị xóa vĩnh viễn. Nhấn Cancel để quay lại!", "Delete", "Cancel");
                    window.ModalPropmt.setEventBtn(async function() {

                        const result = await that.handleDeleteUser(user.id);

                        if (result) {
                            self.closest("tr").remove();
                            window.createToast('success', 'Xóa người dùng thành công', 1000, 3000);
                            const userList = await await CRUD.get(that.usersApi);
                            const pageCurrent = that.pageCurrent(userList, 10);
                            that.staruser(userList, 10, pageCurrent);
                        } else {
                            window.createToast('warning', 'Không thể xóa tài khoản này!', 1000, 3000);
                        }

                    }, "Delete")
                    window.ModalPropmt.setEventBtn(function() {}, "Cancel")
                })

                tbody.appendChild(template);
            }

        },
        handleDeleteUser: async function(id) {
            const userList = await CRUD.get(this.usersApi);
            let isAdmin = true;
            userList.forEach(user => {
                if (user.id == id && user.type == 'admin') {
                    isAdmin = false;
                }
            })
            if (isAdmin) {
                await CRUD.delete(this.usersApi, id);
            }
            return isAdmin;
        }
    }

    User.init();

})();