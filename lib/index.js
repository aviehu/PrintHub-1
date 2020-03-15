const express = require('express');

const { getProduct } = require('./db');
const { renderProduct } = require('./renderer');
const { PORT = 3000 } = process.env;
const app = express();

async function startServer() {    
    async function handleProductRequest(req, res) {
        try {
            const productId = req.params.productId;
            const product = await getProduct(productId);
            const html = await renderProduct(product);
        
            res.end(html);
        } catch(e) {
            res.status(500).end('Internal Server Error');
        }
    }

    app.get('/product/:productId', handleProductRequest);
    
    app.listen(PORT);
}
startServer().then(() => {
    console.log(`Listening on port: ${PORT}`);
});
