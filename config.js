const PORT = 80;

const path = require('path');
const layoutPath= path.join(__dirname, 'views', 'layout.ejs')


module.exports = {
    PORT,
    layoutPath
};