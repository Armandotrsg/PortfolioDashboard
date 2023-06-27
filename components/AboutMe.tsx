"use client";
import { DropFile } from "@/components/DropFile";
import { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { FilePreview } from "@/components/FilePreview";
import { storage } from "@/firebaseConfig";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
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

  async function uploadImage() {
    if (!urlRegex.test(imageName!) && image) {
      const storageRef = ref(storage, `about-me/${imageName}`);
      const snapshot = await uploadBytes(storageRef, image);
      console.log("Uploaded a blob or file!", snapshot);
      //Obtener la url de la imagen
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } else if (imageName === null) {
      return Promise.reject("Image is required");
    }
    return imageName;
  }

  async function updateAboutMe() {
    const url = await uploadImage();
    //Get text from input
    const newText = (document.querySelector("textarea") as HTMLTextAreaElement)
      ?.value;
    if (!newText) {
      return Promise.reject("Text is required");
    } else if (newText === text && url === imageName) {
      return Promise.reject("No changes detected");
    }
    const res = await fetch("/api/personal/about-me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newText,
        image: url,
      }),
    });

    const data = await res.json();
    if (!data.success) {
      return Promise.reject(data);
    } else {
      return Promise.resolve(data);
    }
  }

  function handleSubmit() {
    toast.promise(updateAboutMe(), {
      pending: "Updating about me...",
      success: {
        render: ({ data }) => {
          setText(data.data.text);
          setImageName(data.data.image);
          return "About me updated!";
        },
      },
      error: {
        render: ({ data }: any) => {
          return data.message === undefined ? data : data.message;
        },
      },
    });
  }

  return (
    <section>
      <h1 className="text-4xl font-bold text-center text-white p-5">
        About Me
      </h1>
      <h2 className="text-2xl mb-3 font-bold text-center text-white">
        Edit your about me
      </h2>
      <form className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-6">
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
                className="object-cover rounded-lg shadow-lg"
                width={300}
                height={300}
              />
            </div>
          )}
          <ToastContainer autoClose={3000} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="grid grid-rows-5">
            <div className="row-span-1 p-3 mt-5">
              <div className="flex justify-center lg:justify-start items-center">
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
            <div className="row-span-3 p-3">
              <div className="flex flex-col items-start space-y-3 justify-start">
                <label className="text-white font-semibold">
                  *Text: &nbsp;
                </label>
                <textarea
                  className="w-full h-52 p-3 rounded-lg shadow-lg bg-transparent border border-white text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  defaultValue={text}
                  rows={10}
                />
              </div>
            </div>
            <div className="row-span-1 p-3">
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  {" "}
                  Submit{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
