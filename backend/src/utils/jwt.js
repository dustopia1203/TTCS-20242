require("dotenv").config();

function sendToken(user, statusCode, res) {
  const accessToken = user.getSignedToken();
  const refreshToken = user.getRefreshToken();
  const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIR || "300",
    10
  );
  const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "1200",
    10
  );
  const accessTokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 1000),
    maxAge: accessTokenExpire * 1000,
    httpOnly: true,
  };
  const refreshTokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 1000),
    maxAge: refreshTokenExpire * 1000,
    httpOnly: true,
  };
  res.cookie("accessToken", accessToken, accessTokenOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenOptions);
  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
}

module.exports = sendToken;
