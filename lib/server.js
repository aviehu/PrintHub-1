const express = require('express');

const { getProduct } = require('./db');
const { renderProduct } = require('./renderer');

const { PORT = 3000 } = process.env;
const app = express();

app.use('/public', express.static('public'));

async function handleProductRequest(req, res) {
    try {
        const { productId } = req.params;
        const product = await getProduct(productId);
        const html = await renderProduct(product);
    
        res.end(html);
    } catch(e) {
        res.status(500).end(e.message);
        console.error(e);
    }
}

app.get('/product/:productId', handleProductRequest);
app.listen(PORT);
console.log(`Listening on port: ${PORT}`);
