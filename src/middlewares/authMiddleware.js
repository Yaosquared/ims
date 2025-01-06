import jwt from "jsonwebtoken";

const jwtCookie = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).redirect("/"); // Redirect to login page fo unauthorized sign in (no token)
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    res.clearCookie("token");
    return res.status(401).redirect("/"); // Redirect to login page fo unauthorized sign in (no token)
  }
};

export default jwtCookie;
