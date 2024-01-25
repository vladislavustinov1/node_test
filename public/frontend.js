const optionsForButtons = {
  create() {
    const rules = document.createElement("div");
    rules.innerHTML = `<h2>Выберите действие</h2>
    <button>Изменить</button>
    <button>Добавить</button>`;
    return rules;
  },
  edit() {
    const rules = document.createElement("div");
    rules.setAttribute("class", `moderButtons`);
    rules.innerHTML = `<h2>Выберите действие</h2>
    <button>Изменить</button>`;
    return rules;
  },
  read() {
    const rules = document.createElement("div");
    rules.innerHTML = "<h2>Вы обычный юзер. Читайте наши посты!</h2>";
    return rules;
  },
};
const API_POSTS = "http://localhost:3000/posts";
const API_USERS = "http://localhost:3000/user";
const test = document.getElementById("container");
Promise.all([
  fetch(API_POSTS).then((response) => response.json()),
  fetch("http://localhost:3000/user").then((response) => response.json()),
])
  .then(([postAllData, userPermission]) => {
    postAllData.forEach((item) => {
      const wrapperForPosts = document.createElement("div");
      wrapperForPosts.setAttribute("class", "posts");
      wrapperForPosts.innerHTML = `<h2>${item.title}</h2>
                        <p>${item.text}</p>`;
      test.appendChild(wrapperForPosts);
    });
    console.log(userPermission);
    let getPermission = userPermission.split(", ").sort();
    const MIN_SIZE_PERMISSIONS_FOR_DELETE = 1;
    if (getPermission.length > MIN_SIZE_PERMISSIONS_FOR_DELETE) {
      for (let countRole = 0; countRole < getPermission.length; countRole++) {
        getPermission.pop();
      }
    }
    getPermission = getPermission.join("");

    const wrapperForButtons = document.querySelectorAll(".posts");
    const buttons = optionsForButtons[getPermission];
    for (
      let numberOfPosts = 0;
      numberOfPosts < wrapperForButtons.length;
      numberOfPosts++
    ) {
      wrapperForButtons[numberOfPosts].appendChild(buttons());
    }
  })
  .catch((error) => {
    console.error(error);
  });
