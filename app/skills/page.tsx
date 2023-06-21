"use client";
import { useState } from "react";
import { DropImage } from "@/components/DropFile";
import { resizeImage } from "@/utils/ResizeImage";
import { ImagePreview } from "@/components/ImagePreview";
import { Input } from "@/components/Input";

export default function ImageUpload() {
  const fileTypes = ["JPG", "PNG", "JPEG"];

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<Blob | null>(null);
  const [imageName, setImageName] = useState<String | null>(null);

  const handleRemoveImage = () => {
    setImageName(null);
    setImage(null);
  }

  const handleImageChange = (file) => {
    setImageName(file.name);
    resizeImage(file, 519, 380).then((blob) => {
      setImage(blob);
    })
  };

  const removeImage = (e) => {
    e.preventDefault();
    setImage(null);
  };

  return (
    <section>
      <h1 className="text-4xl font-bold text-center text-white p-5">Skills</h1>
      <h2 className="text-2xl font-bold text-center text-white">
        Add a new skill
      </h2>
      <form className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-6">
          {/* Image placeholder */}
          <DropImage
            fileTypes={fileTypes}
            handleChange={handleImageChange}
            handleRemove={removeImage}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          {/* Input section */}
          <div className="h-full">
            <div className="grid grid-rows-5 h-full">
              {/* Image preview */}
              <div className="row-span-2 max-h-full">
                <div className="flex flex-col md:flex-row space-x-3 justify-center items-center h-[90%] p-5 mt-5 border-2 border-dashed">
                  {image ? (
                    <ImagePreview image={image} imageName={imageName} handleRemove={handleRemoveImage} />
                  ) : (
                    <p className="text-center text-white p-3 italic">
                      Image Preview
                    </p>
                  )}
                </div>
              </div>
              {/* Input fields */}
              <div className="row-span-1 p-3">
                <Input label={"Title"} type={"text"} name={"title"} value={title} handleChange={(e) => setTitle(e.target.value)} placeholder={"Title"} required={true} />
              </div>
              <div className="row-span-1 p-3">
                <Input label={"Link"} type={"text"} name={"link"} value={link} handleChange={(e) => setLink(e.target.value)} placeholder={"Link"} required={true} />
              </div>
              <div className="row-span-1 p-3">
                <Input label={"Description"} type={"text"} name={"description"} value={description} handleChange={(e) => setDescription(e.target.value)} placeholder={"Description"} required={true} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
