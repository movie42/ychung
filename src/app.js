import express from "express";
import morgan from "morgan";
import rootRouter from "./router/root.router";
import worshipRouter from "./router/worship.router";
import noticeRouter from "./router/notice.router";
import api from "./router/api.router";
import userRouter from "./router/user.router";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import { locals, preUrl } from "./middleWare";
import documentsRouter from "./router/documents.router";
import blogRouter from "./router/blog.router";

const app = express();

app.use((req, res, next) => {
  if (req.get("X-Forwarded-Proto") == "https" || req.hostname == "localhost") {
    //Serve Angular App by passing control to the next middleware
    next();
  } else if (
    req.get("X-Forwarded-Proto") != "https" &&
    req.get("X-Forwarded-Port") != "443"
  ) {
    console.log(req.get("X-Forwarded-Proto"));
    //Redirect if not HTTP with original request URL
    res.redirect(`https://${req.hostname}${req.url}`);
  }
});

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'unsafe-eval'", process.env.URL],
      "img-src": ["data:", "*"],
      "frame-src": "https://www.youtube.com/",
    },
  }),
);
app.use(
  helmet.hsts({
    maxAge: 31536000,
    preload: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    secure: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  }),
);

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use("/static", express.static("client"));
app.use("/favicon", express.static("favicon"));
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    next();
  });
});

app.use(locals);
app.use("/", rootRouter);
app.use("/notice", noticeRouter);
app.use("/worship", worshipRouter);
app.use("/documents", documentsRouter);
app.use("/blog", blogRouter);

app.use("/user", userRouter);

app.use("/api", api);

export default app;
