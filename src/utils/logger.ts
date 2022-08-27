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

    public log(message: string) {
        console.log(`[LOG] (${this.getFormatedDate()}) ${message}`);
    }

    public warn(message: string) {
        console.log(`[WARN] (${this.getFormatedDate()}) ${message}`);
    }

    public error(message: string) {
        console.log(`[ERROR] (${this.getFormatedDate()}) ${message}`);
    }

    // TODO: Make it cleaner
    private getFormatedDate() {
        let storage = {
            day: 0,
            month: 0,
            year: 0,
            hour: 0,
            minute: 0,
        };

        const snapshot: Date = new Date();
        storage.day = this.normalizeDigits(snapshot.getDay());
        storage.month = this.normalizeDigits(snapshot.getMonth());
        storage.year = snapshot.getFullYear();
        storage.hour = this.normalizeDigits(snapshot.getHours());
        storage.minute = this.normalizeDigits(snapshot.getMinutes());

        return `${storage.day}.${storage.month}.${storage.year} ${storage.hour}:${storage.minute}`;
    }

    private normalizeDigits(digits: any) {
        if (digits < 10) {
            return "0" + digits;
        }

        return digits;
    }
}

export { Logger };
