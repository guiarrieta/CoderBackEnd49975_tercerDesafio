const express = require("express");

const ProductManager = require("./ProductManager");

const path = require("path");

// puerto para escuchar peticiones
const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }))


let archivo = path.join(__dirname, "../files", "products.txt");
console.log(__dirname);

const productsFile = new ProductManager(archivo);
let productos = [];


console.clear();

app.set('json spaces', 5);
//Uso del try catch para trabajar con datos asyncronos
const entorno = async () => {
    try {
        productos = await productsFile.getProductsAsync();


        if (productos.length === 0) {
            console.log('Productos no encontrados')
            return
        }

        app.get("/", (req, res) => {
            res.send("Servidor escuchando en puerto " + server.address().port)
        });


        //enviando el producto QUERY
        app.get('/products', (req, res) => {
            let resultado = productos;

            if (req.query.limit) {
                resultado = resultado.slice(0, req.query.limit)
            }
            const prettyJSON = JSON.stringify(resultado, null, 2);    

            res.setHeader('Content-type', 'application/json')
            res.status(200).json(resultado)
        })


        // Enviado el producto por ID PARAMS
        app.get('/products/:id', (req, res) => {

            let id = req.params.id;

            id = parseInt(id)

            // verifico si no pasaron un valor numerico
            if (isNaN(id)) {
                return res.send('ERROR. Se debe ingresar un id numerico')

            }
            idEncontrado = productos.find((producto) => {
                return producto.id === id
            })

            if (!idEncontrado) {
                return res.send('Error, No existe el id')

            }

            res.setHeader('Content-type', 'application/json')
            res.status(200).json(idEncontrado)
        })

        const server = app.listen(PORT, () => {
            console.log("Servidor escuchando en puerto " + server.address().port)
        })
    } catch (error) {
        console.log('Se ha encontrado el siguiente error', error.message);
    }
};

entorno();

