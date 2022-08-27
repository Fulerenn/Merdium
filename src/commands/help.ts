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

import { Message, EmbedBuilder } from "discord.js";
import { MerdiumClient } from "..";
import { MerdiumChatCommand } from "../utils/commands";

const command: MerdiumChatCommand = {
    name: "help",
    description: "Display's all available commands",
    run: (message: Message, client: MerdiumClient) => {
        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle("Merdium Commands")
            .setColor("#05668D");

        client.commands.map((command: MerdiumChatCommand, index) => {
            embed.addFields({
                name: command.name,
                value: command.description,
                inline: false,
            });
        });

        return message.channel.send({ embeds: [embed] });
    },
};

export default command;
