const express = require('express');
const app = express();

app.use(express.json());

const clientes = [
    { id: 1, nombre: 'Deivid Del Carpio', email: 'ddelcarpio@gmail.com' },
    { id: 2, nombre: 'Jhon Vilca', email: 'jvilca@gmail.com' },
    { id: 3, nombre: 'Del Carpio Vilca', email: 'dcvilca@gmail.com' }
];

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 35 },
    { id: 2, nombre: 'Producto 2', precio: 22 },
    { id: 3, nombre: 'Producto 3', precio: 17 }
];

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Productos y Clientes');
});

app.get('/clientes', (req, res) => {
    res.json(clientes);
});

app.get('/productos', (req, res) => {
    res.json(productos);
});

// POST - CLIENTES
app.post('/clientes', (req, res) => {
    const nuevoCliente = {
        id: clientes.length + 1,
        nombre: req.body.nombre,
        email: req.body.email
    };
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// POST - PRODUCTOS
app.post('/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// PUT - CLIENTES
app.put('/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).send('El cliente no fue encontrado.');

    cliente.nombre = req.body.nombre;
    cliente.email = req.body.email;
    res.json(cliente);
});

// PUT - PRODUCTOS
app.put('/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).send('El producto no fue encontrado.');

    producto.nombre = req.body.nombre;
    producto.precio = req.body.precio;
    res.json(producto);
});

// DELETE - CLIENTES
app.delete('/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).send('El cliente no fue encontrado.');

    const index = clientes.indexOf(cliente);
    clientes.splice(index, 1);
    res.json(cliente);
});

// DELETE - PRODUCTOS
app.delete('/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).send('El producto no fue encontrado.');

    const index = productos.indexOf(producto);
    productos.splice(index, 1);
    res.json(producto);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
