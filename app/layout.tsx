import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Imgressor.js",
    description:
        "Compare various Client-side JavaScript based Image compression tools, and pick what's the best for you and your project.",
    applicationName: "Imgressor.js",
    keywords:
        "Image, compressor, imgress, imgressor, imgressorjs, imgressjs, imgressor.js imgress.js",

    /*
    ? Only if required */
    // manifest: "", // app manifest json url

    /*
    ! Only when deployed */
    // assets: "", // app assets path
    // metadataBase: new URL(""), // base url of app
    // openGraph: {
    //     type: "website",
    //     url: "", // app deployed website
    //     title: "", // can be same as app title
    //     description: "", // can be same as app description
    //     siteName: "", // can be same as app title
    //     images: [
    //         { url: "", alt: "", height: 0, width: 0 }
    //     ]
    // },
    // twitter: {
    //     card: "summary_large_image",
    //     title: "",
    //     description: "",
    //     site: "@site",
    //     siteId: "",
    //     creator: "@handle",
    //     creatorId: "",
    //     images: [
    //         { url: "", alt: "", height: 0, width: 0 }
    //     ]
    // },

    icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],

    /*
    ? Prefilled fields */
    authors: [
        {
            name: "DevFlikr",
            url: "https://devflikr.com",
        },

        /*
        ? Add other authors here */
    ],
    creator: "DevFlikr Team",
    generator: "DevFlikr NextJS Template",
    publisher: "DevFlikr Organization",
    referrer: "origin",
    robots: "index, follow",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
                <Toaster position="bottom-center" />
            </body>
        </html>
    );
}
