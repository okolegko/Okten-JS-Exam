// Доступ до піканого поля вводу та текстового, трясця його, поля для списку
const input = document.getElementById("input"),
  list = document.getElementById("list"),
  message = document.createElement("div");


// Ініціалізую такий собі масивчик для зберігання пар "Ім'я = Значення"
let pairs = [];


// Додаю повідомлення для відображення помилок
message.style.color = "red";
message.style.fontSize = "14px";
message.style.marginTop = "5px";
input.insertAdjacentElement("afterend", message);


// Додаю смішну пару "Ім'я = Значення" до списку
const add = () => {
  // Регулярний вираз для перевірки правильності формату "Ім'я = Значення"
  const nameValuePattern = /^[a-zA-Z0-9]+\s*=\s*[a-zA-Z0-9]+$/;

  // Отримую значення з поля вводу, обрізаю зайві пробіли
  const inputValue = input.value.trim();

  // Якщо формат невірний, виводжу повідомлення
  if (!nameValuePattern.test(inputValue)) {
    message.textContent = "Invalid format. Use Name=Value.";
    return;
  }

  // Розділяю рядок на "ім'я" та "значення", очищаю пробіли
  const [name, value] = inputValue.split("=").map((e) => e.trim());


  // Додаю пару у масив
  pairs.push({ name, value });
  // Очищаю поле вводу
  input.value = "";
  message.textContent = "";
  // Тут і їжачку зрозуміло
  update();
};

// Апдейт текстового поля, щоб відобразити список пар
const update = () => list.value = pairs.map(p => `${p.name}=${p.value}`).join("\n");

// Сортую список за ключем (name або value)
const sort = (key) => {
  // Сортую масив за вказаним ключем
  pairs.sort((a, b) => a[key].localeCompare(b[key], undefined, { sensitivity: "base" }));
  // Знову розумний їжачок
  update();
};

// Видаляю вибрані елементи зі списку
const del = () => {
  // Розбиваємо вміст текстового поля на окремі рядки
  const selected = list.value.split("\n");
  // Залиишаю тільки елементи, які не вибрані і оновлюю список
  pairs = pairs.filter(p => !selected.includes(`${p.name}=${p.value}`));
  update();
};
