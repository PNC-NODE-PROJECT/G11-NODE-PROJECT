const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({origin: "*"}));
app.use(express.json());

app.listen(3000, () => {
  console.log("App run on http://localhost:3000");
});

// DDFINE STATIC
app.use(express.static("front_end"));
