// src/services/firmware.js

export async function getFirmwareManifest() {
  const response = await fetch("/firmware/manifest.json");

  if (!response.ok) {
    throw new Error("Unable to load firmware manifest.");
  }

  return await response.json();
}

export async function downloadFirmware() {
  const manifest = await getFirmwareManifest();

  const response = await fetch(`/firmware/${manifest.firmware}`);

  if (!response.ok) {
    throw new Error("Firmware download failed.");
  }

  const firmware = await response.arrayBuffer();

  return {
    version: manifest.version,
    firmware
  };
}