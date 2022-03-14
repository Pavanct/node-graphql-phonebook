import { errorType } from "./constants"

const getErrorCode = (errorName) => {
  return errorType[errorName]
}

export default getErrorCode