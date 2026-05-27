import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend работает");
});

app.post("/api/applications", async (req, res) => {
  console.log("Заявка пришла:", req.body);

  try {
    const { fullName, phone, city, age, about } = req.body;

    const message = `
📝 Новая заявка

👤 ФИО: ${fullName}
📞 Телефон: ${phone}
📍 Город: ${city}
🗓️ Возраст: ${age}
💬 О себе: ${about || "Не указано"}
`;

    const tgResponse = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text: message,
        }),
      }
    );

    const data = await tgResponse.json();
    console.log("Telegram ответ:", data);

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

app.listen(5050, () => {
  console.log("🚀 Backend работает: http://localhost:5050");
});