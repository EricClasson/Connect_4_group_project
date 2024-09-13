export default function fileToBase64(fileInputElement: HTMLInputElement) {
  if (!fileInputElement.value) return;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL((fileInputElement.files || [])[0]);
    reader.onerror = () => reject();
    reader.onload = () => resolve(reader.result);
  });
}
