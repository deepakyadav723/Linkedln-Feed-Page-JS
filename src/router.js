const navs = document.querySelectorAll(".rightDivs");

const routes = {
  "/": {
    content: ""
  },
  "/mynetwork": {
    content: "My Network page",
  },
  "/jobs": {
    content: `Jobs page`,
  },
  "/messages": {
    content: `Messaging page`,
  },
  "/notification": {
    content: `Notification page`,
  },
};

const renderContent = (route) => {
  navs.forEach(nav => {
    nav.classList.remove('textDecorator');
  })
  const className = route.slice(1);
  document.querySelector(".routeContainer").innerHTML = routes[route].content;
  if (route !== "/") {
    document.querySelector(`.${className}`).classList.add('textDecorator');
    document.querySelector(".container").style.display = "none";
  } else {
    document.querySelector('.home').classList.add('textDecorator');
    document.querySelector(".container").style.display = "flex";
  }
};

const registerNavLinks = () => {
  navs.forEach((nav) => {
    nav.addEventListener("click", (e) => {
      e.preventDefault();
      const targetEelement = e.target.tagName;
      let route;
      if (targetEelement === "IMG") {
        route = e.target.parentElement.parentElement.pathname;
      } else {
        route = e.target.parentElement.pathname;
      }
      window.history.pushState({}, "", route);
      renderContent(route);
    });
  });
};

const registerBrowserBackAndForth = () => {
  window.onpopstate = function (e) {
    e.preventDefault();
    const route = window.location.pathname;
    // console.log(route);
    renderContent(route);
  };
};

export function handleRouter() {
  registerNavLinks();
  registerBrowserBackAndForth();
}

