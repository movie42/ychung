import multer from "multer";
import Notice from "./model/Notice.model";
import Worship from "./model/Worship.model";
import Blog from "./model/Blog.model";
import multerS3 from "multer-s3-transform";
import aws from "aws-sdk";
import sharp from "sharp";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
  }
});

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "yangchung/images",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  shouldTransform: true,
  transforms: [
    {
      id: "resized",
      key: function (req, file, cb) {
        let extension = "profile-image";
        cb(null, extension + Date.now().toString());
      },
      transform: async function (req, file, cb) {
        cb(null, await sharp().resize(5000).png({ quality: 100 }));
      }
    }
  ],
  acl: "public-read"
});

const multerProfile = multer({
  dest: "uploads/profile",
  storage:
    process.env.NODE_ENV === "production"
      ? s3ImageUploader
      : undefined
});

const multerEditorImage = multer({
  dest: "uploads/editorImage",
  storage:
    process.env.NODE_ENV === "production"
      ? s3ImageUploader
      : undefined
});

export const editorImage = multerEditorImage.any();
export const photoUpload = multerProfile.single("profilePhotoUrl");

export const locals = (req, res, next) => {
  res.locals.webTitle = "양청";
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.user = req.session.user;
  next();
};

export const preUrl = (req, res, next) => {
  req.session.preUrl = req.originalUrl;
  next();
};

export const onlyMaster = (req, res, next) => {
  if (req.session.loggedIn) {
    const user = req.session.user;
    if (user.authority === "master") {
      next();
    } else {
      return res.redirect("/");
    }
  } else {
    return res.redirect("/login");
  }
};

export const onlyAdministrator = (req, res, next) => {
  if (req.session.loggedIn) {
    const user = req.session.user;
    if (user.authority === "master") {
      next();
    } else if (user.authority === "administrator") {
      next();
    } else {
      return res.redirect("/");
    }
  } else {
    return res.redirect("/login");
  }
};

export const onlyPublic = (req, res, next) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

// export const secure = (req, res, next) => {
//   if (!req.secure) {
//     res.redirect(`https://y-chung.com${req.url}`);
//   } else {
//     next();
//   }
// };

export const view = async (req, res, next) => {
  const {
    params: { id },
    session: { loggedIn }
  } = req;

  if (!req.session.viewObj) {
    req.session.viewObj = new Object();
  }
  if (!req.session.viewObj[id]) {
    req.session.viewObj[id] = [];
  }

  let checkUserName;

  if (loggedIn) {
    checkUserName = req.session.user._id;
  } else {
    checkUserName = "Unknown User";
  }

  if (req.session.viewObj[id].indexOf(checkUserName) === -1) {
    const dataName = req.baseUrl.slice(1);

    const DATA = {
      blog: Blog,
      notice: Notice,
      worship: Worship
    };

    const data = await DATA[dataName].findById(id);

    if (!data) {
      return res.status(404).render("root/404", {
        pageTitle: "게시물을 찾을 수 없습니다.",
        errorMessage: "게시물을 찾을 수 없습니다. "
      });
    }

    req.session.viewObj[id].push(checkUserName);

    data.views++;

    await data.save();
  }

  setTimeout(() => {
    req.session.viewObj[id].splice(
      req.session.viewObj[id].indexOf(checkUserName),
      1
    );
    for (let item in req.session.viewObj) {
      if (item.length < 1) {
        delete req.session.viewObj.item;
      }
    }
    req.session.save();
  }, 300000);

  next();
};
