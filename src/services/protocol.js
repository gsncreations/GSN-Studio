    import { getWriter, getReader, readLine } from "./usb";

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

    if (!writer)
    {
        alert("ESP32 not connected.");
        return false;
    }

    const encoder = new TextEncoder();

    // Send upload command
    await writer.write(
        encoder.encode(`UPLOAD ${file.name} ${file.size}\n`)
    );
await writer.ready;
    // Wait for READY
 let ready = false;

while (true)
{
    const line = await readLine();

    console.log("ESP:", line);

    if (line === "READY")
    {
        ready = true;
        continue;
    }

    if (ready && line === "PACKET")
    {
        break;
    }

    if (line === "UPLOAD_FAILED")
        return false;
}

    const buffer = new Uint8Array(await file.arrayBuffer());

   const CHUNK = 512;

    let sent = 0;

    while (sent < buffer.length)
    {
        const end = Math.min(sent + CHUNK, buffer.length);

       await writer.write(buffer.slice(sent, end));
await writer.ready;

// Tiny pause
await new Promise(resolve => setTimeout(resolve, 2));

        sent = end;

        onProgress(
            Math.floor((sent * 100) / buffer.length)
        );
    }

    console.log("Upload Finished");

  await writer.ready;

await new Promise(resolve => setTimeout(resolve, 100));
while (true)
{
    const line = await readLine();

        console.log("ESP:", line);

        if (line === "UPLOAD_OK")
            return true;

        if (line === "UPLOAD_FAILED")
            return false;
    }
}

export async function getDeviceInfo() {

    const writer = getWriter();
    const reader = getReader();

    if (!writer || !reader)
        return null;

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    await writer.write(
        encoder.encode("DEVICE_INFO\n")
    );

    let buffer = "";

    while (true)
    {
        const { value, done } = await reader.read();

        if (done)
            return null;

        buffer += decoder.decode(value);

        const start = buffer.indexOf("{");
        const end = buffer.lastIndexOf("}");

        if (start !== -1 && end !== -1)
        {
            try
            {
                return JSON.parse(
                    buffer.substring(start, end + 1)
                );
            }
            catch (e)
            {
            }
        }
    }
}