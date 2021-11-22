import jwt from "jsonwebtoken";

const KEY = "jhjkhkjhkjashjhkjhasdkjhdjsajdhj";

export default function (req, res) {
  if (!req.body) {
    res.statusCode = 404;
    res.send("Error");
    return;
  }
  const { email, password, storage } = req.body;

  if (storage.emailStorage === null && storage.passwordStorage === null) {
    return res.status(400).json({
      messageError: "user not exist stranger👻",
      ok: false,
    });
  }
  if (storage.emailStorage !== null && storage.passwordStorage !== null) {
    const verify =
      email === storage.emailStorage && storage.passwordStorage === password;
    if (verify) {
      res.json({
        ok: true,
        token: jwt.sign(
          {
            email,
            password,
          },
          KEY
        ),
      });
    } else {
      res.status(400).json({
        messageError: "Password or email its wrong. 👀",
        ok: false,
      });
    }
  }
}
