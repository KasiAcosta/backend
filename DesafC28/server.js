const express = require("express");
const routerProducto = require("./src/routes/routes.js")
const { Server: http } = require("http");
const { Server: ioServer } = require("socket.io");
const User = require("./src/schema/schemaUser.js")
const { saveMsjs, getMsjs } = require("./src/controllers/mensajes.js");
const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const LocalStrategy = require('passport-local').Strategy;
const passport = require("passport");
const { comparePassword, hashPassword } = require("./utils")
const { Types } = require("mongoose");
const Swal = require('sweetalert2');
const { createSocket } = require("dgram");

const app = express();
const httpserver = http(app)
const io = new ioServer(httpserver)


app.use("/public", express.static('./public/'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', routerProducto);


app.use(session({
    secret: 'STRING_TO_SING_SESSION_ID',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongoUrl: process.env.URL_BD,
        retries: 0,
        ttl: 10 * 60,
    }),
}));

app.use(passport.initialize());
app.use(passport.session());

//Log user

passport.use("login", new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    const passHash = user.password;
    if (!user || !comparePassword(password, passHash)) {
        return done(null, null, { message: "Invalid username or password" });
    }
    return done(null, user);
}));

//Registro de usuario

passport.use("signup", new LocalStrategy({
    passReqToCallback: true
},
    async (req, username, password, done) => {
        const user = await User.findOne({ username });
        if (user) {
            return done(new Error("User don't exists"), null);
        }
        const address = req.body.address;
        const hashedPassword = hashPassword(password);
        const newUser = new User({ username, password: hashedPassword, address });
        await newUser.save();
        return done(null, newUser);
    }));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    id = Types.ObjectId(id);
    const user = await User.findById(id);
    done(null, user);
});

//RECUPERO EL NOMBRE YA EN SESION INICIADA

app.get('/loginEnv', (req, res) => {
    process.env.USER = req.user.address;
    const user = process.env.USER;

    res.send({
        user
    })
})
app.get('/getUserNameEnv', (req, res) => {
    const user = process.env.USER;
    res.send({
        user
    })
})



app.get("/", (req, res) => {

    try {
        if (req.session.user) {
            res.sendFile(__dirname + ('/public/index.html'))
        }
        else {
            res.sendFile(__dirname + ('/views/login.html'))
        }
    }
    catch (error) {
        console.log(error)
    }

})

io.on('connection', async (socket) => {
    console.log('Usuario conectado');
    socket.on('enviarMensaje', (msj) => {
        saveMsjs(msj);
    })

    socket.emit('mensajes', await getMsjs());
})

// DESLOGUEO DE USUARIO

app.get('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/logout');
            }
        })
    } catch (err) {
        console.log(err);
    }
})
app.get('/logoutMsj', (req, res) => {
    try {
        res.sendFile(__dirname + '/views/logout.html');
    }
    catch (err) {
        console.log(err);
    }
})

app.get("/login", (req, res) => {
    const user = req.session.user;
    res.sendFile(__dirname + "/views/login.html");
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/views/register.html");
});

app.get("/loginFail", (req, res) => {
    res.sendFile(__dirname + "/views/signupFail.html");
});

app.get("/signupFail", (req, res) => {
    res.sendFile(__dirname + "/views/signupFail.html");
});

app.get("/info", (req, res) =>{
    res.sendFile(__dirname + "/views/info.html");
});

app.post("/signup", passport.authenticate("signup", {
    failureRedirect: "signupFail",
}), (req, res) => {
    req.session.user = req.user;
    res.redirect("/login");
});

app.post("/login", passport.authenticate("login", {
    failureRedirect: "/loginFail",
}), (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
});

//Puerto con yards, por defecto toma 8080

// correr el server de la siguiente manera "node server.js  -m dev -p nroPuerto"

const yargs = require("yargs");
const args = yargs(process.argv.slice(2))

.alias({
    m: "modo",
    p: "puerto",
    d: "debug"
})

.default({
    modo: "prod",
    puerto: 8080,
    debug: false
})
.argv

const server = httpserver.listen(args.p, () => {
    console.log(`Servidor levantado en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`error running server: ${error}`));