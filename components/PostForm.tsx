import { useState } from "react";

import { usePostPostMutation } from "../api/postsApi";
import { boardList } from "../constants/constants";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardId, setBoardId] = useState(0);
  const [images, setImages] = useState<Blob[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [postPost] = usePostPostMutation();

  const onPostSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const object = {
      boardId: boardId.toString(),
      title,
      content,
      tagId: "1",
    };
    Object.keys(object).forEach((key) =>
      formData.append(key, object[key as keyof object])
    );
    images.length &&
      images.forEach((image) => {
        formData.append("images", image);
      });

    postPost(formData);
  };

  const onBoardChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    setBoardId(parseInt(e.target.value));
  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setTitle(e.target.value);
  const onContentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setContent(e.target.value);

  const handleImageInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
      const newUrls = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImageUrls([...imageUrls, ...newUrls]);
    }
  };

  return (
    <form onSubmit={onPostSubmit}>
      <label htmlFor="board">
        게시판
        <select
          id="board"
          name="board"
          value={boardId}
          onChange={onBoardChange}
        >
          {boardList.map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="title">
        제목
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={onTitleChange}
        />
      </label>
      <label htmlFor="content">
        내용
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={onContentChange}
        />
      </label>
      <label htmlFor="images">
        사진 업로드
        <input type="file" onChange={handleImageInput} multiple />
        {imageUrls &&
          imageUrls.map((imageUrl) => <img key={imageUrl} src={imageUrl} />)}
      </label>
      <button type="submit">작성하기</button>
    </form>
  );
}
