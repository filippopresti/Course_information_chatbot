// src/ChatWidget.tsx

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import "../styles/chatWidget.css"; // Ensure this CSS file exists and is correctly styled
import { GrPowerReset } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import logo from "../assets/logo.png"; // Ensure this logo image exists at the path

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export function ChatWidget({ apiUrl }: { apiUrl: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<number>(() => Date.now()); // Initial thread ID

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(0); // For unique client-side message IDs
  const textareaRef = useRef<HTMLTextAreaElement>(null); // For auto-resize

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to allow shrinking
      const maxHeight = 120; // Max height for textarea in pixels
      const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [inputText]);

  const toggleOpen = () => setOpen((o) => !o);

  const resetChat = () => {
    setMessages([]);
    setThreadId(Date.now()); // Generate a new thread ID for a fresh conversation
    setInputText("");
    if (textareaRef.current) {
      // Reset textarea height
      textareaRef.current.style.height = "auto";
    }
    // Focus the input field if the chat is open after reset
    if (open && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  };

  // Function to send a message
  const sendMessage = async () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput || isLoading) return;

    const userMsg: Message = {
      id: nextMessageId.current++,
      text: trimmedInput,
      isUser: true,
    };
    setMessages((m) => [...m, userMsg]);
    setInputText("");
    setIsLoading(true);

    // reset textarea height before sending
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const res = await fetch(`${apiUrl}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMsg.text, thread_id: threadId }),
      });
      if (!res.ok) {
        // try to parse error message
        throw new Error(`API error ${res.status}`);
      }

      // parse the response JSON
      const json = await res.json();
      if (typeof json.answer !== "string") {
        throw new Error("Invalid response format");
      }

      // pull answer out of the JSON and append it
      setMessages((m) => [
        ...m,
        { id: nextMessageId.current++, text: json.answer, isUser: false },
      ]);
    } catch (err: unknown) {
      let message = "Sorry, something went wrong.";
      if (err instanceof Error) {
        message = err.message;
      }
      setMessages((m) => [
        ...m,
        {
          id: nextMessageId.current++,
          text: message,
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  };
  // Handle Enter key to send message
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Focus input when chat opens
  useEffect(() => {
    if (open && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100); // Timeout to ensure it's rendered
    }
  }, [open]);

  // Ensure the textarea is focused when the component mounts
  return (
    <div className={`chat-widget ${open ? "open" : "closed"}`}>
      {/* launcher bubble */}
      <button
        className="launcher"
        onClick={toggleOpen}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          "💬"
        )}
      </button>

      {/* chat container */}
      {open && (
        <div className="chat-container" role="log" aria-live="polite">
          <header className="chat-header">
            <img className="cci-logo" src={logo} alt="CCI-Bot Logo" />
            <h1>Ask CCI-Bot</h1>
            <button
              className="reset-button"
              onClick={resetChat}
              aria-label="Reset chat session and start a new conversation"
            >
              <GrPowerReset size={18} />
            </button>
          </header>

          <div className="messages-container">
            {/* Display messages */}
            {messages.length === 0 && !isLoading ? (
              <div className="empty-state">
                <p>Start your conversation with CCI-Bot</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${
                    msg.isUser ? "user-message" : "ai-message"
                  }`}
                >
                  <div className="message-content">{msg.text}</div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="message ai-message">
                <div className="message-content loading">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}

          <div className="input-container">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message…"
              aria-label="Chat input, press Enter to send"
              disabled={isLoading}
              rows={1}
            />
            {/* send button */}
            <button
              className="send-button"
              onClick={sendMessage}
              disabled={!inputText.trim() || isLoading}
              aria-label="Send message"
            >
              <IoMdSend size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
