const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost/onlinestore', { useNewUrlParser: true, useUnifiedTopology: true });

const Product = mongoose.model('Product', {
    name: String,
    description: String,
    price: Number,
    stock: Number,
});

app.use(bodyParser.json());

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

app.put('/products/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
});

app.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndRemove(req.params.id);
    res.json({ message: 'Product deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
