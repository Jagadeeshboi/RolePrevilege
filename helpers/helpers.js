const path = require('path');
const hbs = require('hbs');


function registerHelpers() {
    // hbs.registerHelper("DateTime", function (value) {
    //     return value.toLocaleString();
    // });
    hbs.registerHelper("DateTime", function (value) {
        if (!value) return '';
        let year = value.getFullYear().toString();
        let month = (value.getMonth() + 1).toString().padStart(2, '0');
        let day = value.getDate().toString().padStart(2, '0');
        let hours = value.getHours().toString().padStart(2, '0');
        let minutes = value.getMinutes().toString().padStart(2, '0');

        let formattedDateTime = `${year}-${month}-${day}`;
        // ${hours}:${minutes} - 
        return formattedDateTime;
    });

    hbs.registerHelper("formatDate1", function (value) {
        if (!value) return '';

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const date = new Date(value);

        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    });


    hbs.registerHelper("updateVital", async function (arg1, arg2) {
        console.log(arg1, arg2, "ll")
        const data = await vitals.find({ department: arg1, _id: arg2 });
        return data

    })

    hbs.registerHelper("DateAndTime", (value) => {
        return value ? value.toLocaleString() : "";
    });

    hbs.registerPartials(path.join(process.cwd(), 'views/partials'));

    hbs.registerHelper('inc', function (value, options) {
        return parseInt(value) + 1;
        //Hello Test 
    });

    hbs.registerHelper('eq', function (arg1, arg2, options) {
        return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    });
    hbs.registerHelper('eql', function (a, b) {
        return a === b;
    });

    hbs.registerHelper("i", function (value) {
        return parseInt(value) + 1;
    });
    hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    hbs.registerHelper('if_eq', function (a, b, options) {
        if (a == b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    hbs.registerHelper("diffForHumans", function (value) {
        return value.toLocaleString();
    });

    hbs.registerHelper('formatDate', function (date, format) {
        if (!date) return 'N/A';
        return moment(date).format(format);
    });
    hbs.registerHelper("eql", (a, b) => a === b);

    hbs.registerHelper('getFirstElement', function (array) {
        return array && array.length > 0 ? array[0] : ''; // Return first element or empty string
    });

    hbs.registerHelper("ifIncludes", function (array, value, options) {
        if (!Array.isArray(array)) {
            array = typeof array === "string" ? array.split(',').map(item => item.trim()) : [];
        }

        if (array.includes(value)) {
            return options.fn(this);  // Execute the block content
        } else {
            return options.inverse(this);  // Execute the "else" block (if any)
        }
    });

    hbs.registerHelper('formatRoles', function (roles) {
        const roleMap = {
            user: 'User',
            serviceprovider: 'Service provider'
        };

        if (!Array.isArray(roles)) roles = [roles];

        return roles
            .map(role => roleMap[role.toLowerCase()] || (role.charAt(0).toUpperCase() + role.slice(1)))
            .join(', ');
    });

    hbs.registerHelper("includes", function (array, value) {
        return Array.isArray(array) && array.includes(value);
    });
    hbs.registerHelper('formatDate', function (date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    });

    hbs.registerHelper('eq1', function (a, b) {
        return a == b;
    });

    hbs.registerHelper('reverse', function (array) {
        return array ? array.slice().reverse() : [];
    });

    hbs.registerHelper('reverseIndex', function (index, total) {
        return total - 1 - index;
    });
    hbs.registerHelper('json', function (obj) {
        return new hbs.SafeString(JSON.stringify(obj));
    })

    hbs.registerHelper("formatRevenue", function (value) {
        // if (typeof value !== "number") return value;

        if (parseFloat(value) >= 10000000) { // 1 crore = 10,000,000
            return (value / 10000000).toFixed(2).replace(/\.0$/, "") + "Cr";
        } else if (parseFloat(value) >= 100000) { // 1 lakh = 100,000
            return (value / 100000).toFixed(2).replace(/\.0$/, "") + "L";
        } else if (parseFloat(value) >= 1000) { // 1 thousand = 1,000
            return (value / 1000).toFixed(2).replace(/\.0$/, "") + "K";
        }
        return value.toString();
    });

    hbs.registerHelper("or", function (a, b) {
        return a || b;
    });

    hbs.registerHelper('eqID', function (a, b, options) {
        return (a?.toString() == b?.toString())
            ? options.fn(this)
            : options.inverse(this);
    });
    hbs.registerHelper('inc', function (value, options) {
        return parseInt(value) + 1;
        //Hello Test
    });


}

module.exports = registerHelpers;