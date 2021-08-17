import { Request, Response } from "express";
import {ArgumentsHost, ExceptionFilter, HttpArgumentsHost} from "@nestjs/common/interfaces";
import {Catch} from "@nestjs/common";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    public catch (exception: Error, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const request: Request = ctx.getRequest();
        const response: Response = ctx.getResponse();

        response
            .status(500)
            .json({
                timestamp: new Date().toISOString(),
                path: request.url,
                message: exception?.message
            });
    }
}