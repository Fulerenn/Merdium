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

import { Message } from "discord.js";
import { MerdiumEvent } from "../utils/events";

const isMod = (message: Message) => {
    if (message.member.permissions.has("BanMembers")) {
        return true;
    }

    return false;
};

const event: MerdiumEvent = {
    id: "messageCreate",
    execute: (message: Message) => {
        if (message.author.bot || !message.guild) return;
        if (!message.content.startsWith("!")) return;

        const args = message.content.slice(1).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (command == "ban") {
            const target = message.mentions.users.first();
            let reason = [...args].slice(1).join(" ");

            if (isMod(message)) {
                if (!target) {
                    return message.channel.send(`Could not find that user!`);
                }

                if (target.id == message.author.id) {
                    return message.channel.send(
                        `You can not ban yourself! \`\`${target.id} == ${message.author.id}\`\``
                    );
                }

                const targetMember = message.guild.members.cache.get(target.id);

                if (!targetMember.bannable) {
                    return message.channel.send(
                        `Could not ban this member! \`\`member.bannable == false\`\``
                    );
                }

                targetMember.ban({ reason: reason }).then((user) => {
                    message.channel.send(
                        `Banned ${user.displayName} for ${reason}! (${user.id})`
                    );
                });
            } else {
                message.channel.send("Insufficient permissions");
            }
        } else if (command == "kick") {
            const target = message.mentions.users.first();
            let reason = [...args].slice(1).join(" ");

            if (isMod(message)) {
                if (!target) {
                    return message.channel.send(`Could not find that user!`);
                }

                if (target.id == message.author.id) {
                    return message.channel.send(
                        `You can not kick yourself! \`\`${target.id} == ${message.author.id}\`\``
                    );
                }

                const targetMember = message.guild.members.cache.get(target.id);

                if (!targetMember.kickable) {
                    return message.channel.send(
                        `Could not kick this member! \`\`member.kickable == false\`\``
                    );
                }

                targetMember.kick(reason).then((user) => {
                    message.channel.send(
                        `Kicked ${user.displayName} for ${reason}! (${user.id})`
                    );
                });
            } else {
                message.channel.send("Insufficient permissions");
            }
        }
    },
};

export default event;
