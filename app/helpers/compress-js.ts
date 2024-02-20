import Compress from "compress.js";

async function compressJs(file: File) {
    const compress = new Compress();

    const resizedImage = await compress.compress([file], {
        size: 1,
        quality: 0.9,
        maxWidth: 1024,
        maxHeight: 1024,
        resize: true,
    });

    const [img] = resizedImage;
    const base64str = img.data;
    const imgExt = "image/jpeg";

    const resizedFile = Compress.convertBase64ToFile(base64str, imgExt);

    const fileName = file.name
        .split(".")
        .filter((_, i, a) => i < a.length - 1)
        .join(".");

    return new File([resizedFile], `${fileName}.jpeg`, {
        type: imgExt,
    });
}

export const compressJsToString = () => `
import Compress from "compress.js";

async function compressJs(file: File) {
    const compress = new Compress();

    const resizedImage = await compress.compress([file], {
        size: 1,
        quality: 0.9,
        maxWidth: 1024,
        maxHeight: 1024,
        resize: true,
    });

    const [img] = resizedImage;
    const base64str = img.data;
    const imgExt = "image/jpeg";

    const resizedFile = Compress.convertBase64ToFile(base64str, imgExt);

    const fileName = file.name
        .split(".")
        .filter((_, i, a) => i < a.length - 1)
        .join(".");

    return new File([resizedFile], \`\${fileName}.jpeg\`, {
        type: imgExt,
    });
}

export default compressJs;
`;

export default compressJs;
