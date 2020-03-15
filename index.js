const Vue = require('vue');
const express = require('express');
const vueServerRenderer = require('vue-server-renderer');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const app = express();
const template = fs.readFileSync('./index.template.html', 'utf-8');

const renderer = vueServerRenderer.createRenderer({ template });
app.get('/product/:productId', (req, res) => {
    const productId = req.params.productId
    const app = new Vue({
        template: `<div></div>`,
    });
    const context = {
        title: `Product ID: ${productId}`,
        productId: productId,
    };

    renderer.renderToString(app, context, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error');
            throw err;
        }
        res.end(html);
    });
});

app.listen(PORT);
console.log(`Listening on port: ${PORT}`);
