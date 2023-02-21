const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");


const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 8001;

// -----------------
const db = require("./DB/dbConnect");
const userModel = require("./Model/userModel");
const msgModel = require("./Model/msgModel");
const Controllers = require("./Controller/userController");
app.use(express.json());

const users = [{}];

app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome Chat");
});

// Signup
app.post("/signup", Controllers.signup);

//  Login
app.post("/login", Controllers.login);

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} Joined `);
    socket.broadcast.emit("User Joined", {
      user: "Admin",
      message: ` ${users[socket.id]} has joined`,
    });
    socket.emit("Welcome", {
      user: "Hey",
      message: `Start Messeging,${users[socket.id]} `,
    });
  });

  socket.on("message", ({ message, id }) => {
    io.emit("sendSomeMessage", { user: users[id], message, id });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("leave", {
      user: "Main User",
      message: `${users[socket.id]}  has left`,
    });
    console.log(`user left`);
  });
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
