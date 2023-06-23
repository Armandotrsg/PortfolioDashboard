interface ImagePreviewProps {
  fileName: string;
  handleRemove: () => void;
}

export const FilePreview = ({ fileName, handleRemove }: ImagePreviewProps) => {
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
      <div className="flex items-start space-x-1 max-w-sm">
        <p className="text-center text-gray-200 truncate">{fileName}</p>
        <CloseButton />
      </div>
    </>
  );
};
