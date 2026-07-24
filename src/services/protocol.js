    import { getWriter, getReader } from "./usb";

    // ----------------------------------------------------
    // Save settings
    // ----------------------------------------------------
    export async function sendJSON(data) {

        const writer = getWriter();
        const reader = getReader();

        if (!writer || !reader) {
            alert("ESP32 not connected.");
            return false;
        }

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        const json = JSON.stringify(data) + "\n";

        await writer.write(
            encoder.encode(json)
        );

        while (true)
        {
            const { value, done } = await reader.read();

            if (done)
                return false;

            const msg = decoder.decode(value);

            if (msg.includes("OK"))
                return true;

            if (msg.includes("JSON_ERROR"))
                return false;
        }
    }
    // ----------------------------------------------------
    // Request installed animations
    // ----------------------------------------------------
    export async function getAnimationList() {

        const writer = getWriter();
        const reader = getReader();

        if (!writer || !reader)
            return [];

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        await writer.write(
            encoder.encode("LIST\n")
        );

        let buffer = "";

        while (true)
        {
            const { value, done } = await reader.read();

            if (done)
                return [];

            buffer += decoder.decode(value);

            const start = buffer.indexOf("{");
            const end = buffer.lastIndexOf("}");

            if (start !== -1 && end !== -1)
            {
                try
                {
                    const json = JSON.parse(
                        buffer.substring(start, end + 1)
                    );

                    return json.animations || [];
                }
                catch (e)
                {
                }
            }
        }
    }
    // ----------------------------------------------------
    // Play Animation
    // ----------------------------------------------------
    export async function playAnimation(id) {

        const writer = getWriter();
        const reader = getReader();

        if (!writer || !reader) {
            alert("ESP32 not connected.");
            return false;
        }

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        const command = `PLAY ${id}\n`;

        await writer.write(
            encoder.encode(command)
        );

        while (true) {

            const { value, done } = await reader.read();

            if (done)
                return false;

            const response = decoder.decode(value);

            if (response.includes("PLAY_OK"))
                return true;
        }
    }
    export async function uploadAnimation(file, onProgress = () => {})
    {
        const writer = getWriter();
        const reader = getReader();

        if (!writer || !reader)
        {
            alert("ESP32 not connected.");
            return false;
        }

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

    

    // Tell ESP32 we're starting an upload
    await writer.write(
        encoder.encode(`UPLOAD ${file.name} ${file.size}\n`)
    );
        // Wait for READY
    let rx = "";

    while (true)
    {
        const { value, done } = await reader.read();

        if (done)
            return false;

        rx += decoder.decode(value);

        console.log(rx);

        if (rx.includes("READY"))
            break;

        if (rx.includes("UPLOAD_FAILED"))
            return false;
    }
    const buffer = new Uint8Array(await file.arrayBuffer());

    console.log("================================");
    console.log("File Name   :", file.name);
    console.log("File Size   :", file.size);
    console.log("Buffer Size :", buffer.length);
    console.log("================================");

  const PACKET_SIZE = 256;

let sent = 0;

while (sent < buffer.length)
{
    let line = "";

    while (true)
    {
        const { value, done } = await reader.read();

        if (done)
            return false;

        line += decoder.decode(value);

        if (line.includes("\n"))
            break;
    }
line = line.trim();

const lines = line.split(/\r?\n/);

let nextLine = "";

for (const l of lines)
{
    if (l.startsWith("NEXT "))
    {
        nextLine = l;
        break;
    }
}

if (nextLine === "")
{
    console.log(line);
    throw new Error("Expected NEXT");
}

const size = parseInt(nextLine.substring(5));

    const packet = buffer.slice(sent, sent + size);

    console.log("SEND", sent, size);

await writer.write(packet);

console.log("SENT");

await writer.ready;

console.log("READY");

    sent += size;
    console.log("OFFSET", sent);

    onProgress(Math.floor((sent * 100) / buffer.length));

    let ack = "";

    while (true)
    {
        const { value, done } = await reader.read();

        if (done)
            return false;

        ack += decoder.decode(value);

        if (ack.includes("\n"))
            break;
    }

    ack = ack.trim();

const ackLines = ack.split(/\r?\n/);

let gotAck = false;

for (const l of ackLines)
{
    if (l === "ACK")
    {
        gotAck = true;
        break;
    }
}

if (!gotAck)
{
    console.log(ack);
    throw new Error("Expected ACK");
}

    console.log(`Uploaded ${sent}/${buffer.length}`);
}
    let result = "";

    while (true)
    {
        const { value, done } = await reader.read();

        if (done)
            return false;

        result += decoder.decode(value);

        console.log(result);

       if (result.includes("UPLOAD_OK"))
{
    // Wait before allowing the next upload
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
}

if (result.includes("UPLOAD_FAILED"))
{
    return false;
}
    }
    }