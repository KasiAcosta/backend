const express=require("express");
const routerProducto=require("./src/routes/routes.js")
const{Server:http}=require("http");
const {Server:ioServer}=require ("socket.io");
const {saveMsjs, getMsjs} = require ("./src/controllers/mensajes.js");
const cookieParser = require("cookie-parser");
const session = require ("express-session");
const MongoStore = require ("connect-mongo");

const app = express();
const httpserver = http(app)
const io = new ioServer(httpserver)

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use('/api/', routerProducto);

app.use(cookieParser());

app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://kasiacosta:2!3iyCbUaK3Y9r9@cluster0.sj9ho85.mongodb.net/ecommerce?retryWrites=true&w=majority'}),
    secret: 'shh',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 10000
    }
})
);

app.get("/", (req, res) =>{
    try{
        if(req.session.user){
            res.sendFile(__dirname + ('/public/index.html'))
        }else{
            res.sendFile(__dirname + ('/views/login.html'))
        }
    }catch(error){
        console.log(error)
    }
})

//nombre usuario session

app.post('/setUserName', (req, res) => {
    req.session.user = req.body.user;
    process.env.USER = req.body.user;
    const usuario = process.env.USER;
    res.redirect('/');
})

app.get("/getUserName", (req, res) =>{
    try{
        if(req.session.user){
            const user = process.env.USER;
            res.send({
                user,
            })
        }else{
            res.send({
                username: "No existe el usuario"
            })
        }
    }catch(error){
        console.log(error)
    }
})

app.get('/getUserNameEnv', (req, res) => {
    const user = process.env.USER;
    res.send({
        user
    })
})

io.on('connection', async (socket) =>{
    console.log('Usuario conectado');
    socket.on('enviarMensaje', (msj) =>{
        saveMsjs(msj);
    })

    socket.emit ('mensajes', await getMsjs());
})

//Deslogueo

app.get('/loguot', (req, res) =>{
    try{
        req.session.destroy((err) =>{
            if (err){
                console.log(err);
            }else{
                res.redirect('/logout');
            }
        })
    }catch(err){
        console.log(err);
    }
})

app.get('/logoutMsj', (req, res) => {
    try{
        res.sendFile(__dirname + '/views/loguot.html');
    }catch(err){
        console.log(err);
    }
})

const PORT = process.env.PORT || 8080;

const server = httpserver.listen(PORT, () => {
    console.log(`Server is running on port: ${server.address().port}`);
});
server.on('error', error => console.log(`error running server: ${error}`));