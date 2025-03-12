const postSection = document.getElementsByClassName("posts")[0];
const searchInput = document.getElementById("searchInput");
const dropDownList = document.getElementsByClassName("dropDownList")[0];
const sortOption = document.querySelector(".sortOption");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
import { renderAllPosts } from "./index.js";
import { handleScroll } from "./scroll.js";

function debounce(fun, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fun.apply(this, args);
    }, delay);
  };
}

export function handleSearch(data) {
  searchInput.addEventListener("input", (event) => {
    // console.log(data);
    let query = event.target.value;
    debounceSearchHandler(query);
  });
  const debounceSearchHandler = debounce(getData, 300);

  function getData(query) {
    dropDownList.innerHTML = "";

    const searchedName = query.toLowerCase();

    // const matchedUsers = data.filter(user => {
    //     return user.name.toLowerCase().includes(searchedName);
    // });
    const matchedUsers = [
      ...new Map(
        data
          .filter((user) => {
            return user.name.toLowerCase().includes(searchedName);
          })
          .map((user) => [user.name, user.profilePic])
      ),
    ];

    if (searchedName.trim().length > 0 && matchedUsers.length > 0) {
      matchedUsers.forEach((user) => {
        const li = document.createElement("li");

        const searchedUserImg = document.createElement("img");
        Object.assign(searchedUserImg, {
          src: user[1] === "" ? "./images/Default_pfp.jpg" : user[1],
          alt: "Profile Picture",
          className: "searchedUserImg",
        });

        const searchedUserName = document.createElement("span");
        searchedUserName.innerText = user[0];
        searchedUserName.setAttribute("id", "userFound");

        li.appendChild(searchedUserImg);
        li.appendChild(searchedUserName);
        dropDownList.appendChild(li);

        const crossIcon = document.getElementById("crossIcon");

        li.addEventListener("click", () => {
          const postShown = data.filter((item) => {
            return item.name === user[0];
          });
          dropDownList.style.display = "none";
          searchInput.value = user[0];
          crossIcon.style.display = "block";
          postSection.innerHTML = "";
          sortOption.value = "";
          startDate.value = "";
          endDate.value = "";
          renderAllPosts(postShown);
        });

        crossIcon.addEventListener("click", () => {
          searchInput.value = "";
          crossIcon.style.display = "none";
          postSection.innerHTML = "";
          renderAllPosts(data);
          handleScroll();
        });
      });
      dropDownList.style.display = "block";
    } else {
      dropDownList.style.display = "none";
    }
  }
}
