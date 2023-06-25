"use client";
import { DropFile } from "@/components/DropFile";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { FilePreview } from "@/components/FilePreview";
import "react-toastify/dist/ReactToastify.css";
import { urlRegex } from "@/utils/Regex";

export interface AboutMeProps {
  previousImageUrl: string;
  previousText: string;
}

export default function AboutMe({
  previousImageUrl,
  previousText,
}: AboutMeProps) {
  const fileTypes = ["JPG", "PNG", "JPEG"];
  const [image, setImage] = useState<Blob | null>(null);
  const [imageName, setImageName] = useState<string | null>(previousImageUrl);
  const [text, setText] = useState<string>(previousText);

  async function getImageBlob(previousImage: string) {
    const res = await fetch(previousImage);
    const blob = await res.blob();
    return blob;
  }

  const handleRemoveImage = () => {
    setImageName(null);
    setImage(null);
  };

  const handleImageChange = (file: File) => {
    setImageName(file.name);
    //Convert to blob
    const blob = new Blob([file], { type: file.type });
    setImage(blob);
  };

  const handleFileTypeError = (fileType: string) => {
    toast.error(`File type not supported`);
  };

  useEffect(() => {
    if (urlRegex.test(previousImageUrl)) {
      getImageBlob(previousImageUrl).then((blob) => {
        setImage(blob);
      });
    }
    console.log(urlRegex.test(imageName!));
  }, [])

  return (
    <section>
      <h1 className="text-4xl font-bold text-center text-white p-5">
        About Me
      </h1>
      <h2 className="text-2xl font-bold text-center text-white">
        Edit your about me
      </h2>
      <form className="grid grid-cols-12">
        <div className="col-span-12 sm:col-span-6">
          {!urlRegex.test(imageName!) ? (
            <DropFile
              handleChange={handleImageChange}
              file={image}
              fileTypes={fileTypes}
              onTypeError={handleFileTypeError}
            />
          ) : (
            <div className="flex justify-center items-center">
              <Image
                src={imageName!}
                alt="Image preview"
                width={300}
                height={300}
              />
            </div>
          )}
          <ToastContainer autoClose={3000} />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <div className="grid grid-rows-2">
            <div className="row-span-1 h-full p-3 mt-5">
              <div className="flex h-full items-center">
                <label className="text-white font-semibold">
                  *Image: &nbsp;
                </label>
                {imageName ? (
                  <FilePreview
                    fileName={imageName}
                    handleRemove={handleRemoveImage}
                  />
                ) : (
                  <p className="text-gray-200 italic">No image selected</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
