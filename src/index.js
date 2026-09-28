const express = require('express')
const db = require('./models/index')
const app = express()
const PORT = 3000

app.get("/", (req, res) => {res.send("Bienvenido")});

const routerProductos = require('./routes/productosRoutes.js');
const routerUsuarios = require('./routes/usuariosRoutes.js');
const routerCategorias = require('./routes/categoriasRoutes')

app.use(express.json()) /*middleware. El json que el usuario manda por el body, express lo convierte en un objeto de javascript*/
app.use('/productos', routerProductos)
app.use('/usuarios', routerUsuarios)
app.use('/categorias', routerCategorias)

app.listen(PORT, async () => {
    await db.sequelize.sync()
    console.log(`Servidor: http://localhost:${PORT}`)
});