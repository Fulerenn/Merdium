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

class Logger {
    constructor() {}

    log(message: string) {
        console.log(`[LOG] (${this.getFormatedDate()}) ${message}`);
    }

    warn(message: string) {
        console.log(`[WARN] (${this.getFormatedDate()}) ${message}`);
    }

    error(message: string) {
        console.log(`[ERROR] (${this.getFormatedDate()}) ${message}`);
    }

    // TODO: Make it cleaner
    private getFormatedDate() {
        let storage = {
            day: "0",
            month: "0",
            year: "",
            hour: "",
            minute: "0",
        };

        const snapshot = new Date();
        storage.day += snapshot.getDay().toString();
        storage.month += snapshot.getMonth().toString();
        storage.year = snapshot.getFullYear().toString();
        storage.hour = snapshot.getHours().toString();
        storage.minute += snapshot.getMinutes().toString();

        storage.minute = this.normalizeDate(storage.minute);
        storage.day = this.normalizeDate(storage.day);
        storage.month = this.normalizeDate(storage.month);

        return `${storage.day}.${storage.month}.${storage.year} ${storage.hour}:${storage.minute}`;
    }

    private normalizeDate(content: string) {
        return content.slice(-2);
    }
}

export { Logger };
