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

import { MerdiumEvent } from "./utils/events";
import { MerdiumCommand } from "./utils/commands";
import { Logger } from "./utils/logger";

config();

class MerdiumClient extends Client {
    public logger: Logger;

    constructor(options: ClientOptions) {
        super(options);

        this.logger = new Logger();

        this.registerEvents();
        this.registerCommands();

        this.login(process.env.DISCORD_TOKEN);
    }

    registerEvents() {
        const baseEventsDir = resolveDir("./build/events/");

        readdirSync(baseEventsDir).map((file) => {
            const event: MerdiumEvent =
                require(`${baseEventsDir}/${file}`).default;

            this.on(event.id, (...args) => event.execute(...args));

            this.logger.log(`Registered event ${event.id}`);
        });
    }

    registerCommands() {
        return this.logger.warn("registerCommands() is not available yet!");

        const baseCommandsDir = resolveDir("./build/commands/");

        readdirSync(baseCommandsDir).map((file) => {
            const command: MerdiumCommand =
                require(`${baseCommandsDir}/${file}`).default;

            // TODO: Register slash commands when logging and unregister when logging off
            // TODO: Make interaction event "stretchable", so it's not limited only to few things
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
