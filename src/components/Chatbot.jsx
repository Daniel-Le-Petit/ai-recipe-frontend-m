import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour ! Quels ingrédients as-tu sous la main ?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();
      setMessages([...newMessages, { from: "bot", text: data.reply }]);
    } catch (e) {
      setMessages([...newMessages, { from: "bot", text: "Désolé, une erreur est survenue." }]);
    }
    setInput("");
    setLoading(false);
  };

  return (
    <div className="chatbot" style={{ maxWidth: 400, margin: "0 auto", border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
      <div className="messages" style={{ minHeight: 200, marginBottom: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === "bot" ? "left" : "right", margin: "8px 0" }}>
            <span style={{ background: msg.from === "bot" ? "#f0f0f0" : "#d1e7dd", padding: 8, borderRadius: 6, display: "inline-block" }}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <div style={{ color: '#888' }}>Le bot réfléchit...</div>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Entrez vos ingrédients..."
          style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ padding: "8px 16px" }}>
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default Chatbot; 