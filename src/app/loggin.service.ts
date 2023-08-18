import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LoggingService {
    lastlog: string;

    printLog(message: string) {

        this.lastlog = message;
    }

}