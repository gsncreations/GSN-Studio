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
export async function uploadAnimation(file, onProgress = () => {}) {

    const form = new FormData();

    form.append("file", file, file.name);

    const response = await fetch(
        "http://192.168.4.1/upload",
        {
            method: "POST",
            body: form
        }
    );

    if (!response.ok)
        return false;

    onProgress(100);

    return true;
}