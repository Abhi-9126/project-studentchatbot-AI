import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import "../App.css";

const categories = {
  Java: [
    "Explain OOP concepts in Java with examples",
    "What is the difference between == and equals() in Java?",
    "Explain inheritance in Java with an example",
    "Explain method overloading and method overriding",
    "What is the difference between ArrayList and LinkedList?",
    "Interface vs abstract class in Java",
    "Explain exception handling in Java",
    "What is multithreading in Java?",
    "Explain Java Streams with examples",
    "What are JVM, JRE and JDK?",
  ],

  React: [
    "What is React and why is it used?",
    "Explain components, props and state in React",
    "Explain useState with an example",
    "Explain useEffect with an example",
    "How do I call an API in React?",
    "Explain React Router",
    "What is the difference between props and state?",
    "How can I optimize a React application?",
    "Explain controlled and uncontrolled components",
    "How does React re-render a component?",
  ],

  JavaScript: [
    "Explain var, let and const",
    "What is a closure in JavaScript?",
    "Explain promises and async/await",
    "Explain the JavaScript event loop",
    "What are callbacks?",
    "Explain map, filter and reduce",
    "What is the difference between == and ===?",
    "Explain hoisting in JavaScript",
    "What is destructuring?",
    "Explain localStorage and sessionStorage",
  ],

  Web: [
    "What is semantic HTML?",
    "Explain HTML forms",
    "What are HTML5 features?",
    "Difference between div and section",
    "Explain different HTML input types",
    "Explain CSS Flexbox",
    "Explain CSS Grid",
    "How do I make a website responsive?",
    "Explain CSS specificity",
    "What are media queries?",
  ],

  SQL: [
    "What is a primary key?",
    "What is a foreign key?",
    "Explain SQL joins with examples",
    "GROUP BY vs HAVING",
    "DELETE vs DROP vs TRUNCATE",
    "What is database normalization?",
    "Explain SQL subqueries",
    "What are database indexes?",
    "Explain ACID properties",
    "Write a query to find the second highest salary",
  ],

  "Spring Boot": [
    "What is Spring Boot?",
    "Explain dependency injection",
    "Explain @RestController",
    "Explain @Service and @Repository",
    "How do I create a REST API in Spring Boot?",
    "Explain GET POST PUT PATCH and DELETE",
    "How do I connect Spring Boot with MySQL?",
    "What are JPA and Hibernate?",
    "Explain JpaRepository",
    "How do I handle exceptions in Spring Boot?",
  ],

  DSA: [
    "What is Big O notation?",
    "Explain arrays and linked lists",
    "Explain stack and queue",
    "Explain binary search",
    "Explain sorting algorithms",
    "Explain recursion with an example",
    "What is a binary tree?",
    "Explain graphs in DSA",
    "What is dynamic programming?",
    "Give me a DSA coding problem with solution",
  ],

  Debugging: [
    "How do I debug a NullPointerException in Java?",
    "My React component is not rendering. How can I debug it?",
    "How do I debug a JavaScript error?",
    "My API call is failing. How do I debug it?",
    "What is a CORS error?",
    "How do I debug an SQL query?",
    "How can I find errors in my code?",
    "Analyze this code and find the error",
  ],

  Interview: [
    "Give me Java interview questions with answers",
    "Give me React interview questions with answers",
    "Give me JavaScript interview questions with answers",
    "Give me SQL interview questions with answers",
    "Give me Spring Boot interview questions with answers",
    "Give me DSA interview questions",
    "Conduct a mock Java interview",
    "Conduct a mock React interview",
    "Give me coding interview questions with solutions",
    "Give me full stack developer interview questions",
  ],
};

