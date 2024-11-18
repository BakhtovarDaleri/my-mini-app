import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import cors from "cors"; // Импортируем CORS

const app = express();
const PORT = 3000;

// Используем CORS middleware
app.use(cors()); // Это позволит всем клиентам обращаться к вашему серверу

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Route для отправки сообщений в Telegram
app.post("/sendMessage", async (req, res) => {
  const { token, chatId, message } = req.body;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ error: "Failed to send message" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
