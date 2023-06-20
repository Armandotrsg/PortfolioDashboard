"use client";
import { FileUploader } from "react-drag-drop-files";

export const DropImage = ({
  fileTypes,
  file,
  handleChange,
  handleRemove,
}: {
  fileTypes: String[];
  file: any;
  handleChange: any;
  handleRemove: any;
}) => {
  const DownloadImage = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="w-52 h-52 text-indigo-400"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"
      />
      <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
    </svg>
  );
  const CloseButton = () => {
    return (
      <button onClick={handleRemove}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="w-5 h-5 text-red-500 hover:text-red-600"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
    );
  };
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        multiple={false}
      >
        <div
          className={`w-96 h-96 rounded-xl flex flex-col justify-center items-center border-[6px] border-dotted border-indigo-50 cursor-pointer`}
        >
          <DownloadImage />
          <p className="text-white">Drag and drop your file here</p>
        </div>
      </FileUploader>

      {file && (
        <div className="flex items-center justify-center space-x-2 mt-5">
          <p className="text-white">{file.name}</p>
          <CloseButton />
        </div>
      )}
    </div>
  );
};
