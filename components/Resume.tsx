"use client";
import { DropFile } from "./DropFile";
import { useState } from "react";
import { FilePreview } from "./FilePreview";
import Link from "next/link";
import { storage } from "@/firebaseConfig";
import { uploadBytes, ref } from "firebase/storage";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export default function Resume({ prevResume }: { prevResume: string }) {
  const fileTypes = ["PDF"];
  const [pdf, setPdf] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handlePdfChange = (file: File) => {
    setFileName(file.name);
    //Convert to blob
    const blob = new Blob([file], { type: file.type });
    setPdf(blob);
  };

  const handleFileTypeError = (fileType: string) => {
    toast.error(`File type not supported`);
  };

  const handleRemovePdf = () => {
    setFileName(null);
    setPdf(null);
  };

  async function handleUpload() {
    if (pdf) {
      const storageRef = ref(storage, `pdf/Armando_Terrazas_Resume.pdf`);
      const snapshot = await uploadBytes(storageRef, pdf);
      console.log("Uploaded a blob or file!", snapshot);
    } else {
      return Promise.reject("File is required");
    }
  }

  function handleSubmit() {
    toast.promise(handleUpload(), {
      pending: "Uploading...",
      success: "File uploaded!",
      error: {
        render: ({ data }: any) => {
          return data.message;
        },
      },
    });
  }

  return (
    <section>
      <h1 className="text-4xl font-bold text-center text-white p-5">Resume</h1>
      <h2 className="text-2xl mb-3 font-bold text-center text-white">
        Update your resume here
      </h2>
      <form
        className="grid grid-cols-12"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="col-span-12 sm:col-span-6">
          <DropFile
            handleChange={handlePdfChange}
            file={pdf}
            fileTypes={fileTypes}
            onTypeError={handleFileTypeError}
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <div className="grid grid-rows-4">
            <div className="row-span-1 p-3 mt-5">
              <div className="flex justify-center lg:justify-start items-center">
                <label className="text-white font-semibold">*PDF: &nbsp;</label>
                {fileName ? (
                  <FilePreview
                    fileName={fileName}
                    handleRemove={handleRemovePdf}
                  />
                ) : (
                  <p className="text-gray-200 italic">No pdf selected</p>
                )}
              </div>
            </div>
            <div className="row-span-2 p-3">
              <div className="flex flex-col space-y-2 items-center max-w-sm lg:items-start justify-center">
                <label className="text-white font-semibold">
                  Preview Former Resume: &nbsp;
                </label>
                <div className="flex items-center max-w-sm">
                  <Link
                    href={prevResume}
                    className="text-gray-200 hover:underline focus:underline"
                    target="_blank"
                  >
                    {prevResume}
                  </Link>
                </div>
              </div>
            </div>
            <div className="row-span-1 p-3">
              <div className="flex justify-center items-center">
                <button className="bg-blue-500 transition-all hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer autoClose={3000} />
    </section>
  );
}
