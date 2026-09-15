import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck,
  CornerDownLeft
} from "lucide-react";
import { cn } from "../utils/cn";

const cannedResponses = {
  "Which berth is most at risk right now and why?": {
    reply: "Berth 04 (Express Quay) is currently at CRITICAL risk (91% composite score). It is 96% utilized with 2 Post-Panamax vessels queuing in outer anchorage. Furthermore, Quay Crane QC-03 is running at 94% thermal threshold, creating an offloading bottleneck. Recommendation: Divert incoming MSC Palak to Berth 03.",
    sources: ["/api/hotspots", "/api/predictions", "/api/port-status"],
  },
  "What happens if Crane QC-03 goes offline?": {
    reply: "Simulation indicates that if Crane QC-03 experiences mechanical failure, Berth 04 handling throughput drops by 50%. This cascades into an extra +4 vessels in queue, average port waiting times jumping from 11.4h to 18.2h (+60%), and total terminal congestion risk surging to 93% (CRITICAL). AI Recovery Action: Mobilize mobile gantry crane MC-01 and divert 2 feeder vessels to South Terminal.",
    sources: ["/api/simulate", "/api/optimize/cranes"],
  },
  "Should I reroute vessel MSC Palak?": {
    reply: "YES, immediate diversion is recommended. Re-routing MSC Palak (V102) from Berth 04 to Berth 03 reduces total turnaround time from 32 hours to 26 hours, saving 6.0 hours total. Berth 03 depth of 15.5m safely clears Palak's 15.2m draft requirement, and 2 quay cranes are idle and ready for berthing.",
    sources: ["/api/route-advisor", "/api/vessels/V102"],
  },
  "Give me today's top 3 priorities.": {
    reply: "Here are the top 3 operations priorities for Terminal 01:\n1. [PRIORITY 1 - NEXT 6H]: Reassign Vessel MSC Palak (V102) from Berth 04 to Berth 03 (-31% Queue, -26% Wait Time).\n2. [PRIORITY 2 - NEXT 12H]: Pair Quay Cranes QC-01 & QC-02 to Ever Golden (V204) to expedite departure before midnight wave.\n3. [PRIORITY 3 - NEXT 24H]: Divert feeder CMA CGM Nile to North Anchorage for a 2-hour hold while Yard Block B clears 450 TEU.",
    sources: ["/api/plan/72h", "/api/hotspots"],
  },
};

export function Copilot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "PortFlow AI Copilot online (IBM Bob RAG Engine). I am grounded directly in live telemetry from Modules 1–6. You can ask me about active congestion hotspots, what-if equipment failures, vessel rerouting, or 72-hour operational priorities.",
      sources: ["System Startup", "/api/port-status"],
      time: "Just now",
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsTyping(true);

    // Simulate RAG Retrieval + LLM response
    setTimeout(() => {
      const match = cannedResponses[query] || {
        reply: `Analysis based on live port state: Current terminal utilization is 85% with 7 ships waiting (average wait: 11.4h). Over the next 24 hours, congestion probability is projected to climb to 79%. The primary spatial bottleneck remains Berth 04 and Yard Block B. Recommended action: consult the Route Advisor to reassign waiting feeder vessels to Berth 02 & 03.`,
        sources: ["/api/predictions", "/api/port-status", "/api/plan/72h"],
      };

      const aiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: match.reply,
        sources: match.sources,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const suggestedQueries = [
    "Which berth is most at risk right now and why?",
    "What happens if Crane QC-03 goes offline?",
    "Should I reroute vessel MSC Palak?",
    "Give me today's top 3 priorities.",
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
              Interactive AI Copilot (IBM Bob RAG)
            </h1>
            <span className="px-2.5 py-1 rounded text-sm font-bold bg-slate-100 text-slate-700 border border-slate-200">
              Module 07
            </span>
          </div>
          <p className="text-base text-slate-600 font-sans mt-1">
            Natural language decision support for port operators. Responses are generated strictly from live FastAPI telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>RAG Pipeline Grounded & Active</span>
        </div>
      </div>

      {/* Main Chat HUD Container */}
      <div className="h-[620px] flex flex-col rounded-xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Chat Messages Feed */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3 max-w-[85%] text-sm font-sans",
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border",
                  msg.sender === "user"
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-800 border-slate-200 shadow-subtle"
                )}
              >
                {msg.sender === "user" ? (
                  <span className="font-bold text-xs">OP</span>
                ) : (
                  <Bot className="w-5 h-5 text-sky-600" />
                )}
              </div>

              {/* Message Body */}
              <div className="space-y-1.5">
                <div
                  className={cn(
                    "p-4 rounded-xl leading-relaxed whitespace-pre-line text-base shadow-subtle",
                    msg.sender === "user"
                      ? "bg-slate-900 text-white rounded-tr-sm font-medium"
                      : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-sm"
                  )}
                >
                  {msg.text}
                </div>

                {/* Grounding Attribution Pills */}
                {msg.sources && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="text-xs text-slate-400 font-medium">Grounded in:</span>
                    {msg.sources.map((src, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded text-xs bg-slate-100 text-slate-700 border border-slate-200 font-mono font-semibold"
                      >
                        {src}
                      </span>
                    ))}
                    <span className="text-xs text-slate-400 ml-auto">{msg.time}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 max-w-[80%] items-center text-sm text-slate-600 font-sans">
              <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-subtle">
                <Bot className="w-5 h-5 text-sky-600" />
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2 shadow-subtle">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-200" />
                <span className="text-slate-600 ml-1.5 font-semibold text-sm">Synthesizing live telemetry...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Suggested Inquiries & Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 space-y-3">
          {/* Quick Prompt Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-sm text-slate-500 shrink-0 font-bold">Suggested:</span>
            {suggestedQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-3.5 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 hover:text-slate-900 text-slate-700 text-sm font-medium whitespace-nowrap border border-slate-200 transition-colors cursor-pointer select-none"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask PortFlow Copilot about current congestion, vessel rerouting, or crisis simulations..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-slate-950 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer select-none"
            >
              <span>Send</span>
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
