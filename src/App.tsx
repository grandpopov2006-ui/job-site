import React, { useState } from "react";

type Lang = "ua" | "en" | "ru";

const translations = {
  ua: {
    title: "Заповніть анкету",
    subtitle: "Найближчим часом ми з вами зв'яжемося",
    fullName: "👤 ПІБ",
    phone: "📞 Телефон",
    city: "📍 Місто проживання",
    age: "🗓️ Вік",
    about: "💬 Розкажіть про себе (не обовʼязково)",
    button: "Надіслати заявку",
  },
  
ru: {
    title: "Заполните анкету",
    subtitle: "В ближайшее время мы с вами свяжемся",
    fullName: "👤 ФИО",
    phone: "📞 Телефон",
    city: "📍 Город проживания",
    age: "🗓️ Возраст",
    about: "💬 Расскажите о себе (не обязательно)",
    button: "Отправить заявку",
  },
  
  en: {
    title: "Application Form",
    subtitle: "We’ll get in touch with you soon",
    fullName: "👤 Full name",
    phone: "📞 Phone number",
    city: "📍 City of residence",
    age: "🗓️ Age",
    about: "💬 Tell us about yourself (optional)",
    button: "Submit Application",
  },
};

const languages = [
  { code: "ua", label: "UA" },
  { code: "ru", label: "RU" },

  { code: "en", label: "EN" },
] as const;

export default function App() {
  const [lang, setLang] = useState<Lang>("ua");
  const [form, setForm] = useState({
  fullName: "",
  phone: "",
  city: "",
  age: "",
  about: "",
});
  const t = translations[lang];
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

const sendApplication = async () => {
  console.log("Кнопка нажата");
  const response = await fetch(
    "/api/applications",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }
  );

  if (response.ok) {
    alert("Заявка отправлена 🚀");
  } else {
    alert("Ошибка отправки");
  }
};
  return (
    <div style={page}>
      <div style={card}>
        <div style={languageBox}>
          {languages.map((item) => (
            <button
              key={item.code}
              onClick={() => setLang(item.code)}
              style={{
                ...langButton,
                ...(lang === item.code ? activeLangButton : {}),
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <h1 style={title}>{t.title}</h1>
        <p style={subtitle}>{t.subtitle}</p>

        <input
  name="fullName"
  value={form.fullName}
  onChange={handleChange}
  placeholder={t.fullName}
  style={input}/>
        <input
  name="phone"
  value={form.phone}
  onChange={handleChange}
  placeholder={t.phone}
  style={input}
/>
        <input
  name="city"
  value={form.city}
  onChange={handleChange}
  placeholder={t.city}
  style={input}
/>
        <input
  name="age"
  value={form.age}
  onChange={handleChange}
  placeholder={t.age}
  style={input}
/>

        <textarea
  name="about"
  value={form.about}
  onChange={handleChange}
  placeholder={t.about}
  rows={5}
  style={textarea}
/>

        <button
  onClick={sendApplication}
  style={button}
>
  {t.button}
</button>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6fb",
  padding: "22px",
  fontFamily: "Arial, sans-serif",
};

const card = {
  width: "100%",
  maxWidth: "760px",
  background: "#ffffff",
  borderRadius: "38px",
  padding: "40px",
  boxShadow: "0 20px 70px rgba(0,0,0,.12)",
};

const languageBox = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginBottom: "24px",
  flexWrap: "wrap" as const,
};

const langButton = {
  padding: "12px 18px",
  borderRadius: "18px",
  border: "1.5px solid #e5e7eb",
  background: "#fafafa",
  color: "#555",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "15px",
  minWidth: "82px",
};

const activeLangButton = {
  background: "#111827",
  color: "white",
  border: "1.5px solid #111827",
};

const title = {
  textAlign: "center" as const,
  fontSize: "46px",
  color: "#111827",
  marginBottom: "30px",
};

const subtitle = {
  textAlign: "center" as const,
  color: "#6b7280",
  marginBottom: "35px",
  fontSize: "18px",
};

const input = {
  width: "100%",
  padding: "18px 22px",
  borderRadius: "22px",
  border: "2px solid #eceef5",
  marginBottom: "18px",
  background: "#fafbff",
  color: "#222",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box" as const,
};

const textarea = {
  ...input,
  minHeight: "140px",
  resize: "none" as const,
};

const button = {
  width: "100%",
  padding: "20px",
  borderRadius: "22px",
  border: "none",
  background: "#111827",
  color: "white",
  fontWeight: "bold",
  fontSize: "18px",
  cursor: "pointer",
};