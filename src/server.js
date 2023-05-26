const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/user.routes");

app.use(cors("*"));
app.use(express.json());
app.use("/", router);

app.get("/get", (req, res) => res.json("Hech narsa topilmadi!"));

app.use("/*", (_, res) => res.json("Not Found 404").status(404));
app.listen(9000, () => console.log(9000));
