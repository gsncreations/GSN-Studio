let port = null;
let writer = null;
let reader = null;
let rxBuffer = "";

export async function connectUSB() {

    if (!("serial" in navigator)) {

        alert("Web Serial API is not supported.\nPlease use Chrome or Edge.");

        return false;

    }

    try {

        port = await navigator.serial.requestPort();

        await port.open({
            baudRate: 115200
        });

        writer = port.writable.getWriter();
        reader = port.readable.getReader();

        console.log("ESP32 Connected");

        return true;

    }
    catch (err) {

        console.error(err);
        alert(err.message);

        return false;

    }

}

export function getWriter() {
    return writer;
}

export function getReader() {
    return reader;
}

export function getPort() {
    return port;
}

export async function disconnectUSB() {

    try {

        if (reader) {
            await reader.cancel().catch(() => {});
            reader.releaseLock();
            reader = null;
            rxBuffer = "";
        }

        if (writer) {
            await writer.close?.().catch(() => {});
            writer.releaseLock();
            writer = null;
        }

        if (port) {
            await port.close().catch(() => {});
            port = null;
        }

        console.log("USB Disconnected");

    }
    catch (e) {
        console.log(e);
    }

}

export async function sendBytes(data) {

    if (!writer)
        return false;

    await writer.write(data);

    return true;

}

export async function readLine()
{
    const decoder = new TextDecoder();

    while (true)
    {
        const index = rxBuffer.indexOf("\n");

        if (index !== -1)
        {
            const line = rxBuffer.substring(0, index).trim();
            rxBuffer = rxBuffer.substring(index + 1);
            return line;
        }

        const { value, done } = await reader.read();

        if (done)
            return "";

        rxBuffer += decoder.decode(value);
    }
}