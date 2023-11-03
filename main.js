const images = document.querySelectorAll(".img");
const searchField = document.querySelector(".search");
const links = document.querySelectorAll(".link");
const texts = document.querySelectorAll(".text");

let query = "mouse";

const getImages = async () => {
  const randomNumber = Math.floor(Math.random() * 10);
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${randomNumber}&query=${query}&client_id=sEdEe585ptki6l7S0kMT0TtN847HqI1vuOORsKnZc-Q`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    searchField.value = "";
    searchField.setAttribute("placeholder", "Please try again later");
  }
};

const setPage = async () => {
  const imageData = await getImages();
  const imageArray = imageData.map((el) => el.urls.regular);
  console.log(imageArray);
  for (let i = 0; i < images.length; i++) {
    if (!imageArray[i]) {
      images[i].src = "assets/svg/sad-face.svg";
      images[i].alt = "Sorry, nothing found";
      links[i].href = "assets/svg/sad-face.svg";
      texts.forEach((text) => text.classList.remove("hide"));
    } else {
      images[i].src = imageArray[i];
      images[i].alt = query;
      images[i].title = "Click to open in a new tab";
      links[i].href = images[i].src;
      links[i].target = "_blank";
      texts.forEach((text) => text.classList.add("hide"));
    }
  }
};

searchField.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    query = searchField.value;
    setPage();
  }
});

window.addEventListener("DOMContentLoaded", setPage);
