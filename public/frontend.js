let test = document.getElementById("container");
fetch("http://localhost:3000/posts")
  .then((response) => response.json())
  .then((data) => {
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
        const div2 = document.getElementsByClassName("posts");
        for (let i = 0; i < div2.length; i++) {
          const rules = document.createElement("div");
          if (data2 == "administrator") {
            rules.innerHTML = `<h2>Вы админ. Выберите действие</h2>
                              <button>Изменить</button>
                              <button>Добавить</button>`;
          } else if (data2 == "moderator") {
            rules.innerHTML = `<h2>Вы модер. Выберите действие</h2>
                              <button>Изменить</button>`;
          } else {
            rules.innerHTML = "<h2>Вы обычный юзер. Читайте наши посты!</h2>";
            div2[i].appendChild(rules);
            break;
          }
          div2[i].appendChild(rules);
        }
      });
  });
