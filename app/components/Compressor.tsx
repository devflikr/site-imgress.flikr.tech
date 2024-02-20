import NextImage from "next/image";
import React, { useMemo, useState } from "react";
import { useAsync, useDebounce } from "react-unique-hooks";
import {
    formatFileSize,
    getFileExtension,
    parseMilliseconds,
    randomNumber,
} from "../helpers/util";
import toast from "react-hot-toast";
import clipboard from "clipboardy";

export type CompressorProps = {
    files: File[];
    name: string;
    compressor: (file: File) => Promise<File | Blob>;
    toString: () => string;
};
function Compressor({ name, files, compressor, toString }: CompressorProps) {
    const [timer, setTimer] = useState<number[]>(
        new Array(files.length).fill(0)
    );
    const [sizes, setSizes] = useState<number[]>(
        new Array(files.length).fill(0)
    );

    const timeSum = timer.reduce((sum, time) => sum + (time || 0), 0);
    const sizeSum = sizes.reduce((sum, size) => sum + (size || 0), 0);

    return (
        <div className="block flex-1 bg-gray-50 shadow-lg p-5 border rounded-lg border-gray-200">
            <div className="">
                <Container>
                    <div className="p-5">
                        <Tag
                            name={
                                <a
                                    href={`https://www.npmjs.com/package/${name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg font-semibold text-teal-600 transition-all hover:underline hover:text-blue-500"
                                >
                                    {name}
                                </a>
                            }
                            value={
                                <button
                                    className="px-3 py-1 rounded bg-gray-100 transition-all hover:bg-gray-200 text-sm font-medium"
                                    onClick={() => {
                                        clipboard
                                            .write(toString())
                                            .then(() => {
                                                toast.success(
                                                    `${name} code copied to clipboard.`
                                                );
                                            })
                                            .catch((e) => {
                                                toast.error(
                                                    "Failed to copy code."
                                                );
                                                console.error(e);
                                            });
                                    }}
                                >
                                    Copy code
                                </button>
                            }
                        />
                        <br />
                        <Tag
                            name="Total time"
                            value={parseMilliseconds(timeSum)}
                        />
                        <Tag
                            name="Average time"
                            value={parseMilliseconds(
                                timeSum / (timer.length || 1)
                            )}
                        />
                        <Tag
                            name="Average compression"
                            value={`${(sizeSum / (sizes.length || 1)).toFixed(
                                2
                            )}%`}
                        />
                    </div>
                </Container>
                {files.map((file, index) => (
                    <Container key={file.name}>
                        <Display
                            file={file}
                            compressor={compressor}
                            index={index}
                            updateTime={(time, index) => {
                                setTimer((times) => {
                                    const repl = [...times];
                                    repl[index] = time;

                                    return repl;
                                });
                            }}
                            updateSize={(size, index) => {
                                setSizes((sizes) => {
                                    const repl = [...sizes];
                                    repl[index] = size;

                                    return repl;
                                });
                            }}
                        />
                    </Container>
                ))}
            </div>
        </div>
    );
}

export default Compressor;

function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-w-[512px] bg-white mb-5 last-of-type:mb-0 shadow-lg rounded-lg overflow-hidden border border-gray-200">
            {children}
        </div>
    );
}

export type DisplayProps = {
    file: File;
    index: number;
    compressor: (file: File) => Promise<File | Blob>;
    updateTime: (time: number, index: number) => void;
    updateSize: (size: number, index: number) => void;
};
function Display({
    file,
    compressor,
    updateTime,
    updateSize,
    index,
}: DisplayProps) {
    const [timer, setTimer] = useState<[start: number, end: number]>([
        Date.now(),
        Date.now(),
    ]);

    const randomTime1 = useMemo(() => randomNumber(), []);
    const randomTime2 = useMemo(() => randomNumber(), []);
    const randomTime3 = useMemo(() => randomNumber(), []);

    const [result, loading] = useAsync(() =>
        Promise.resolve(() => setTimer(([start]) => [start, Date.now()]))
            .then(() => compressor(file))
            .then(
                (blob) =>
                    new Promise<
                        [
                            blob: File | Blob,
                            src: string,
                            width: number,
                            height: number
                        ]
                    >((resolve) => {
                        const img = new Image();
                        const src = URL.createObjectURL(blob);
                        img.onload = () => {
                            resolve([
                                blob,
                                src,
                                img.naturalWidth,
                                img.naturalHeight,
                            ]);
                        };
                        img.src = src;
                    })
            )
            .finally(() => setTimer(([start]) => [start, Date.now()]))
    );

    useDebounce(
        () => {
            updateTime(timer[1] - timer[0] + randomTime3, index);
        },
        randomTime1,
        [index, timer, updateTime]
    );

    useDebounce(
        () => {
            result?.[0] &&
                updateSize(
                    ((file.size - result[0].size) / file.size) * 100,
                    index
                );
        },
        randomTime2,
        [file, index, result, updateSize]
    );

    const [image, setImage] = useState<
        | [blob: File | Blob, src: string, width: number, height: number]
        | null
        | undefined
    >(null);

    useDebounce(
        () => {
            if (result) setImage([...result]);
        },
        randomTime3,
        [result]
    );

    if (loading || !result || !image)
        return (
            <span className="text-gray-400 text-sm p-5 block">Loading...</span>
        );

    const [blob, src, width, height] = image;

    return (
        <div className="w-full flex flex-nowrap gap-3 items-center">
            <div className="flex-1 w-1/2">
                <NextImage
                    src={src}
                    alt={file.name}
                    width={width}
                    height={height}
                    onLoad={() => setTimer(([start]) => [start, Date.now()])}
                    style={{ objectFit: "cover", backgroundColor: "#dedede" }}
                />
            </div>
            <div className="flex-1 w-1/2 p-5">
                <Tag name={<b>{file.name}</b>} value="" />
                <Tag name="Extension" value={getFileExtension(file, blob)} />
                <Tag name="Original" value={formatFileSize(file.size)} />
                <Tag name="Compressed" value={formatFileSize(blob.size)} />
                <Tag
                    name="Difference"
                    value={
                        (file.size - blob.size < 0 ? "-" : "") +
                        formatFileSize(Math.abs(file.size - blob.size))
                    }
                />
                <Tag
                    name="Percentage"
                    value={`${(
                        ((file.size - blob.size) / file.size) *
                        100
                    ).toFixed(2)}%`}
                />
            </div>
        </div>
    );
}

function Tag({
    name,
    value,
}: {
    name: React.ReactNode;
    value: React.ReactNode;
}) {
    return (
        <div className="flex justify-between items-center gap-4">
            <div className="font-medium">{name}</div>
            <div className="text-gray-600">{value}</div>
        </div>
    );
}
