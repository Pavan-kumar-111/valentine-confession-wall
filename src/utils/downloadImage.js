import html2canvas from "html2canvas";

export const downloadImage = async (element, fileName) => {
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: null
  });

  const link = document.createElement("a");
  link.download = fileName;
  link.href = canvas.toDataURL("image/png");
  link.click();
};
