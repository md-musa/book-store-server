class GeneralError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
  getStatusCode() {
    return 400;
  }
}



export class UnprocessableEntityError extends Error {
  error: any;
  constructor(error: any) {
    super(error.details[0].message);
    this.name = "ValidationError";
    this.error = error;
  }
  getStatusCode() {
    return 422;
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeneralError";
  }

  getStatusCode() {
    return 401;
  }
}

export class BadRequestError extends GeneralError {
  constructor(message: string) {
    super(message);
    this.name = "GeneralError";
  }
  getStatusCode() {
    return 400;
  }
}


export class NotfoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeneralError";
  }
  getStatusCode() {
    return 404;
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeneralError";
  }
  getStatusCode() {
    return 409;
  }
}

class InternalServerError extends GeneralError {
  getStatusCode() {
    return 409;
  }
}


