import { createPost } from "./createPost.js";
export function renderAllPosts(postShown) {
  postShown.forEach((item) => {
    createPost(item);
  });
  setInterval(() => {
    postShown.forEach((item) => {
      createPost(item);
    });
    const newPostNotification = document.querySelector(".newPostNotification");
    newPostNotification.style.display = "block";
    setTimeout(() => {
      newPostNotification.style.display = "none";
    }, 2000);
  }, 60000);
  return postShown;
}
