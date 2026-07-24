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

const CHUNK = 512;

let sent = 0;

while (sent < buffer.length)
{
    const end = Math.min(sent + CHUNK, buffer.length);

    await writer.write(buffer.slice(sent, end));
    await writer.ready;

    sent = end;

    onProgress(Math.floor((sent * 100) / buffer.length));
}

console.log("Finished sending:", sent, "of", buffer.length);

await writer.ready;
await new Promise(resolve => setTimeout(resolve, 200));

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