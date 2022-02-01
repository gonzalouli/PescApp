export const getDataUrl = (imageUrl: Blob): Promise<string | ArrayBuffer> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    if (!imageUrl) {
      reject(new DOMException("Error loading the images of file"));
    }

    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input file"));
    };

    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(imageUrl);
  });
};
