const Vue = require('vue');
const express = require('express');
const vueServerRenderer = require('vue-server-renderer');
const fs = require('fs');
const { Client } = require('pg');
const { DATABASE_URL, PORT = 3000 } = process.env;

function getClientConfiguration() {
    if (DATABASE_URL) {
        return {
            connectionString: DATABASE_URL,
        };
    }

    return {
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        port: 5432,
    };
}
const client = new Client(getClientConfiguration());
client.connect();

const app = express();
const template = fs.readFileSync('./index.template.html', 'utf-8');

async function startServer() {    
    const renderer = vueServerRenderer.createRenderer({ template });
    
    async function handleProductRequest(req, res) {
        const productId = req.params.productId;
        const query = `SELECT * FROM public.product WHERE public.product.id = $1`;
        const result = await client.query(query, [productId]);
        const [product] = result.rows;
        console.log(product);
        const app = new Vue({ data: product, template: `<div>{{name}}</div>` });

        const context = {
            title: `Product ID: ${product.name}`,
            productId: productId,
        };
    
        renderer.renderToString(app, context, (err, html) => {
            if (err) {
                res.status(500).end('Internal Server Error');
                throw err;
            }
            res.end(html);
        });
    }

    app.get('/product/:productId', handleProductRequest);
    
    app.listen(PORT);
}
startServer().then(() => {
    console.log(`Listening on port: ${PORT}`);
});
