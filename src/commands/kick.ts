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

import { GuildMember, Message, User } from "discord.js";
import { MerdiumChatCommand } from "../utils/commands";

const command: MerdiumChatCommand = {
    name: "kick",
    description: "Give's a kick to a target user",
    permissions: ["BanMembers"],
    run: (message: Message) => {
        const defReason = "Reason unspecified!";

        const args: string[] = message.content.slice(1).trim().split(/ +/g);
        const target: User = message.mentions.users.first();

        let reason: string = [...args].slice(2).join(" ");

        if (reason == "") reason = defReason;

        if (!target) return message.channel.send("Could not find that user!");

        if (target.id == message.author.id)
            return message.channel.send(
                `You can not kick yourself! \`\`${target.id} (${target.tag}) == ${message.author.id} (${message.author.tag})\`\``
            );

        const targetMember: GuildMember = message.guild.members.cache.get(
            target.id
        );

        if (!targetMember.kickable)
            return message.channel.send(
                `Could not ban this user! \`\`member.kickable == false\`\``
            );

        targetMember.kick(reason).then((user) => {
            return message.channel.send(
                `Done! Kicked user ${user.displayName} (${user.id}) for ${reason}`
            );
        });
    },
};

export default command;
