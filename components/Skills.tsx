"use client";
import { useEffect, useState } from "react";
import { DropFile } from "@/components/DropFile";
import { toast, ToastContainer } from "react-toastify";
import { FilePreview } from "@/components/FilePreview";
import { urlRegex } from "@/utils/Regex";
import { Input } from "@/components/Input";
import { auth, storage } from "@/firebaseConfig";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { SkillsProps } from "../app/api/skills/route";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Skills() {
  const fileTypes = ["JPG", "PNG", "JPEG", "SVG", "WEBP", "AVIF"];
  const [image, setImage] = useState<Blob | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      }
    });
  }, [router])

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

  const handleImageLink = async (): Promise<void> => {
    //Get the image from the link and convert to blob
    //Get the text from the input
    const url = (document.querySelector("input[type=url]") as HTMLInputElement)
      ?.value;
    if (!urlRegex.test(url)) {
      toast.error(`Please enter a valid url`);
      return;
    }
    let blob = await fetch(url).then((r) => r.blob());
    // Catch errors
    if (!blob) {
      toast.error(`Error fetching image`);
      return;
    }
    setImage(blob);
    setImageName(url);
  };

  const handleFileTypeError = (fileType: string) => {
    toast.error(`File type not supported`);
  };

  async function uploadImage() {
    if (!urlRegex.test(imageName!) && image) {
      const storageRef = ref(storage, `skills/${imageName}`);
      const snapshot = await uploadBytes(storageRef, image);
      console.log("Uploaded a blob or file!", snapshot);
      //Obtener la url de la imagen
      const url = await getDownloadURL(snapshot.ref);
      console.log(url);
      return url;
    } else {
      console.log("Image is a link");
      return imageName;
    }
  }

  async function uploadProject() {
    if (!name) {
      return Promise.reject("Please add a name");
    } else if (!image) {
      return Promise.reject("Please add an image");
    }
    const url = await uploadImage();
    const params: SkillsProps = {
      name: name,
      img: url!,
    };
    const res = await fetch("/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    console.log(data);
    if (!data.success) {
      return Promise.reject(data.message);
    } else {
      console.log(data.message);
      return Promise.resolve(data.message);
    }
  }

  function handleSubmit() {
    toast.promise(uploadProject(), {
      pending: "Submitting...",
      success: {
        render: ({ data }) => {
          //Clear the form after the correct submission
          setName("");
          setImage(null);
          setImageName(null);
          return `${data}`;
        },
      },
      error: {
        render: ({ data }) => `${data}`,
      },
    });
  }

  return (
    <section>
      <h1 className="text-4xl font-bold text-center text-white p-5">Skills</h1>
      <h2 className="text-2xl font-bold text-center text-white">
        Add a new skill
      </h2>
      <form className="grid grid-cols-12">
        <div className="col-span-12 sm:col-span-6">
          <DropFile
            handleChange={handleImageChange}
            file={image}
            fileTypes={fileTypes}
            onTypeError={handleFileTypeError}
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <div className="grid grid-rows-3 gap-y-4  p-3 mt-5">
            <div className="row-span-1 p-3">
              <div
                className={`flex h-full ${
                  !image ? "flex-col space-y-3" : "items-center"
                }`}
              >
                <label className="text-white font-semibold">
                  *Image: &nbsp;
                </label>
                {image && imageName ? (
                  <FilePreview
                    fileName={imageName}
                    handleRemove={handleRemoveImage}
                  />
                ) : (
                  <div className="flex space-x-3">
                    <input
                      type="url"
                      placeholder="Alternatively add an image link"
                      className="w-full bg-transparent p-3 border rounded-lg border-white text-white focus:border-blue-500"
                    />
                    <button
                      type="button"
                      className="bg-midnight-700 text-sm transition-all hover:bg-midnight-800 text-white py-2 px-4 rounded"
                      onClick={handleImageLink}
                    >
                      Add
                    </button>
                    <ToastContainer autoClose={3000} />
                  </div>
                )}
              </div>
            </div>
            <div className="row-span-1 p-3">
              <Input
                label="Skill Name"
                type="text"
                name="name"
                value={name}
                handleChange={(e) => setName(e.target.value)}
                placeholder="Enter skill name"
                required
              />
            </div>
            <div className="row-span-1 p-3">
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-midnight-700 text-sm transition-all hover:bg-midnight-800 text-white py-2 px-4 rounded"
                  onClick={async (e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  Submit
                </button>
                <ToastContainer autoClose={3000} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
