require("dotenv").config();

const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "300",
  10
);
const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1200",
  10
);
// cookie options
const accessTokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 1000,
  httpOnly: true,
};
const refreshTokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 60 * 1000),
  maxAge: refreshTokenExpire * 60 * 1000,
  httpOnly: true,
};

function sendToken(user, statusCode, res) {
  const accessToken = user.getSignedToken();
  const refreshToken = user.getRefreshToken();
  // production only
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
    refreshTokenOptions.secure = true;
  }
  // send token via cookie
  res.cookie("accessToken", accessToken, accessTokenOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenOptions);
  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
}

module.exports = { sendToken, accessTokenOptions, refreshTokenOptions };
