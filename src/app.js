import express from "express";
import morgan from "morgan";
import rootRouter from "./router/root.router";
import worshipRouter from "./router/worship.router";
import noticeRouter from "./router/notice.router";
import administrationRouter from "./router/administration.router";
import api from "./router/api.router";
import userRouter from "./router/user.router";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import {
  locals,
  preUrl,
  corsOptions,
  csrfProtection
} from "./middleWare";
import documentsRouter from "./router/documents.router";
import blogRouter from "./router/blog.router";
import permissionsPolicy from "permissions-policy";
import cors from "cors";

const app = express();

app.use((req, res, next) => {
  if (
    req.get("X-Forwarded-Proto") == "https" ||
    req.hostname == "localhost"
  ) {
    next();
  } else if (
    req.get("X-Forwarded-Proto") != "https" &&
    req.get("X-Forwarded-Port") != "443"
  ) {
    res.redirect(`https://${req.hostname}${req.url}`);
  }
});

// app.use(cors(corsOptions));
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'unsafe-eval'", process.env.URL], //development mode should allow 'unsafe-eval' because eval function
      "img-src": ["'self'", "data:", "https:"],
      "frame-src": "https://www.youtube.com/",
      "font-src": ["data:", "https:"]
    }
  })
);
app.use(
  helmet.hsts({
    maxAge: 31536000,
    preload: true
  })
);
app.use(helmet.xssFilter());
app.use(
  permissionsPolicy({
    features: {
      fullscreen: ["self", '"https://www.youtube.com"'],
      displayCapture: ["self"],
      autoplay: [],
      camera: []
    }
  })
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
    expires: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL
    })
  })
);
app.use(csrfProtection);

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
app.use("/administration", administrationRouter);

app.use("/api", api);

export default app;
