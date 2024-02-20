"use client";

import { useState } from "react";
import Uploader from "./components/Uploader";
import Compressor from "./components/Compressor";
import compressJs, { compressJsToString } from "./helpers/compress-js";
import compressorJs, { compressorJsToString } from "./helpers/compressorjs";
import browserImageCompression, {
    browserImageCompressionToString,
} from "./helpers/browser-image-compression";
import { useRouter } from "next/navigation";

export default function Home() {
    const [keyset, setKey] = useState(Date.now());
    const [files, setFiles] = useState<File[]>([]);

    const router = useRouter();

    return (
        <>
            <header className="flex p-5 gap-5 flex-nowrap flex-col-reverse sm:flex-row">
                <div className="flex flex-nowrap flex-col md:flex-row flex-[2] gap-5 items-center md:items-stretch">
                    <div className="flex-1">
                        <h1
                            className="text-4xl font-bold text-orange-700 flex-1 hover:underline cursor-pointer"
                            onClick={router.refresh}
                        >
                            Img<span className="text-gray-600">ress</span>.js
                        </h1>
                    </div>
                    <div className="flex-1 justify-center flex">
                        <Uploader add={setFiles} set={setKey} />
                    </div>
                </div>
                <div className="text-sm text-right flex-1 font-medium text-gray-400 whitespace-nowrap">
                    © 2024 •{" "}
                    <a
                        href="https://devflikr.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-all hover:text-blue-500"
                    >
                        DevFlikr Organization
                    </a>
                </div>
            </header>
            <main
                className="grid py-20 px-5 gap-5 w-full overflow-x-auto min-w-[512px]"
                style={{ gridAutoFlow: "column" }}
            >
                <Compressor
                    key={`${keyset}--1`}
                    name="compress.js"
                    compressor={compressJs}
                    toString={compressJsToString}
                    files={files}
                />
                <Compressor
                    key={`${keyset}--2`}
                    name="compressorjs"
                    compressor={compressorJs}
                    toString={compressorJsToString}
                    files={files}
                />
                <Compressor
                    key={`${keyset}--3`}
                    name="browser-image-compression"
                    compressor={browserImageCompression}
                    toString={browserImageCompressionToString}
                    files={files}
                />
            </main>
        </>
    );
}
