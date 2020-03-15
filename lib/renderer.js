const Vue = require('vue');
const vueServerRenderer = require('vue-server-renderer');
const fs = require('fs');

const indexTemplate = fs.readFileSync('./templates/index.html', 'utf-8');
const productTemplate = fs.readFileSync('./templates/product.html', 'utf-8');

const renderer = vueServerRenderer.createRenderer({ template: indexTemplate });

module.exports = {
    renderProduct(product) {
        const app = new Vue({ data: product, template: productTemplate });
        const context = { 
            title: `Product ID: ${product.id}`,
        };

        return renderer.renderToString(app, context);
    }
};
