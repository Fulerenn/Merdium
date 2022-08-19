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
import { MerdiumChatCommand } from "../utils/commands";

const command: MerdiumChatCommand = {
    name: "test",
    description: "This is only a test command",
    permissions: ["ManageMessages"],
    run: (message: Message) => {
        return message.channel.send("Eyy!");
    },
};

export default command;
