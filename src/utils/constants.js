export const errorName = {
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
}

export const errorType = {
  AUTHENTICATION_ERROR: {
    message: "Please authenticate to perform this action",
    statusCode: 401,
  },
  SERVER_ERROR: {
    message: "Server error.",
    statusCode: 500,
  },
}
