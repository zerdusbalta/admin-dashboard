require("dotenv").config();

const app = require("./app");
const initDb = require("./database/initDb");

const PORT = process.env.PORT || 4000;

initDb();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});