import React, { useState, useEffect } from "react";
import api from "../../services/api";
import io from "socket.io-client";

import "./styles.css";

import comment from "../../assets/comment.svg";
import like from "../../assets/like.svg";
import more from "../../assets/more.svg";
import send from "../../assets/send.svg";

export default function Feed() {
  const [feed, setFeed] = useState();

  useEffect(() => {
    api.get("posts").then((response) => {
      setFeed(response.data);
    });
  }, []);

  function registerToNewActivity() {
    const socket = io("https://omnistack07-backend.herokuapp.com/");
    // const socket = io("http://localhost:3334");

    socket.on("post", (newPost) => {
      feed && setFeed([newPost, ...feed]);
    });

    socket.on("like", (likedPost) => {
      feed &&
        setFeed(
          feed.map((post) =>
            post._id === likedPost._id
              ? { ...post, likes: likedPost.likes }
              : post
          )
        );
    });
  }

  async function handleLike(id) {
    await api.post(`posts/${id}/like`);
  }

  registerToNewActivity();
  return (
    <section id="post-list">
      {feed &&
        feed.map((post) => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author} </span>
                <span className="place">{post.place} </span>
              </div>
              <img src={more} alt="more" />
            </header>
            <img src={`${post.image}`} alt="" />
            <footer>
              <div className="actions">
                <button type="button" onClick={() => handleLike(post._id)}>
                  <img src={like} alt="like" />
                </button>
                <img src={comment} alt="comment" />
                <img src={send} alt="send" />
              </div>
              <strong>{post.likes} curtidas</strong>
              <p>
                {post.description}
                <span>{post.hashtags} </span>
              </p>
            </footer>
          </article>
        ))}
    </section>
  );
}
