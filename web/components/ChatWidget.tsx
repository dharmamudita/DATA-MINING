"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatWidget.module.css";
import { HeartPulseIcon, ZapIcon } from "./Icons";

interface Message {
  id: string;
  role: "user" | "model";
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    role: "model",
    content:
      "Halo! Saya **HeartGuard AI Assistant** 🩺❤️.\n\nSaya siap membantu menjawab pertanyaan Anda seputar kesehatan kardiovaskular, tekanan darah, kolesterol, BMI, serta tips pencegahan penyakit jantung. Ada yang ingin Anda konsultasikan?",
  },
];

const SUGGESTED_PROMPTS = [
  "Berapa tensi normal?",
  "Apa pengaruh BMI ke jantung?",
  "Pola makan sehat jantung",
  "Tanda serangan jantung",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!userText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role === "model" ? "model" : "user",
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "model",
            content: data.reply,
          },
        ]);
        if (!isOpen) {
          setHasUnread(true);
        }
      } else {
        throw new Error(data.error || "Gagal mendapatkan respon.");
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          content:
            "Maaf, terjadi kendala saat menghubungi asisten AI. Silakan coba kirim ulang pertanyaan Anda.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Simple Markdown formatter for bold and bullet lists
  const renderFormattedMessage = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Bullet points
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const itemText = line.trim().substring(2);
        return (
          <div key={idx} style={{ display: "flex", gap: "0.4rem", margin: "0.2rem 0" }}>
            <span style={{ color: "#7D0404", fontWeight: 800 }}>•</span>
            <span>{parseBold(itemText)}</span>
          </div>
        );
      }
      // Numbered points (e.g. 1. 2.)
      const numMatch = line.trim().match(/^(\d+\.)\s+(.*)/);
      if (numMatch) {
        return (
          <div key={idx} style={{ display: "flex", gap: "0.4rem", margin: "0.2rem 0" }}>
            <span style={{ color: "#7D0404", fontWeight: 800 }}>{numMatch[1]}</span>
            <span>{parseBold(numMatch[2])}</span>
          </div>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} style={{ height: "0.5rem" }} />;
      }
      return <div key={idx}>{parseBold(line)}</div>;
    });
  };

  const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={styles.chatContainer}>
      {/* Chat Window Box */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.headerAvatar}>
                <HeartPulseIcon size={20} color="#FFFFFF" />
              </div>
              <div>
                <div className={styles.headerTitle}>HeartGuard AI Chat</div>
                <div className={styles.headerStatus}>
                  <span className={styles.headerStatusDot} />
                  <span>Online • Asisten Medis</span>
                </div>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button
                className={styles.headerBtn}
                onClick={() => setMessages(INITIAL_MESSAGES)}
                title="Reset Percakapan"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>
              </button>
              <button
                className={styles.headerBtn}
                onClick={() => setIsOpen(false)}
                title="Tutup Chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className={styles.chatMessages}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageRow} ${
                  msg.role === "user" ? styles.messageRowUser : styles.messageRowBot
                }`}
              >
                {msg.role === "model" && (
                  <div className={styles.botAvatarBubble}>
                    <HeartPulseIcon size={14} color="#FFFFFF" />
                  </div>
                )}
                <div
                  className={`${styles.messageBubble} ${
                    msg.role === "user" ? styles.messageBubbleUser : styles.messageBubbleBot
                  }`}
                >
                  {renderFormattedMessage(msg.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className={`${styles.messageRow} ${styles.messageRowBot}`}>
                <div className={styles.botAvatarBubble}>
                  <HeartPulseIcon size={14} color="#FFFFFF" />
                </div>
                <div className={styles.typingIndicator}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompt Chips */}
          <div className={styles.quickSuggestions}>
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                className={styles.suggestionChip}
                onClick={() => handleSend(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            className={styles.chatInputForm}
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Tanyakan seputar kesehatan jantung..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.chatInput}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className={styles.sendBtn}
              title="Kirim Pesan"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        className={styles.chatToggleBtn}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setHasUnread(false);
          }
        }}
        aria-label="Buka Asisten Chat AI"
        title="Konsultasi HeartGuard AI"
      >
        <span className={styles.pulseRing} />
        {!isOpen && hasUnread && <span className={styles.unreadBadge} />}
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
        )}
      </button>
    </div>
  );
}
