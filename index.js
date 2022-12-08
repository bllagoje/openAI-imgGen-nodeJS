const express = require("express");
const dotenv = require("dotenv").config();
// Port:
const port = process.env.PORT || 5000;
// App:
const app = express();
// Enable Body Parser:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// App Use:
app.use("/openai", require("./routes/openaiRoutes"));
// App Listen:
app.listen(port, () => console.log(`Server is listening on the port: ${port}`));
