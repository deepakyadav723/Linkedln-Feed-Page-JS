const postSection = document.getElementsByClassName("posts")[0];
import { renderAllPosts } from "./index.js";

export function handleSort(selectedOrder, currentPosts) {
  currentPosts.sort((post1, post2) => {
    const dateString1 = post1.date;
    const [day1, month1, year1] = dateString1.split("/").map(Number);
    const date1 = new Date(year1, month1 - 1, day1);

    const dateString2 = post2.date;
    const [day2, month2, year2] = dateString2.split("/").map(Number);
    const date2 = new Date(year2, month2 - 1, day2);

    // console.log(date1 - date2);
    return selectedOrder === "ASC" ? date1 - date2 : date2 - date1;
  });
  // console.log(currentPosts);
  postSection.innerHTML = "";
  renderAllPosts(currentPosts, 0);
}
