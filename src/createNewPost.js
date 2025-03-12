export function createNewPost() {
  const createPostButton = document.querySelector(".createPostButton");
  const newPostSection = document.querySelector(".newPostSection");
  const createNewPostCrossIcon = document.querySelector(
    ".createNewPostCrossIcon"
  );

  createPostButton.addEventListener("click", () => {
    newPostSection.style.display = "flex";
  });

  createNewPostCrossIcon.addEventListener("click", () => {
    newPostSection.style.display = "none";
  });
}
