import commander = require("commander");

export interface InterfaceCLI extends commander.Command {
    dir?: string;
    gif?: string;
    manga?: string;
    effect?: string;
    sound?: string;
    custom?: string;
    animation?: string;
}
