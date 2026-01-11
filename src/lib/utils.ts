import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function abbreviationName(name: string): string {
  return name
    .split(" ")
    .map((kata) => kata[0]?.toUpperCase())
    .join("");
}

export function formatToRupiah(number: number) {
  return new Intl.NumberFormat("id-ID").format(number);
}

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: "accurate" | "normal" = "normal",
) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate"
      ? (accurateSizes[i] ?? "Bytest")
      : (sizes[i] ?? "Bytes")
  }`;
}

export function formatDate(date: Date | string | number) {
  const d = new Date(date);

  // Format Tanggal: 17 Agustus 2023
  const datePart = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);

  // Format Waktu: 13:10
  const timePart = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(d)
    .replace(/\./g, ":"); // Mengubah titik bawaan id-ID menjadi titik dua

  return `${datePart} ${timePart} WIB`;
}
