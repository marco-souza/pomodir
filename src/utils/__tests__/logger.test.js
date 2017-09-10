import LoggerFactory from "../logger";

describe("LoggerFactory", () => {
    it("should call console.log on debug logging", () => {
        global.console = { log: jest.fn() };

        let Logger = new LoggerFactory("scope_1");
        let logger = Logger.create("scope_2");

        logger.debug("test");

        expect(global.console.log).toBeCalled();
    });

    it("should call console.info on info logging", () => {
        global.console = { info: jest.fn() };

        let Logger = new LoggerFactory("scope_1");
        let logger = Logger.create("scope_2");

        logger.info("test");

        expect(global.console.info).toBeCalled();
    });

    it("should call console.warn on warn logging", () => {
        global.console = { warn: jest.fn() };

        let Logger = new LoggerFactory("scope_1");
        let logger = Logger.create("scope_2");

        logger.warn("test");

        expect(global.console.warn).toBeCalled();
    });

    it("should call console.error on error logging", () => {
        global.console = { error: jest.fn() };

        let Logger = new LoggerFactory("scope_1");
        let logger = Logger.create("scope_2");

        logger.error("test");

        expect(global.console.error).toBeCalled();
    });
});