//     Merdium - small single-server Discord bot
//     Copyright (C) 2022  Fulerenn
//
//     This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.
//
//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.
//
//     You should have received a copy of the GNU General Public License
//     along with this program.  If not, see <https://www.gnu.org/licenses/>.

import {
    Client,
    ClientOptions,
    GatewayIntentBits,
    ActivityType,
} from "discord.js";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { resolve as resolveDir } from "path";

import { Logger } from "./utils/logger";
import { MerdiumEvent } from "./utils/events";
import { MerdiumChatCommand } from "./utils/commands";

config();

class MerdiumClient extends Client {
    public logger: Logger;

    public commands: MerdiumChatCommand[] = [];

    constructor(options: ClientOptions) {
        super(options);

        this.logger = new Logger();

        this.registerEvents();
        this.registerCommands();

        this.login(process.env.DISCORD_TOKEN);
    }

    registerEvents() {
        const baseEventsDir: string = resolveDir("./build/events/");

        readdirSync(baseEventsDir).map((file) => {
            const event: MerdiumEvent =
                require(`${baseEventsDir}/${file}`).default;

            this.on(event.id, (...args) => event.execute(...args, this));

            this.logger.log(`Registered event ${event.id}`);
        });
    }

    registerCommands() {
        const baseCommandsDir: string = resolveDir("./build/commands/");

        readdirSync(baseCommandsDir).map((file) => {
            const command: MerdiumChatCommand =
                require(`${baseCommandsDir}/${file}`).default;

            // TODO: Migrate to Slash Commands (or make it in parallel with chat commands)
            // TODO: Register slash commands when logging and unregister when logging off
            // TODO: Make interaction event "stretchable", so it's not limited only to few things

            if (!command) {
                return this.logger.error(
                    `There is no real command defined in ${file}!`
                );
            }

            if (!command.name || !command.description || !command.run) {
                return this.logger.error(`Command ${file} has missing fields`);
            }

            this.commands.push(command);
        });

        this.on("messageCreate", (message) => {
            if (message.author.bot || !message.guild) return;
            if (!message.content.startsWith("!")) return;

            const args: string[] = message.content.slice(1).trim().split(/ +/g);
            const input: string = args.shift().toLowerCase();

            const command: MerdiumChatCommand = this.commands.find(
                (element) => element.name == input
            );

            if (!command) {
                message.channel.send(`Undefined command ${input}`);
                return;
            }

            // TODO: Temporary, figure it out in a better way (without variable)
            let isPermitted: boolean = true;

            if (command.permissions && command.permissions.length) {
                command.permissions.find((permission) => {
                    if (!message.member.permissions.has(permission)) {
                        isPermitted = false;
                        return;
                    }
                });
            }

            if (!isPermitted) {
                message.channel.send("Insufficient permissions");
                return;
            }

            // TODO: Error Handler (or service? :thinking:)
            try {
                command.run(message, this);
            } catch (error) {
                this.logger.error(error);
                message.channel.send(
                    "Something unexpected happened on our side! Try again later"
                );
            }
        });
    }
}

new MerdiumClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    presence: {
        activities: [
            {
                name: "Discord API",
                type: ActivityType.Listening,
            },
        ],
    },
});

export { MerdiumClient };
