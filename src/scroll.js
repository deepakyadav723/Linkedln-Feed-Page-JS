import { newPosts } from './newPosts.js';
import { renderNewPosts } from './index.js';


export function handleScroll() {
  const lastPost = document.querySelector(".posts").lastChild;
  // console.log(lastPost);

  const Observer = new IntersectionObserver((entries) => {
      // console.log(entries);
      const entry = entries[0];
      if (entry.isIntersecting) {
        // console.log("New Posts");
        renderNewPosts(newPosts);
        Observer.unobserve(entry.target);
        const newPostNotification = document.querySelector(
          ".newPostNotification"
        );
        newPostNotification.style.display = "block";
        setTimeout(() => {
          newPostNotification.style.display = "none";
        }, 2000);
        const newLastPost = document.querySelector(".posts").lastChild;
        Observer.observe(newLastPost);
      }
    },
    {
      threshold: 0.2,
    }
  );

  Observer.observe(lastPost);
}
