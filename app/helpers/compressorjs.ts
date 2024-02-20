import Compressor from "compressorjs";

async function compressorJs(file: File) {
    return new Promise<File | Blob>((resolve) => {
        new Compressor(file, {
            strict: true,
            checkOrientation: true,
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 0.9,
            success(result) {
                resolve(result);
            },
        });
    });
}

export default compressorJs;

export const compressorJsToString = () => `
import Compressor from "compressorjs";

async function compressorJs(file: File) {
    return new Promise<File | Blob>((resolve) => {
        new Compressor(file, {
            strict: true,
            checkOrientation: true,
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 0.9,
            success(result) {
                resolve(result);
            },
        });
    });
}

export default compressorJs;
`;
