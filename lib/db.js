const { Client } = require('pg');
const { DATABASE_URL } = process.env;

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

module.exports = {
    async getProduct(productId) {
        const query = `SELECT * FROM public.product WHERE public.product.id = $1`;
        const result = await client.query(query, [productId]);
        const [product] = result.rows;
        return product;
    }
}