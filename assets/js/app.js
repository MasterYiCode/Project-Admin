const Apps = {
    init: function() {
        this.bindActionMenuLeft();
        this.showDefaultPage();
    },

    // Show default dashbroad
    showDefaultPage: function(page = 'dashboard') {
        this.getContentMain(page);
    },

    // Bind event Menu Left
    bindActionMenuLeft: function() {
        document.selectAll('.sidebar-item').forEach((item) => {
            item.addEventListener('click', function(e) {
                e.preventDefault();

                // Cái nào không có dữ liệu page thì sẽ không có sự kiện gì
                const dataPage = this.getAttribute('data-page');
                if (dataPage == null || dataPage == '') {
                    return false;
                }
                const container = document.select('.container');
                if (dataPage != 'dashboard') {
                    container.classList.add('right-none');
                } else {
                    if (container.classList.contains('right-none')) {
                        container.classList.remove('right-none');
                    }
                }

                document.select('.sidebar-item.active').classList.remove('active');
                item.classList.add('active');

                Apps.getContentMain(dataPage);
            });
        });
    },
    // Get content main corresponding(tương ứng)
    getContentMain: async function(page) {
        const mainArea = document.select('main');
        mainArea.setAttribute('id', page);
        const html = await Request.getAsync('template/' + page + '.html');
        mainArea.innerHTML = '';
        mainArea.append(html);

        const NameScript = this.ucFirst(page);
        if (typeof window[NameScript] != 'undefined') {
            return window[NameScript].init();
        }

        // Create element script then assign src="" (file javascript write events, render data)
        const script = document.createElement('script');
        script.src = '/assets/js/template/' + page + '.js';
        document.select('body').appendChild(script);
    },
    // Uppercase First + Lowercase....
    ucFirst: function(string) {
        string = string.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

window.addEventListener('DOMContentLoaded', function() {
    Apps.init();
});


const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});


themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})



