"use client";
import { useState } from "react";
import { DropFile } from "@/components/DropFile";
import { resizeImage } from "@/utils/ResizeImage";
import { FilePreview } from "@/components/FilePreview";
import { Input } from "@/components/Input";

export default function ImageUpload() {
  const fileTypes = ["JPG", "PNG", "JPEG"];

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState<Blob | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

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
  return (
    <section>
      <h1 className="text-4xl font-bold text-center text-white p-5">Projects</h1>
      <h2 className="text-2xl font-bold text-center text-white">
        Add a new project
      </h2>
      <form className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-6">
          {/* Image placeholder */}
          <DropFile fileTypes={fileTypes} handleChange={handleImageChange} file={image} />
        </div>
        <div className="col-span-12 md:col-span-6">
          {/* Input section */}
          <div className="h-full">
            <div className="grid grid-rows-5 h-full">
              {/* Image preview */}
              <div className="row-span-1 h-full p-3 mt-5">
                <div className="flex h-full items-center">
                  <label className="text-white font-semibold">*Image: &nbsp;</label>
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
              <div className="row-span-1 p-3">
                <Input
                  label={"Title"}
                  type={"text"}
                  name={"title"}
                  value={title}
                  handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  placeholder={"Project title"}
                  required={true}
                />
              </div>
              <div className="row-span-1 p-3">
                <Input
                  label={"Link"}
                  type={"url"}
                  name={"link"}
                  value={link}
                  handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLink(e.target.value)
                  }
                  placeholder={"https://example.com"}
                  required={true}
                />
              </div>
              <div className="row-span-1 p-3">
                <Input
                  label={"Description"}
                  type={"text"}
                  name={"description"}
                  value={description}
                  handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDescription(e.target.value)
                  }
                  placeholder={"A brief description of the project"}
                  required={true}
                />
              </div>
              <div className="row-span-1 p-3">
                <div className="flex flex-col space-y-1">
                  <div className="flex">
                    <label className="text-white font-semibold w-1/2">
                      *Start date
                    </label>
                    <label className="text-white font-semibold w-1/2">
                      *End Date
                    </label>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      name="start"
                      id="start"
                      className="w-full bg-transparent p-3 border rounded-lg border-white text-white focus:border-blue-500"
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setStartDate(e.target.value);
                      }}
                    />
                    <input
                      type="date"
                      name="end"
                      id="end"
                      className="w-full bg-transparent p-3 border rounded-lg border-white text-white focus:border-blue-500"
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEndDate(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