function Chatbot() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("Java");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hello Abhishek! 👋\n\n" +
        "I am your **Student AI Assistant**. " +
        "You can ask me any programming, coding, debugging, SQL, DSA or interview question.",
    },
  ]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================================================
  // SEND MESSAGE
  // =========================================================

  const sendMessage = async (question = message) => {
    const userQuestion = question.trim();

    if (!userQuestion || loading) {
      return;
    }

    // =======================================================
    // GET GEMINI API KEY
    // =======================================================

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: "user",
          text: userQuestion,
        },
        {
          sender: "bot",
          text:
            "❌ **Gemini API key is missing.**\n\n" +
            "Please check your `.env` file:\n\n" +
            "```env\n" +
            "VITE_GEMINI_API_KEY=your_key_here\n" +
            "```\n\n" +
            "Then restart the Vite server.",
        },
      ]);

      setMessage("");
      return;
    }

    // =======================================================
    // CREATE USER MESSAGE
    // =======================================================

    const userMessage = {
      sender: "user",
      text: userQuestion,
    };

    // Add user message to UI
    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setMessage("");
    setLoading(true);

    try {
      // =====================================================
      // CREATE GEMINI CLIENT
      // =====================================================

      const ai = new GoogleGenAI({
        apiKey: apiKey,
      });

      // =====================================================
      // BUILD CONVERSATION HISTORY
      // =====================================================

      const conversation = [...messages, userMessage]
        .map((msg) => {
          const role =
            msg.sender === "user"
              ? "Student"
              : "Student AI Assistant";

          return `${role}: ${msg.text}`;
        })
        .join("\n\n");

      // =====================================================
      // AI PROMPT
      // =====================================================

      const prompt = `
You are "Student AI Assistant", an expert programming tutor.

You are helping a college student learn software development.

Your main areas are:

- Java
- JavaScript
- React
- HTML
- CSS
- SQL
- Spring Boot
- REST APIs
- MySQL
- MongoDB
- DSA
- Git
- GitHub
- Debugging
- Full Stack Development
- Software Engineering
- Technical Interviews

IMPORTANT RULES:

1. Give accurate answers.

2. Explain concepts in simple student-friendly language.

3. When the student asks for code, provide working code.

4. Always use proper Markdown code blocks for code.

5. Explain important parts of the code.

6. When debugging:
   - Identify the error.
   - Explain why it happens.
   - Show corrected code.
   - Explain the correction.

7. For Java:
   - Use correct Java syntax.
   - Provide practical examples.
   - Explain OOP concepts clearly.
   - Include real-world examples when useful.

8. For React:
   - Prefer modern functional components.
   - Use React hooks where appropriate.
   - Provide complete examples when useful.

9. For JavaScript:
   - Explain concepts with practical examples.

10. For SQL:
    - Provide the correct SQL query.
    - Explain the query.
    - Mention assumptions if required.

11. For DSA:
    - Explain the approach.
    - Give algorithm steps.
    - Provide code when appropriate.
    - Give time complexity.
    - Give space complexity.

12. For interview questions:
    - Give an interview-ready answer.
    - Give a simple explanation.
    - Give an example when useful.

13. If comparing concepts:
    - Use a Markdown table when appropriate.

14. If the user asks for steps:
    - Use numbered steps.

15. If the user gives code:
    - Analyze the actual code.
    - Do not give only a generic answer.

16. Do not invent methods, APIs or syntax.

17. If the question is unclear:
    - Ask a short clarification question.

18. Keep answers focused but sufficiently detailed for a student.

19. Use headings for long answers.

20. Use bullet points where they improve readability.

Previous conversation:

${conversation}

Now answer the student's latest question.
`;

      // =====================================================
      // GEMINI MODELS
      // =====================================================

      /*
       * If one model returns a temporary 503 error,
       * the application retries and then tries another model.
       */

      const models = [
        "gemini-3.5-flash-lite",
        "gemini-3.1-flash-lite",
        "gemini-3.7-flash",
        "gemini-3.8-flash",
      ];

      let response = null;
      let lastError = null;
      let successfulModel = null;

      // =====================================================
      // TRY EACH MODEL
      // =====================================================

      for (const model of models) {
        let retryDelay = 1000;

        // Retry each model up to 3 times
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            console.log(
              `Trying Gemini model: ${model}`
            );

            console.log(
              `Attempt: ${attempt}/3`
            );

            // =============================================
            // GEMINI REQUEST
            // =============================================

            const result = await ai.models.generateContent({
              model: model,
              contents: prompt,
            });

            // =============================================
            // CHECK RESPONSE
            // =============================================

            if (result?.text) {
              response = result;
              successfulModel = model;

              console.log(
                `SUCCESS: Gemini response received`
              );

              console.log(
                `Successful model: ${model}`
              );

              break;
            }

          } catch (error) {
            console.warn(
              `Gemini error from ${model}:`,
              error
            );

            lastError = error;

            const status =
              error?.status ||
              error?.error?.code ||
              "";

            const errorText = String(
              error?.message ||
              error?.error?.message ||
              ""
            ).toLowerCase();

            // =============================================
            // CHECK TEMPORARY ERROR
            // =============================================

            const isTemporaryError =
              status === 503 ||
              String(status) === "503" ||
              errorText.includes("503") ||
              errorText.includes("unavailable") ||
              errorText.includes("high demand") ||
              errorText.includes("temporarily");

            // =============================================
            // RETRY TEMPORARY ERROR
            // =============================================

            if (isTemporaryError) {

              if (attempt < 3) {

                console.log(
                  `Waiting ${retryDelay}ms before retry...`
                );

                await new Promise((resolve) =>
                  setTimeout(resolve, retryDelay)
                );

                retryDelay = retryDelay * 2;

                continue;
              }

              // =========================================
              // TRY NEXT MODEL
              // =========================================

              console.log(
                `${model} failed after 3 attempts.`
              );

              console.log(
                "Trying next Gemini model..."
              );

              break;
            }

            // =============================================
            // OTHER ERRORS
            // =============================================

            throw error;
          }
        }

        // =================================================
        // STOP IF SUCCESSFUL
        // =================================================

        if (response?.text) {
          break;
        }
      }

      // =====================================================
      // IF NO MODEL WORKED
      // =====================================================

      if (!response?.text) {
        throw (
          lastError ||
          new Error(
            "No Gemini model returned a response."
          )
        );
      }

      console.log(
        `Final successful model: ${successfulModel}`
      );

      // =====================================================
      // GET AI ANSWER
      // =====================================================

      const aiAnswer =
        response.text ||
        "Sorry, Gemini did not return an answer.";

      // =====================================================
      // CREATE BOT MESSAGE
      // =====================================================

      const botMessage = {
        sender: "bot",
        text: aiAnswer,
      };

      // =====================================================
      // ADD BOT MESSAGE
      // =====================================================

      setMessages((previousMessages) => [
        ...previousMessages,
        botMessage,
      ]);

    } catch (error) {

      // =====================================================
      // ERROR LOGGING
      // =====================================================

      console.error(
        "========== GEMINI ERROR =========="
      );

      console.error("Full error:", error);

      console.error(
        "Message:",
        error?.message
      );

      console.error(
        "Status:",
        error?.status
      );

      console.error(
        "Error object:",
        error?.error
      );

      console.error(
        "==================================="
      );

      // =====================================================
      // DEFAULT ERROR MESSAGE
      // =====================================================

      let errorMessage =
        "❌ **Gemini could not generate a response.**";

      const actualError =
        error?.message ||
        error?.error?.message ||
        "";

      const lowerError =
        actualError.toLowerCase();

      // =====================================================
      // API KEY ERROR
      // =====================================================

      if (
        lowerError.includes("api key") ||
        lowerError.includes("invalid") ||
        lowerError.includes("401") ||
        lowerError.includes("403")
      ) {
        errorMessage =
          "❌ **Gemini API key error.**\n\n" +
          "Please check your `VITE_GEMINI_API_KEY` in `.env` and restart the Vite server.";
      }

      // =====================================================
      // FREE TIER / QUOTA ERROR
      // =====================================================

      else if (
        lowerError.includes("429") ||
        lowerError.includes("quota") ||
        lowerError.includes("resource_exhausted") ||
        lowerError.includes("rate limit")
      ) {
        errorMessage =
          "⚠️ **Gemini free-tier limit reached.**\n\n" +
          "Please wait for the limit to reset and try again later.";
      }

      // =====================================================
      // MODEL NOT FOUND
      // =====================================================

      else if (
        lowerError.includes("model") &&
        lowerError.includes("not found")
      ) {
        errorMessage =
          "❌ **Gemini model is not available.**\n\n" +
          "The configured models are not available for this API key.";
      }

      // =====================================================
      // PERMISSION ERROR
      // =====================================================

      else if (
        lowerError.includes("permission")
      ) {
        errorMessage =
          "❌ **Permission error.**\n\n" +
          "Your Gemini API key does not have permission to use this model.";
      }

      // =====================================================
      // 503 / HIGH DEMAND
      // =====================================================

      else if (
        lowerError.includes("503") ||
        lowerError.includes("unavailable") ||
        lowerError.includes("high demand") ||
        lowerError.includes("temporarily")
      ) {
        errorMessage =
          "⚠️ **Gemini is temporarily busy.**\n\n" +
          "I tried multiple Gemini models and retried the requests, but they are currently unavailable.\n\n" +
          "Please wait a little and try again.";
      }

      // =====================================================
      // TECHNICAL DETAILS
      // =====================================================

      if (actualError) {
        errorMessage +=
          "\n\n**Technical details:**\n\n" +
          "```text\n" +
          actualError +
          "\n```";
      }

      // =====================================================
      // DISPLAY ERROR
      // =====================================================

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: "bot",
          text: errorMessage,
        },
      ]);

    } finally {

      // =====================================================
      // STOP LOADING
      // =====================================================

      setLoading(false);
    }
  };

  // =========================================================
  // CLEAR CHAT
  // =========================================================

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text:
          "Chat cleared. 👋\n\n" +
          "Ask me a new programming question.",
      },
    ]);
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="chatbot-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="chat-header">

        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ←
        </button>

        <div className="bot-profile">

          <div className="bot-avatar">
            🤖
          </div>

          <div>
            <h4>
              Student AI Assistant
            </h4>

            <small>
              ● Online
            </small>
          </div>

        </div>

        <button
          className="clear-button"
          onClick={clearChat}
        >
          🗑️ Clear
        </button>

      </div>

      {/* =====================================================
          CHAT CONTAINER
      ===================================================== */}

      <div className="chat-container">

        {/* ===================================================
            MESSAGES
        =================================================== */}

        <div className="messages">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`message-row ${
                msg.sender === "user"
                  ? "user-row"
                  : "bot-row"
              }`}
            >

              {/* BOT AVATAR */}

              {msg.sender === "bot" && (
                <div className="message-avatar">
                  🤖
                </div>
              )}

              {/* MESSAGE */}

              <div className="message-bubble">

                {msg.sender === "bot" ? (

                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>

                ) : (

                  msg.text

                )}

              </div>

              {/* USER AVATAR */}

              {msg.sender === "user" && (
                <div className="message-avatar user-avatar">
                  👨‍🎓
                </div>
              )}

            </div>

          ))}

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (

            <div className="message-row bot-row">

              <div className="message-avatar">
                🤖
              </div>

              <div className="message-bubble">
                Thinking... 🤔
              </div>

            </div>

          )}

        </div>

        {/* ===================================================
            PROGRAMMING TOPICS
        =================================================== */}

        <div className="category-section">

          <h5>
            Programming Topics
          </h5>

          <div className="categories">

            {Object.keys(categories).map(
              (category) => (

                <button
                  key={category}
                  className={`category-button ${
                    selectedCategory === category
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  disabled={loading}
                >
                  {category}
                </button>

              )
            )}

          </div>

        </div>

        {/* ===================================================
            POPULAR QUESTIONS
        =================================================== */}

        <div className="question-section">

          <h5>
            Popular {selectedCategory} Questions
          </h5>

          <div className="question-list">

            {categories[selectedCategory].map(
              (question, index) => (

                <button
                  key={index}
                  className="question-button"
                  onClick={() =>
                    sendMessage(question)
                  }
                  disabled={loading}
                >
                  {question}
                </button>

              )
            )}

          </div>

        </div>

        {/* ===================================================
            INPUT
        =================================================== */}

        <div className="chat-input-area">

          <input
            type="text"
            value={message}
            placeholder="Ask any programming question..."
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();
                sendMessage();
              }

            }}
            disabled={loading}
          />

          <button
            onClick={() => sendMessage()}
            disabled={
              loading ||
              !message.trim()
            }
          >
            {loading ? "..." : "➤"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chatbot;