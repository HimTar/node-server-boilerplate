"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultErrorHandler = void 0;
const http_errors_1 = require("http-errors");
const external_1 = require("../external");
const defaultErrorHandler = (err, req, res, next) => {
    if ((0, http_errors_1.isHttpError)(err)) {
        // Handle 500 Error
        if (err.status >= 500) {
            external_1.logger.error(`Unexpected Error : ${err}`);
            res.status(err.status).send({
                message: "Unexpected error! We are looking into it.",
                error: "UnexpectedError",
                statusCode: err.status,
            });
        }
        else if (err.status >= 400) {
            // Handle Rest Error
            external_1.logger.error(`Bad Request : ${err}`);
            res.status(err.status).send({
                message: err.message,
                error: "BadRequest",
                statusCode: err.status,
            });
        }
        else {
            // Handle Rest Error
            external_1.logger.error(`HTTP Error : ${err}`);
            res.status(err.status).send({
                message: "Unexpected error! We are looking into it.",
                error: "UnexpectedError",
                statusCode: err.status,
            });
        }
    }
    else if (err) {
        external_1.logger.error(`UnexpectedError : ${err}`);
        res.status(500).send("Unexpected error! We are looking into it.");
    }
};
exports.defaultErrorHandler = defaultErrorHandler;
