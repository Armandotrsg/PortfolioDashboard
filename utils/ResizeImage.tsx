export const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = maxWidth;
      canvas.height = maxHeight;

      ctx?.drawImage(img, 0, 0, maxWidth, maxHeight);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to resize image"));
        }
      }, file.type);
    };
    img.onerror = reject;
  });
};
