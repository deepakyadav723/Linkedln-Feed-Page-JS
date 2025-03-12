import { renderAllPosts } from "./index.js";
import { handleScroll } from "./scroll.js";
const postSection = document.getElementsByClassName("posts")[0];
const filterOption = document.querySelector(".filterOption");
const selectDates = document.querySelector(".selectDates");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const startDateError = document.getElementsByClassName("startDateError")[0];
const endDateError = document.getElementsByClassName("endDateError")[0];
const sortOption = document.querySelector(".sortOption");
const calenderIcon = document.querySelector(".calenderIcon");

startDate.max = new Date().toISOString().split("T")[0];
endDate.max = new Date().toISOString().split("T")[0];

export function handleFilterApply(filteredPosts) {
  if (startDate.value === "") {
    startDateError.style.display = "block";
  } else if (endDate.value === "") {
    endDateError.style.display = "block";
  } else {
    startDateError.style.display = "none";
    endDateError.style.display = "none";
    const postShown = filteredPosts.filter((item) => {
      const itemDateString = item.date;
      const [day1, month1, year1] = itemDateString.split("/").map(Number);
      const itemDate = new Date(year1, month1 - 1, day1);

      const [year2, month2, day2] = startDate.value.split("-").map(Number);
      const StartDate = new Date(year2, month2 - 1, day2);

      const [year3, month3, day3] = endDate.value.split("-").map(Number);
      const EndDate = new Date(year3, month3 - 1, day3);

      return itemDate >= StartDate && itemDate <= EndDate;
    });
    selectDates.style.display = "none";
    postSection.innerHTML = "";
    sortOption.value = "";
    renderAllPosts(postShown, 0);
  }
}

export function handleFilterReset(filteredPosts) {
  startDate.value = "";
  endDate.value = "";
  postSection.innerHTML = "";
  sortOption.value = "";
  startDateError.style.display = "none";
  endDateError.style.display = "none";
  selectDates.style.display = "none";
  renderAllPosts(filteredPosts, 0);
  if (document.getElementById("searchInput").value === "") handleScroll();
}

export function handleFilterListeners() {
  filterOption.addEventListener("click", () => {
    const currentDisplay = selectDates.style.display;
    if (currentDisplay === "flex") {
      selectDates.style.display = "none";
    } else {
      selectDates.style.display = "flex";
    }
    startDateError.style.display = "none";
    endDateError.style.display = "none";
  });

  startDate.addEventListener("focus", () => {
    startDateError.style.display = "none";
  });

  endDate.addEventListener("focus", () => {
    endDateError.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (
      event.target != filterOption &&
      event.target != calenderIcon &&
      event.target != selectDates &&
      event.target.parentElement != selectDates &&
      event.target.parentElement.parentElement != selectDates
    )
      selectDates.style.display = "none";
  });
}
