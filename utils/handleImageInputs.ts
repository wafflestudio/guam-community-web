import { Dispatch, SetStateAction } from "react";

import { MB } from "../constants/constants";
import { IImageUrl } from "../types/types";

export const handleImageInput = async (
  target: EventTarget & HTMLInputElement,
  size: number,
  imageFiles: File[],
  setImageFiles: Dispatch<SetStateAction<File[]>>,
  setImageUrls: Dispatch<SetStateAction<IImageUrl[]>>,
  setImageData: Dispatch<SetStateAction<Uint8Array[]>>
) => {
  if (target.files) {
    if (Array.from(target.files).some((file) => file.size > size * MB)) {
      alert(`이미지 크기는 ${size}MB 이하만 가능합니다`);
    }

    const filteredImages = Array.from(target.files).filter(
      (image) => image.size <= size * MB
    );
    const imagesList = [...imageFiles, ...filteredImages];
    if (imagesList.length > 5) alert("사진은 5장까지 첨부 가능합니다");
    setImageFiles(imagesList.slice(0, 5));

    const newUrls = filteredImages.map((file) => ({
      id: file.lastModified + file.name,
      url: URL.createObjectURL(file),
    }));
    setImageUrls((imageUrls) => [...imageUrls, ...newUrls].slice(0, 5));

    const newArray: number[] = [];

    await Promise.all(
      imagesList.slice(0, 5).map((image) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(image);

        reader.onload = ({ target }) => {
          //   if (typeof target?.result === typeof ArrayBuffer && target?.result) {
          newArray = newArray.concat(new Uint8Array(target.result));
          setImageData(newArray);
        };
        // };
      })
    );
  }
};
