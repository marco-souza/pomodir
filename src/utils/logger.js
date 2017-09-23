/**
 * @namespace Utils
 */

import moment from "moment"
import lodash from "lodash"

/**
 * This class defines a logger factory which are attached to a first level scope like a
 * module.
 *
 * @class
 * @memberof Utils
 * @example
 * let Logger = new LoggerFactory("myModule")
 *
 * function myFunction() {
 *      let logger = Logger.create("myFunction")
 *      logger.info("hello, i'm inside myFunction of module myModule")
 * }
 */
class LoggerFactory {
    // Instance properties
    moduleName: string

    /**
     * This function creates a new logger factory.
     *
     * @param {string} moduleName - The first level scope of logging.
     * @returns {LoggerFactory} A new logger factory instance.
     */
    constructor(moduleName: string) {
        this.moduleName = moduleName
    }

    /**
     * This function creates a new logger instance within the factory
     * first level scope.
     *
     * @param {string} scopeName - The second level scope of logging.
     * @returns {Logger} A new logger instance.
     */
    create(scopeName: string): Logger {
        return new Logger({
            moduleName: this.moduleName,
            scopeName
        })
    }
}

/**
 * This class defines a logger which are attached to a second level scope like a
 * function.
 *
 * @class
 * @memberof Utils
 * @private
 */
class Logger {
    // Static properties
    static consoleLevelMap = {
        "debug": "log",
        "info": "info",
        "warn": "warn",
        "error": "error"
    }

    // Instance properties
    moduleName: string
    scopeName: string
    level: string

    /**
     * This function creates a new logger instance.
     *
     * @param {object} params - Params wrapper
     * @param {string} moduleName - The wrapping module name that logger gonna be part of.
     * @param {string} scopeName - The specific scope for this logger.
     * @returns {Logger} A new logger instance.
     */
    constructor({
        moduleName = "global",
        scopeName = ""
    }: any = {}) {
        this.moduleName = moduleName
        this.scopeName = scopeName
        this.level = (process.env.ENV === "development" ? "debug" : "info")
    }

    /**
     * This function get the color assotiated with a specific log level.
     *
     * @private
     *
     * @param {string} level - The logger level which color we want to retrieve.
     * @returns {string} The color of the level.
     */
    _getLevelColor(level: string): string {
        switch (level) {
            case "debug": return "grey"
            case "info": return "blue"
            case "warning": return "orange"
            case "error": return "red"
        }

        return ""
    }

    /**
     * This function performs the main logging through console and is
     * used by all other logging functions.
     *
     * @private
     *
     * @param {string} level - The log level which can be debug, info, warning or error.
     * @param {string} message - The message to be logged.
     * @param {array} rest - An array with metadata entities to be logged alongside the log message.
     * @returns {void}
     */
    _log(level: string, message: string, rest: Array<any> = []) {
        let timestamp = moment().toISOString()
        let consoleLevel = Logger.consoleLevelMap[level]

        let dataStr = rest.length > 0 ?
            ": " + JSON.stringify(lodash.merge({}, ...rest)) :
            ""

        console[consoleLevel](
            `${timestamp} - %c${level}: %c[${this.moduleName}] ${this.scopeName} : ${message} %c${dataStr}`,
            `color: ${this._getLevelColor(level)}`,
            "color: black",
            "color: grey"
        )
    }

    /**
     * This function performs a debug log (with importance level of 0).
     *
     * @param {string} message - The message to be logged.
     * @param {array} rest - An array with metadata entities to be logged alongside the log message.
     * @returns {void}
     */
    debug(message: string, ...rest: Array<any>) { this._log("debug", message, rest) }

    /**
     * This function performs a info log (with importance level of 1).
     *
     * @param {string} message - The message to be logged.
     * @param {array} rest - An array with metadata entities to be logged alongside the log message.
     * @returns {void}
     */
    info(message: string, ...rest: Array<any>) { this._log("info", message, rest) }

    /**
     * This function performs a warning log (with importance level of 2).
     *
     * @param {string} message - The message to be logged.
     * @param {array} rest - An array with metadata entities to be logged alongside the log message.
     * @returns {void}
     */
    warn(message: string, ...rest: Array<any>) { this._log("warn", message, rest) }

    /**
     * This function performs a error log (with importance level of 3).
     *
     * @param {string} message - The message to be logged.
     * @param {array} rest - An array with metadata entities to be logged alongside the log message.
     * @returns {void}
     */
    error(message: string, ...rest: Array<any>) { this._log("error", message, rest) }
}

// Exports
export default LoggerFactory