import { data } from "./data.js";
import { createPost } from "./createPost.js";
import { handleSearch } from "./search.js";
import { handleSort } from "./sort.js";
import { handleFilterApply, handleFilterReset, handleFilterListeners } from "./filter.js";
import { handleScroll } from "./scroll.js";
import { createNewPost } from "./createNewPost.js";
import { handleRouter } from "./router.js";

let allPosts = data;
let currentPosts = [];
let filteredPosts = [];

export function renderAllPosts(postShown, updateFilterPost = 1) {
  if (updateFilterPost) filteredPosts = [];
  currentPosts = [];
  postShown.forEach((item) => {
    if (updateFilterPost) filteredPosts.push(item);
    currentPosts.push(item);
    createPost(item);
  });
  // setInterval(() => {
  //     currentPosts.forEach(item => {
  //         createPost(item);
  //     });
  //     const newPostNotification = document.querySelector(".newPostNotification");
  //     newPostNotification.style.display = "block";
  //     setTimeout(() => {
  //         newPostNotification.style.display = "none";
  //     }, 2000);
  // }, 60000);
}
renderAllPosts(allPosts);

export function renderNewPosts(newPosts) {
  newPosts.forEach((item) => {
    allPosts.push(item);
    currentPosts.push(item);
    filteredPosts.push(item);
    createPost(item);
  });
}

// -------------------------- Search -------------------------
handleSearch(allPosts);

// -------------------------- Filter -------------------------
const filterApplyButton = document.getElementById("applyButton");
filterApplyButton.addEventListener("click", () => {
  handleFilterApply(filteredPosts);
});

const filterResetButton = document.getElementById("resetButton");
filterResetButton.addEventListener("click", () => {
  handleFilterReset(filteredPosts);
});
handleFilterListeners();

// -------------------------- Sort ---------------------------
const sortOption = document.querySelector(".sortOption");
sortOption.addEventListener("change", (event) => {
  const selectedOrder = event.target.value;
  if (selectedOrder === ""){
    if(document.getElementById("searchInput").value === '' && document.getElementById("startDate").value === '') handleScroll();
    return;
  }
  handleSort(selectedOrder, currentPosts);
});

// ------------------ Scroll -------------------
handleScroll();

// ------------------ New Post -----------------
createNewPost();

// ------------------ Router -------------------
handleRouter();

// ---------------Show more and less profile info -------------
const profileInfo = document.querySelector(".profileInfo");
const showMore = document.querySelector(".showMore");
const showLess = document.querySelector(".showLess");

showMore.addEventListener("click", () => {
  profileInfo.style.display = "block";
  showLess.style.display = "flex";
  showMore.style.display = "none";
});

showLess.addEventListener("click", () => {
  profileInfo.style.display = "none";
  showLess.style.display = "none";
  showMore.style.display = "flex";
});

window.addEventListener("resize", () => {
  // console.log(window.innerWidth);
  const mediaQuery = window.matchMedia("(min-width: 769px)");
  if (mediaQuery.matches) {
    profileInfo.style.display = "block";
    showLess.style.display = "none";
    showMore.style.display = "none";
  } else {
    profileInfo.style.display = "none";
    showLess.style.display = "none";
    showMore.style.display = "flex";
  }
});
