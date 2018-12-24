require('rootpath')();
const path = require('path');
const fs = require('fs');

const loadRoutes = (app, express, rootPath) => {
    fs.readdirSync(rootPath).forEach(file => {
        if (file === 'index.js') return;
        const filePath = path.join(rootPath, file);
        const route = fs.statSync(filePath).isDirectory()
            ? loadRoutes(app, express, filePath)
            : filePath;
        if (!route || !route.includes('Router')) return;
        // eslint-disable-next-line
    require(route)(app, express);
    });
};

module.exports = (app, express) => loadRoutes(app, express, path.join(__dirname, './'));
