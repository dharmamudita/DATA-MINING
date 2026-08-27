"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
    setHasUnread(false);
  };

  const formatMessageText = (text: string) => {
    return text.split("\n").map((line, idx) => {
      let formatted = line;

      // Format bold markdown **text**
      const parts = formatted.split(/(\*\*.*?\*\*)/g);
      const elements = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.startsWith("- ") || line.startsWith("• ")) {
        return (
          <div key={idx} className={styles.bulletItem}>
            <span className={styles.bulletDot}>&bull;</span>
            <span className={styles.bulletText}>{elements}</span>
          </div>
        );
      }

      if (line.match(/^\d+\.\s/)) {
        return (
          <div key={idx} className={styles.numberedItem}>
            <span className={styles.numberedText}>{elements}</span>
          </div>
        );
      }

      return (
        <p key={idx} className={styles.messageParagraph}>
          {elements}
        </p>
      );
    });
  };

  if (!mounted) return null;

  const content = (
    <div className={styles.chatContainer}>
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.headerAvatar}>
                <HeartPulseIcon size={18} color="#FFFFFF" />
              </div>
              <div className={styles.headerInfo}>
                <h4 className={styles.headerTitle}>HeartGuard AI Chat</h4>
                <div className={styles.headerStatus}>
                  <span className={styles.statusDot} />
                  <span>Online &bull; Asisten Medis</span>
                </div>
              </div>
            </div>

            <div className={styles.headerActions}>
              <button
                className={styles.headerBtn}
                onClick={handleReset}
                title="Reset Percakapan"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
              </button>
              <button
                className={styles.headerBtn}
                onClick={() => setIsOpen(false)}
                title="Tutup Chat"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className={styles.chatBody}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageWrapper} ${
                  msg.role === "user" ? styles.messageUser : styles.messageModel
                }`}
              >
                {msg.role === "model" && (
                  <div className={styles.modelAvatar}>
                    <HeartPulseIcon size={14} color="#FFFFFF" />
                  </div>
                )}
                <div className={styles.messageBubble}>
                  {formatMessageText(msg.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className={`${styles.messageWrapper} ${styles.messageModel}`}>
                <div className={styles.modelAvatar}>
                  <HeartPulseIcon size={14} color="#FFFFFF" />
                </div>
                <div className={`${styles.messageBubble} ${styles.typingBubble}`}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className={styles.suggestionsTrack}>
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                className={styles.suggestionChip}
                onClick={() => handleSend(prompt)}
                disabled={loading}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            className={styles.inputForm}
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

  return createPortal(content, document.body);
}
