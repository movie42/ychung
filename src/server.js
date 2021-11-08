import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./model/User.model";
import "./model/Weekly.model";
import "./model/QT.model";
import "./model/Notice.model";
import "./model/Comments.model";
import "./model/Attendence.model";
import app from "./app";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
