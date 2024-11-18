const form = document.querySelector("#bookingForm");

// Добавляем обработчик события на отправку формы
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Получаем данные из формы
  const date = document.querySelector("#date").value;
  const time = document.querySelector("#time").value;
  const guests = document.querySelector("#guests").value;

  const message = `Детали бронирования:\nДата: ${date}\nВремя: ${time}\nГости: ${guests}`;
  const botToken = "8029396925:AAGs5xNwPBe6awGpdktEsqe14j2EhngO9P8";
  const chatId = "5450770011";

  // Отправляем запрос на сервер для отправки сообщение в телеграмм
  fetch("http://localhost:3000/sendMessage", {
    method: "POST", // Метод для отправки данных
    headers: {
      "Content-Type": "application/json", // Отправляем в формате Json
    },
    body: JSON.stringify({
      token: botToken,
      chatId: chatId,
      message: message,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Если ответ успешный, выводим сообщение об успешной отправке
      if (data.ok) {
        alert("Бронирование успешно отправлено!");
        form.reset();
      } else {
        // Если произошла ошибка, выводим сообщение об ошибке
        alert("Ошибка при отправке бронирования.");
      }
    })
    .catch((error) => {
      // Выводим ошибку в консоль если она возникла
      console.error("Ошибка:", error);
    });
});
