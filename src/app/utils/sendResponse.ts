import { Response } from 'express';

export interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: any;
}

/**
 * @param  {res, statusCode, message, data}
 */
function sendResponse(res: Response, statusCode: number, message: string, data?: any): void {
  const response: ApiResponse = {
    success: statusCode >= 200 && statusCode < 400,
    statusCode,
    message,
  };

  if (data) {
    response.data = data;
  }

  res.status(statusCode).json(response);
}

export default sendResponse;
