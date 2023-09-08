const App = require("./index");
const router = require("./routes/index");

// prettier-ignore
const app = new App([
    new router.AuthRoutes(),
    new router.UsersRoute(),
])

app.run();
