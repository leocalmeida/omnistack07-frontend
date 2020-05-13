import React, { useState, useEffect } from "react";
import api from "../../services/api";

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
  });

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
                <img src={like} alt="like" />
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
