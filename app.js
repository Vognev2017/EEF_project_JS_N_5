const express = require('express');
const axios = require('axios');

const {
    getProduct
} = require('./product/products');
const {
    getProductAll
} = require('./product/products');

const server = express();

server.set('view engine', 'ejs')
server.set('views', './views')

server.use(express.static('./public'));

server.get('/', (req, res) => {

    const productsDB = async () => {
        const resp = await axios.get('http://localhost:3500/products')
        const products = resp.data
        res.render('index', {
            products
        })
    }
    productsDB()
});

server.get('/product/:id', (req, res) => {
    const {
        id
    } = req.params;
    const product = getProduct(Number(id))

    if (product !== undefined) {
        res.render('main', {
            product
        })
    } else {
        res.status(404).render('error/404', {
            title: "Sorry, page not found"
        });
    }
});

server.get('/products', (req, res) => {
    const products = JSON.stringify(getProductAll())
    res.send(products)

});
server.use(function (req, res, next) {
    res.status(404).render('error/404', {
        title: "Sorry, page not found"
    });
});
server.listen(3000);