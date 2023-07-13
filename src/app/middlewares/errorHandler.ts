import { ErrorRequestHandler } from 'express';

interface IGenericErrorMessage {
  path: string;
  message: string;
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log("<=============================================>")
  console.log('❌NAME   ==>', error?.name);
  console.log("----------------------------------------------")
  console.log('❌MESSAGE==>', error.message);
  console.log("-----------------------------------------------")
  console.log('STACK    ==>', error.stack);
  console.log("-----------------------------------------------")



  let statusCode: number = 500;
  let message: string = "Something went wrong!";
  let errorMessages: IGenericErrorMessage[] = [];


  if (error?.name === "ValidationError") {
    statusCode = error.getStatusCode();
    message = error.message;
    console.log(error);

    const simplifiedError = {
      path: error.error?.details[0]?.path[0],
      message: error.error?.details[0]?.message,
    };
    errorMessages.push(simplifiedError);
    // errorMessages = simplifiedError.error.details;
  }
  else if (error?.name === "CastError") {
    statusCode = 404;
    message = error.message;

    const simplifiedError = error;
    errorMessages = simplifiedError;
  }
  else if (error?.name === "GeneralError") {
    statusCode = error.getStatusCode();
    message = error.message;

    const simplifiedError = error;
    errorMessages = simplifiedError;
  }


  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: error.stack,
  });
};

export default errorHandler;
