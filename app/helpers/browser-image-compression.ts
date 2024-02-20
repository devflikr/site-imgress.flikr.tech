import imageCompression from "browser-image-compression";

async function browserImageCompression(file: File) {
    const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        quality: 0.9,
    };
    try {
        const compressedFile = await imageCompression(file, options);

        return compressedFile;
    } catch (error) {
        console.error(error);

        return file;
    }
}

export default browserImageCompression;

export const browserImageCompressionToString = () => `
import imageCompression from "browser-image-compression";

async function browserImageCompression(file: File) {
    const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        quality: 0.9,
    };
    try {
        const compressedFile = await imageCompression(file, options);

        return compressedFile;
    } catch (error) {
        console.error(error);

        return file;
    }
}

export default browserImageCompression;
`;
