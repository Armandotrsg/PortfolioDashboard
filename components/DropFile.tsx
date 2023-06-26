import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";

export const DropFile = ({
  fileTypes,
  handleChange,
  file,
  onTypeError,
}: {
  fileTypes: String[];
  handleChange: (file: File) => void;
  file: Blob | null;
  onTypeError: (fileType: string) => void;
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
        fillRule="evenodd"
        d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"
      />
      <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
    </svg>
  );
  const FileCheck = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="w-44 h-44 p-5 text-green-700"
      viewBox="0 0 16 16"
    >
      <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
    </svg>
  );
  const Icon = () => {
    if (!file) {
      return <DownloadImage />;
    }
    if (fileTypes.includes("JPEG")) {
      return (
        <Image
          src={URL.createObjectURL(file)}
          alt="preview"
          className="object-cover rounded-lg shadow-lg w-52 h-52"
          width={208}
          height={208}
        />
      );
    } else {
      return <FileCheck />;
    }
  };
  return (
    <div className="flex flex-col items-center h-full justify-center p-10">
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        multiple={false}
        onTypeError={onTypeError}
      >
        <div
          className={`p-5 md:w-96 md:h-96 rounded-xl flex flex-col justify-center items-center border-[6px] border-dashed border-indigo-50 cursor-pointer`}
        >
          <Icon />
          {!file ? (
            <>
              <p className={`text-white text-center`}>
                Drag and drop your file here
              </p>
              <p className={`text-gray-400 text-center`}>
                {`${fileTypes.join(", ")}`}
              </p>
            </>
          ) : (
            <p className="text-white text-center pt-3">File uploaded!</p>
          )}
        </div>
      </FileUploader>
    </div>
  );
};
