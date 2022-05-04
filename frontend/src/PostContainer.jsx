import React from "react";
import like from "./assets/like.svg";
import dislike from "./assets/dislike.svg";

const PostContainer = (postData, reactOnPost) => {
  const _reactOnPost = async (like) => {
    if (postData.reaction === 0) {
     await reactOnPost(postData.id, like);
    } else {
      console.log("You already reacted on this post.");
    }
  };

  const _shortenAddress =
    postData.owner.substring(0, 9) + "..." + postData.owner.substring(34);

  return (
    <div className="post-container">
      <h3>{postData.title}</h3>
      <p>{postData.description}</p>
      <div className="footer">
        <div className="reaction">
          <div className="reaction-btn">
            {postData.likes}
            <button onClick={() => _reactOnPost(true)}>
              <img src={like} alt="Like" />
            </button>
          </div>
          <div className="reaction-btn">
            {postData.dislikes}
            <button onClick={() => _reactOnPost(false)}>
              <img src={dislike} alt="Disike" />
            </button>
          </div>
        </div>
        <div className="address-time">
          <div className="address-bar">{_shortenAddress}</div>
          <p className="time">{postData.postTime}</p>
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
