import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";
import uploadIco from "../../assets/upload.png";

export default function New() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [author, setAuthor] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    data.append("image", image);
    data.append("author", author);
    data.append("place", place);
    data.append("description", description);
    data.append("hashtags", hashtags);

    const result = await api.post("posts", data);
    if (result.data.fail == null) {
      alert("Sucesso no Upload do arquivo.");
      history.push("/");
    } else {
      alert(result.data.fail);
      history.push("/");
  }

  return (
    <form action="" id="new-post" onSubmit={handleSubmit}>
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <label htmlFor="image">
        <img
          src={uploadIco}
          style={{ width: 50, height: 50 }}
          alt="Clique aqui e selecione uma imagem"
        />
      </label>

      <img src={preview} alt="" style={{ width: 300 }} />
      <input
        type="text"
        name="author"
        placeholder="Autor do post"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
      />
      <input
        type="text"
        name="place"
        placeholder="Local da foto"
        onChange={(e) => setPlace(e.target.value)}
        value={place}
      />
      <input
        type="text"
        name="description"
        placeholder="Decrição do post"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <input
        type="text"
        name="author"
        placeholder="Hashtags do post"
        onChange={(e) => setHashtags(e.target.value)}
        value={hashtags}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
