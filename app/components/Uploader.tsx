import React from "react";

function Uploader({
    add,
    set,
}: {
    add: (files: File[]) => void;
    set: (key: number) => void;
}) {
    return (
        <label
            htmlFor="files"
            className="select-none px-5 py-3 border border-blue-400 rounded-full inline-flex bg-blue-100 text-blue-600 font-semibold cursor-pointer transition-all hover:bg-blue-300 whitespace-nowrap"
        >
            <input
                type="file"
                name="files"
                id="files"
                multiple
                className="hidden"
                accept="image/*"
                onInput={({ target }) => {
                    const files = [
                        ...((target as HTMLInputElement).files || []),
                    ]
                        .filter((file) => file.type.includes("image/"))
                        .filter((_, i) => i < 20);
                    files.length && add(files);
                    set(Date.now());
                }}
            />
            Click to Upload Images
        </label>
    );
}

export default Uploader;
