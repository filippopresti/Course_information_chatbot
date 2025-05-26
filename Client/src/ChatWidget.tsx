// import { useState, useRef, useEffect } from "react";
// import "./chatWidget.css";
// import { GrPowerReset } from "react-icons/gr";
// import { IoMdSend } from "react-icons/io";
// import logo from "../public/assets/logo.png";

// interface Message {
//   id: number;
//   text: string;
//   isUser: boolean;
// }

// export function ChatWidget({ apiUrl }: { apiUrl: string }) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputText, setInputText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [threadId, setThreadId] = useState<number>(Date.now());
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setInputText(e.target.value);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const sendMessage = async () => {
//     if (inputText.trim() === "" || isLoading) return;

//     const userMessage = {
//       id: Date.now(),
//       text: inputText.trim(),
//       isUser: true,
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputText("");
//     setIsLoading(true);

//     try {
//       //   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

//       const response = await fetch(`${apiUrl}/generate`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           query: userMessage.text,
//           thread_id: threadId,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to get response");
//       }

//       const data = await response.text();

//       const aiMessage = {
//         id: Date.now(),
//         text: data,
//         isUser: false,
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error("Error:", error);

//       const errorMessage = {
//         id: Date.now(),
//         text: "Sorry, there was an error processing your request.",
//         isUser: false,
//       };

//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetChat = () => {
//     setMessages([]);
//     setThreadId(Date.now());
//   };

//   return (
//     <div className="chat-container">
//       <header className="chat-header">
//         <img className="cci-logo" src={logo} alt="CCI-Bot Logo" />
//         <h1>Ask CCI-Bot</h1>
//         <button className="reset-button" onClick={resetChat}>
//           <GrPowerReset size={18} />
//         </button>
//       </header>

//       <div className="messages-container">
//         {messages.length === 0 ? (
//           <div className="empty-state">
//             <p>Start your conversation with CCI-Bot</p>
//           </div>
//         ) : (
//           messages.map((message) => (
//             <div
//               key={message.id}
//               className={`message ${
//                 message.isUser ? "user-message" : "ai-message"
//               }`}
//             >
//               {/* <div className="message-avatar">
//                 {message.isUser ? "You" : "AI"}
//               </div> */}
//               <div className="message-content">{message.text}</div>
//             </div>
//           ))
//         )}
//         {isLoading && (
//           <div className="message ai-message">
//             <div className="message-avatar">AI</div>
//             <div className="message-content loading">
//               <span className="dot"></span>
//               <span className="dot"></span>
//               <span className="dot"></span>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="input-container">
//         <textarea
//           value={inputText}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           placeholder="Type your message..."
//           disabled={isLoading}
//           rows={1}
//         />
//         <button
//           className="send-button"
//           onClick={sendMessage}
//           disabled={inputText.trim() === "" || isLoading}
//         >
//           <IoMdSend size={26} />
//         </button>
//       </div>
//     </div>
//   );
// }

// // ChatWidget.tsx
// import { useState, useRef, useEffect } from "react";
// import "./chatWidget.css";
// import { GrPowerReset } from "react-icons/gr";
// import { IoMdSend } from "react-icons/io";
// import logo from "./assets/logo.png";

// interface Message {
//   id: number;
//   text: string;
//   isUser: boolean;
// }

// export function ChatWidget({ apiUrl }: { apiUrl: string }) {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputText, setInputText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [threadId, setThreadId] = useState<number>(Date.now());
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const toggleOpen = () => setOpen((o) => !o);

//   const resetChat = () => {
//     setMessages([]);
//     setThreadId(Date.now());
//   };

//   const sendMessage = async () => {
//     if (!inputText.trim() || isLoading) return;
//     const userMsg = { id: Date.now(), text: inputText.trim(), isUser: true };
//     setMessages((m) => [...m, userMsg]);
//     setInputText("");
//     setIsLoading(true);
//     try {
//       const res = await fetch(`${apiUrl}/generate`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: userMsg.text, thread_id: threadId }),
//       });
//       if (!res.ok) throw new Error("Network error");
//       const json = await res.json();
//       setMessages((m) => [
//         ...m,
//         { id: Date.now() + 1, text: json.answer, isUser: false },
//       ]);
//     } catch {
//       setMessages((m) => [
//         ...m,
//         {
//           id: Date.now() + 1,
//           text: "Sorry, something went wrong.",
//           isUser: false,
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div className={`chat-widget ${open ? "open" : "closed"}`}>
//       {/* launcher bubble */}
//       <button className="launcher" onClick={toggleOpen}>
//         {open ? "X" : "💬"}
//       </button>

//       {/* chat container */}
//       {open && (
//         <div className="chat-container">
//           <header className="chat-header">
//             <img className="cci-logo" src={logo} alt="CCI-Bot Logo" />
//             <h1>Ask CCI-Bot</h1>
//             <button className="reset-button" onClick={resetChat}>
//               <GrPowerReset size={18} />
//             </button>
//           </header>

//           <div className="messages-container">
//             {messages.length === 0 ? (
//               <div className="empty-state">
//                 <p>Start your conversation with CCI-Bot</p>
//               </div>
//             ) : (
//               messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`message ${
//                     msg.isUser ? "user-message" : "ai-message"
//                   }`}
//                 >
//                   <div className="message-content">{msg.text}</div>
//                 </div>
//               ))
//             )}
//             {isLoading && (
//               <div className="message ai-message">
//                 <div className="message-content loading">
//                   <span className="dot" />
//                   <span className="dot" />
//                   <span className="dot" />
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="input-container">
//             <textarea
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Type your message…"
//               disabled={isLoading}
//               rows={1}
//             />
//             <button
//               className="send-button"
//               onClick={sendMessage}
//               disabled={!inputText.trim() || isLoading}
//             >
//               <IoMdSend size={24} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import "./chatWidget.css"; // Ensure this CSS file exists and is correctly styled
import { GrPowerReset } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import logo from "./assets/logo.png"; // Ensure this logo image exists at the path

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

  //   const sendMessage = async () => {
  //     const trimmedInput = inputText.trim();
  //     if (!trimmedInput || isLoading) return;

  //     const userMsg: Message = {
  //       id: nextMessageId.current++,
  //       text: trimmedInput,
  //       isUser: true,
  //     };
  //     setMessages((m) => [...m, userMsg]);
  //     setInputText(""); // Clear input field
  //     setIsLoading(true);

  //     // Reset textarea height after sending
  //     if (textareaRef.current) {
  //       textareaRef.current.style.height = "auto";
  //     }

  //     try {
  //       const res = await fetch(`${apiUrl}/generate`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ query: userMsg.text, thread_id: threadId }),
  //       });

  //       if (!res.ok) {
  //         let errorText = `API Error: ${res.status} ${res.statusText}`;
  //         try {
  //           const errorJson = await res.json();
  //           // Try to get a more specific error message from the API response body
  //           errorText = errorJson.detail || errorJson.message || errorText;
  //         } catch (e) {
  //           // Failed to parse JSON error, stick to status text or a generic message
  //           console.error("Failed to parse error JSON from API:", e);
  //         }
  //         throw new Error(errorText);
  //       }

  //       const json = await res.json();
  //       if (typeof json.answer !== "string" || !json.answer.trim()) {
  //         throw new Error("Received an empty or invalid answer from the bot.");
  //       }
  //       setMessages((m) => [
  //         ...m,
  //         { id: nextMessageId.current++, text: json.answer, isUser: false },
  //       ]);
  //     } catch (error: any) {
  //       setMessages((m) => [
  //         ...m,
  //         {
  //           id: nextMessageId.current++,
  //           text:
  //             error.message || "Sorry, something went wrong. Please try again.",
  //           isUser: false,
  //         },
  //       ]);
  //     } finally {
  //       setIsLoading(false);
  //       // Re-focus the input field after message is sent/error
  //       setTimeout(() => textareaRef.current?.focus(), 0);
  //     }
  //   };

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

    // reset textarea height, etc...
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const res = await fetch(`${apiUrl}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMsg.text, thread_id: threadId }),
      });
      if (!res.ok) {
        // try to parse error body, etc...
        throw new Error(`API error ${res.status}`);
      }

      // **HERE** we parse JSON, not plain text:
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
                  {/* Optional: Add sender label for AI messages for clarity */}
                  {/* {!msg.isUser && <div className="message-sender">CCI-Bot</div>} */}
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

          <div className="input-container">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message…"
              aria-label="Chat input, press Enter to send"
              disabled={isLoading}
              rows={1} // Start with 1 row, JS will adjust
            />
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
