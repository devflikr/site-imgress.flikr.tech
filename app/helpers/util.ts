export function formatFileSize(bytes: number) {
    if (bytes === 0) return "0 B";

    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function getFileExtension(file: File, blob: File | Blob) {
    return `${file.name.split(".").pop()} --> ${(blob as File).name
        .split(".")
        .pop()}`;
}

export function parseMilliseconds(milliseconds: number): string {
    return `${(milliseconds / 1000).toFixed(3)}s`;
}

export function randomNumber(min = 0, max = 512) {
    return Math.floor(Math.random() * (max - min)) + min;
}
