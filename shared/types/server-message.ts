import { Status } from "./status";

export interface ServerMessage {
    status: Status;
    message: string;
}