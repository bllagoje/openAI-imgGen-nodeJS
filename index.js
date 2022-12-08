const express = require("express");
const dotenv = require("dotenv").config();
// Path:
const path = require("path");
// Port:
const port = process.env.PORT || 5000;
// App:
const app = express();
// Enable Body Parser:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Set Static Folder:
app.use(express.static(path.join( __dirname, "public" )));
// App Use:
app.use("/openai", require("./routes/openaiRoutes"));
// App Listen:
app.listen(port, () => console.log(`Server is listening on the port: ${port}`));
