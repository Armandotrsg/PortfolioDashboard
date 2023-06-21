import Image from "next/image";

export const ImagePreview = ({ image, imageName, handleRemove }) => {
  const CloseButton = () => {
    return (
      <button
        onClick={handleRemove}
      >
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
    <>
      <Image
        src={URL.createObjectURL(image)}
        alt="preview"
        className="object-cover rounded-lg shadow-lg w-fit h-28"
        width={100}
        height={100}
      />
      <div className="flex">
        <p className="text-center text-white p-1">{imageName}</p>
        <CloseButton />
      </div>
    </>
  );
};
