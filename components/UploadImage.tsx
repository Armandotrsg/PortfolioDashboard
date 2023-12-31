"use client";
import { useEffect, useState } from "react";
import { DropFile } from "@/components/DropFile";
import { resizeImage } from "@/utils/ResizeImage";
import { FilePreview } from "@/components/FilePreview";
import { Input } from "@/components/Input";
import { auth, storage } from "@/firebaseConfig";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { ProjectProps } from "@/app/api/projects/[projects]/route";
import { toast, ToastContainer } from "react-toastify";
import { urlRegex } from "@/utils/Regex";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export interface UploadImageProps {
    path: string;
    isUrlRequired: boolean;
}

export default function UploadImage({
    path,
    isUrlRequired,
}: UploadImageProps) {
  const fileTypes = ["JPG", "PNG", "JPEG", "WEBP", "AVIF"];

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [image, setImage] = useState<Blob | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
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
    resizeImage(file, 519, 380).then((blob: Blob) => {
      setImage(blob);
    });
  };

  async function uploadImage() {
    if (image) {
      const storageRef = ref(storage, `${path}/${imageName}`);
      const snapshot = await uploadBytes(storageRef, image);
      console.log("Uploaded a blob or file!", snapshot);
      //Obtener la url de la imagen
      const url = await getDownloadURL(snapshot.ref);
      console.log(url);
      return url;
    }
  }

  async function uploadProject() {
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      !startDate ||
      (endDate && !(endDate instanceof Date)) ||
      !image
    ) {
      return Promise.reject("Fill all the fields");
    }
    if (isUrlRequired && !urlRegex.test(url)) {
        return Promise.reject("Invalid url");
    }
    const imgUrl = await uploadImage();
    //Get the dates in format Month Year

    let start = startDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    let end = endDate?.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    console.log(start, end);

    const projectDates = {
      start: `${start}`,
      end: `${end}`,
    };
    const projectData: ProjectProps = {
      name: title,
      url: url === "" ? undefined : url,
      description: description,
      image: imgUrl!,
      dates: projectDates,
    };
    const res = await fetch(`api/projects/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });
    const data = await res.json();
    console.log(data);
    if (!data.success) {
      return Promise.reject(data.message);
    } else {
      return Promise.resolve(data.message);
    }
  }

  async function handleSubmit() {
    toast.promise(uploadProject(), {
      pending: "Submitting...",
      success: {
        render: ({ data }) => {
          //Clear the form after the correct submission
          setTitle("");
          setUrl("");
          setDescription("");
          setStartDate(new Date());
          setEndDate(new Date());
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

  const handleFileTypeError = (fileType: string) => {
    toast.error(`File type not supported`);
  }

  const inputFields = [
    {
      label: "Title",
      type: "text",
      name: "title",
      value: title,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value),
      placeholder: "Project title",
      required: true,
    },
    {
      label: "URL",
      type: "url",
      name: "url",
      value: url,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUrl(e.target.value),
      placeholder: "The project's url",
      required: isUrlRequired,
    },
    {
      label: "Description",
      type: "text",
      name: "description",
      value: description,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setDescription(e.target.value),
      placeholder: "A brief description of the project",
      required: true,
    },
  ];

  const dateFields = [
    {
      label: "Start date",
      type: () => "date",
      name: "start",
      value: startDate,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setStartDate(new Date(e.target.value)),
      placeholder: "The project's start date",
      required: true,
      disabled: () => false,
    },
    {
      label: "End date",
      type: () => (endDate === undefined ? "text" : "date"),
      name: "end",
      value: endDate,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEndDate(new Date(e.target.value)),
      placeholder: "Currenly working here",
      required: false,
      disabled: () => endDate === undefined,
    },
  ];

  return (
    <section>
      <h1 className="text-4xl font-bold text-center text-white p-5">
        {/* Make the path to title and replace '-' */}
        {path[0].toUpperCase() + path.slice(1).replace("-", " ")}
      </h1>
      <h2 className="text-2xl font-bold text-center text-white">
        {`Add a new ${path.replace("-", " ")}`}
      </h2>
      <form className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-6">
          {/* Image placeholder */}
          <DropFile
            fileTypes={fileTypes}
            handleChange={handleImageChange}
            file={image}
            onTypeError={handleFileTypeError}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          {/* Input section */}
          <div className="h-full">
            <div className="grid grid-rows-5">
              {/* Image preview */}
              <div className="row-span-1 h-full p-3 mt-5">
                <div className="flex h-full items-center">
                  <label className="text-white font-semibold">
                    *Image: &nbsp;
                  </label>
                  {image && imageName ? (
                    <FilePreview
                      fileName={imageName}
                      handleRemove={handleRemoveImage}
                    />
                  ) : (
                    <p className="text-gray-200 italic">No image selected</p>
                  )}
                </div>
              </div>
              {/* Input fields */}
              <>
                {/* Input fields */}
                {inputFields.map((input, index) => (
                  <div className="row-span-1 p-3" key={index}>
                    <Input
                      label={input.label}
                      type={input.type}
                      name={input.name}
                      value={input.value}
                      handleChange={input.handleChange}
                      placeholder={input.placeholder}
                      required={input.required}
                    />
                  </div>
                ))}
                {/* Dates */}
                <div className="row-span-1 p-3">
                  <div className="grid grid-cols-2 gap-x-5">
                    {dateFields.map((date, index) => (
                      <div className="col-span-1" key={index}>
                        <div className="flex flex-col h-full space-y-1">
                          <label
                            htmlFor={date.name}
                            className="text-white font-semibold"
                          >
                            {`${date.required ? "*" : ""}${date.label}:`}
                          </label>
                          <input
                            type={date.type()}
                            name={date.name}
                            id={date.name}
                            className={`w-full h-full bg-transparent p-3 border rounded-lg border-white text-white focus:border-blue-500 ${
                              date.disabled() ? " border-gray-500" : ""
                            }`}
                            required={date.required}
                            onChange={date.handleChange}
                            disabled={date.disabled()}
                            placeholder={date.placeholder}
                            value={
                              date.value === undefined
                                ? ""
                                : date.value instanceof Date
                                ? date.value.toISOString().split("T")[0]
                                : date.value
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Current Date */}
                <div className="row-span-1 p-3">
                  <div className="flex space-x-1 items-center">
                    <input
                      type="checkbox"
                      name="current"
                      id="current"
                      className="bg-transparent p-3 border rounded-lg border-white text-white focus:border-blue-500"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEndDate(
                          endDate === undefined ? new Date() : undefined
                        );
                      }}
                      checked={endDate === undefined}
                    />
                    <label
                      htmlFor="current"
                      className="text-white font-semibold"
                    >
                      Currently working here
                    </label>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
        <div className="col-span-12 ">
          <div className="flex justify-center items-center ">
            <button
              type="submit"
              className="bg-blue-500 transition-all hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
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
      </form>
    </section>
  );
}
