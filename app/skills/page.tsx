"use client";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { DropImage } from "@/components/DropFile";

export default function ImageUpload() {
  const fileTypes = ["JPG", "PNG", "JPEG"];

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (file) => {
    setImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
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
          <DropImage fileTypes={fileTypes} handleChange={handleImageChange} handleRemove={removeImage} file={image} />
        </div>
        <div className="col-span-12 md:col-span-6">
            {/* Input section */}
        </div>
      </form>
    </section>
  );
}
