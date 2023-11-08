
const fs = require('fs')

class ProductManager{

    constructor(path){
        this.path=path
        this.productos=[]
    }

    async getProductsAsync(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path,'utf-8'));
        } else {
            // console.log(`No existe el archivo ${this.path}`)
            return [];
        }
    }

    async getProductByIdAsync(id){
        // obtengo todos los productos
        let productos=await this.getProductsAsync()
         // chequeo si exite el producto
        let indice=productos.findIndex(producto=>producto.id===id)
        if(indice===-1){
            return `No se encontró el producto con id ${id}`
        }
        return productos[indice] 
    }

    async addProductAsync(title,description,price,thumbnail,code,stock){
        // obtengo todos los productos
        let productos= await this.getProductsAsync()
        // chequeo si exite el producto con codigo solicitado
        let existe=productos.findIndex(producto=>producto.code===code)
        if(existe!=-1){
            console.log(`Ya existe un producto con codigo ${code}. No se pudo agregar producto solicitado`)
            return 
        }

        // genero nuevo id para el nuevo producto
        let id=1
        if(productos.length>0){
            id=productos[productos.length-1].id + 1
        } 
        
        // creo nuevo producto
        let nuevoProducto={
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        // sobreescribo el archivo con el nuevo producto
        productos.push(nuevoProducto)
        await fs.promises.writeFile(this.path,JSON.stringify(productos, null, '\t'))
        console.log(`Se agrego producto con exito. Id: ${id}.`)
    }

    async deleteProductAsync(id){
        //borra un producto por id

        // obtengo todos los productos
        let productos=await this.getProductsAsync()
         // chequeo si exite el producto con codigo solicitado
        let existe=productos.findIndex(producto=>producto.id === id)
        if(existe===-1){
            console.log(`No existe un producto con id ${id}. No se pudo borrar producto solicitado`)
            return 
        }
            // borro el producto
        productos.splice(existe,1)
        await fs.promises.writeFile(this.path,JSON.stringify(productos, null, '\t'))
        console.log(`Se borro producto con exito. code: ${id}.`)
    }

    async modifyProductAsync(id,argumentos){
        // Modifica un producto por id (no se puede modificar id)
        // se ingresa:
        // id : id del producto a modificar 
        // argumentos: objetos con clave = atributo a modificar ; valor: nuevo valor del atributo a modificar

        let camposModificables = ["title", "description", "price", "thumbnail", "code", "stock"]

        // obtengo todos los productos
        let productos=await this.getProductsAsync()
        // chequeo si exite el producto
        let indice=productos.findIndex(producto=>producto.id===id)
        if(indice===-1){
            console.log(`No se encontró el producto con id ${id}. No se pudo modificar producto solicitado`)
        return 
        }
        let productoMod = productos[indice]
        for (let clave in argumentos) {
            if (argumentos.hasOwnProperty(clave)) {
                if (clave !== id && argumentos[clave] !== undefined && argumentos[clave] !== null && camposModificables.includes(clave)) {
                    productoMod[clave] = argumentos[clave];
                }
            }
        }
        // sobreescribo el archivo con el producto modificado
        productos[indice]=productoMod
        await fs.promises.writeFile(this.path,JSON.stringify(productos, null, '\t'))
        console.log(`Se modifico producto con exito. Id: ${id}.`)
        return 
    }

    async obtenerProductos() {
        const productos = await pm.getProductsAsync();
        console.log(productos);
    }
    async obtenerUnProducto(id) {
        const productos = await pm.getProductByIdAsync(id);
        console.log(productos);
    }
    

} 

module.exports = ProductManager;