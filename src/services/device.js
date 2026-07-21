import { COMMANDS } from "./protocol";
import { sendCommand, readResponse } from "./serial";

export async function helloDevice() {

    await sendCommand(COMMANDS.HELLO);

    const reply = await readResponse();

    return reply;

}

export async function getVersion() {

    await sendCommand(COMMANDS.GET_VERSION);

    const version = await readResponse();

    return version;

}