import express from "express";
import morgan from "morgan";
import rootRouter from "./router/root.router";
import weeklyRouter from "./router/weekly.router";
import qtRouter from "./router/qt.router";
import noticeRouter from "./router/notice.router";
import api from "./router/api.router";
import userRouter from "./router/user.router";
import voteRouter from "./router/vote.router";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import cors from "cors";
import { locals, preUrl } from "./middleWare";

const app = express();

// var corsOptions = {
//   origin: process.env.ORIGIN,
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// if (process.env.NODE_ENV === "production") {
//   app.all(() => console.log("http"));
// }
// app.get("*", (req, res, next) => {
//   console.log(req.protocol, req.headers);
//   next();
// });

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'unsafe-eval'", process.env.URL],
      "img-src":
        process.env.NODE_ENV === "production"
          ? "https://yangchung.s3.ap-northeast-2.amazonaws.com"
          : "'self'",
      "frame-src": "https://www.youtube.com/"
    }
  })
);
app.use(
  helmet.hsts({
    maxAge: 31536000,
    preload: true
  })
);
// app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL
    })
  })
);

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use("/static", express.static("client"));
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    next();
  });
});

app.use(locals);
app.use("/", rootRouter);
app.use("/weekly", weeklyRouter);
app.use("/qt", qtRouter);
app.use("/notice", noticeRouter);
app.use("/user", userRouter);
app.use("/vote", voteRouter);
app.use("/api", api);

export default app;
