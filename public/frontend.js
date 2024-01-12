const optionsForButtons = {
  create: function () {
    const rules = document.createElement("div");
    rules.innerHTML = `<h2>Вы админ. Выберите действие</h2>
    <button>Изменить</button>
    <button>Добавить</button>`;
    return rules;
  },
  edit: (function () {
    const rules = document.createElement("div");
    rules.setAttribute("class", `moderButtons`);
    rules.innerHTML = `<h2>Вы модер. Выберите действие</h2>
    <button>Изменить</button>`;
    return rules;
  })(),
  read: (function () {
    const rules = document.createElement("div");
    rules.innerHTML = "<h2>Вы обычный юзер. Читайте наши посты!</h2>";
    return rules;
  })(),
};
let test = document.getElementById("container");
fetch("http://localhost:3000/posts")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.forEach((item) => {
      const div = document.createElement("div");
      div.setAttribute("class", "posts");
      div.innerHTML = `<h2>${item.title}</h2>
                        <p>${item.text}</p>`;
      test.appendChild(div);
    });
    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((data2) => {
        const div2 = document.querySelectorAll(".posts");
        const buttons = optionsForButtons[data2];
        for (let i = 0; i < div2.length; i++) {
          div2[i].appendChild(buttons());
        }
      });
  });
