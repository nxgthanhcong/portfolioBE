
const Handlebars = require("handlebars");

module.exports = {
    sortable: (feild, sort) => {

        const sortType = feild === sort.column ? sort.type : "default"

        const icons = {
            default: "oi oi-elevator",
            asc: "oi oi-sort-ascending",
            desc: "oi oi-sort-descending",
        }

        const types = {
            default: "desc",
            asc: "desc",
            desc: "asc",
        }

        const icon = icons[sortType];
        const type = types[sortType];

        const href = Handlebars.escapeExpression(`?_sort&column=${feild}&type=${type}`)
        const output = `<a href="${href}">
            <span class="${icon}"></span>
        </a>`;

        return new Handlebars.SafeString(output);
    },

    paging: (pageCount, size, current) => {

        current = parseInt(current);
        let pageNumbers = "";

        for (i = 1; i <= pageCount; i++) {
            let currentItem = `<li class="page-item"><a class="page-link" href="?_page=${i}&_size=${size}">${i}</a></li>`;
            if (i === current) {
                currentItem = `
                    <li class="page-item active">
                        <a class="page-link" href="?_page=${i}&_size=${size}">${i} <span class="sr-only">(current)</span></a>
                    </li>
                `;
            }
            pageNumbers += currentItem;
        }

        return `
        <nav aria-label="..." class="${pageCount === 1 && 'd-none'}">
        <ul class="pagination justify-content-end">
            <li class="page-item ${current === 1 && 'disabled'}">
                <a class="page-link" href="?_page=${current - 1}&_size=${size}" tabindex="-1">Previous</a>
            </li>
            ${pageNumbers}
            <li class="page-item ${current === pageCount && 'disabled'}">
                <a class="page-link" href="?_page=${current + 1}&_size=${size}">Next</a>
            </li>
        </ul>
    </nav>
        `;
    }
}

