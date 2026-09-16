import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Bot,
  Mic,
  MicOff,
  Search,
  Sparkles,
  Send,
  Volume2,
  VolumeX,
  Globe,
  ExternalLink,
  RotateCcw,
  Check,
  Copy,
  ChevronRight,
  Shield,
  Zap,
  Sliders,
  Layers,
  FileText
} from 'lucide-react';

interface AIStudioSuiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'chat' | 'voice' | 'search' | 'estimate';
  onStartProject?: (service?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'model';
  text: string;
  timestamp: string;
  modelUsed?: string;
}

interface SearchSource {
  title: string;
  uri: string;
}

export default function AIStudioSuiteModal({
  isOpen,
  onClose,
  defaultTab = 'chat',
  onStartProject,
}: AIStudioSuiteModalProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice' | 'search' | 'estimate'>(defaultTab);

  // Synchronize defaultTab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'model',
      text: "Hello, I am Aryvanta's AI Studio Assistant. Whether you want to evaluate project feasibility, explore design systems, check development pricing, or brainstorm architectural tech stacks, I'm here to assist.",
      timestamp: 'Just now',
      modelUsed: 'gemini-3.5-flash',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite'>('gemini-3.5-flash');
  const [selectedRole, setSelectedRole] = useState<'studio-lead' | 'art-director' | 'system-architect' | 'growth-strategist'>('studio-lead');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Search Grounding State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    query: string;
    answer: string;
    sources: SearchSource[];
  } | null>(null);

  // Voice State
  const [isRecording, setIsRecording] = useState(false);
  const [voiceInputText, setVoiceInputText] = useState('');
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [voiceVoice, setVoiceVoice] = useState<'Zephyr' | 'Kore' | 'Puck'>('Zephyr');
  const [voiceResponseText, setVoiceResponseText] = useState<string>('Tap "Speak to Studio AI" to begin a real-time voice conversation with Aryvanta\'s studio intelligence.');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Estimator State
  const [estProjectType, setEstProjectType] = useState('Bespoke Digital Flagship');
  const [estGoals, setEstGoals] = useState('High-converting landing page with 3D elements, liquid glass visual identity, and sub-second load times.');
  const [estTimeline, setEstTimeline] = useState('3-4 Weeks (Standard)');
  const [estBudget, setEstBudget] = useState('$3,000 – $5,000');
  const [estLoading, setEstLoading] = useState(false);
  const [estResult, setEstResult] = useState<string | null>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  // Handle Send Chat
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userText = chatInput.trim();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);
    setChatInput('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ sender: m.sender, text: m.text })),
          model: selectedModel,
          role: selectedRole,
        }),
      });

      const data = await res.json();
      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'model',
        text: data.text || data.fallbackText || 'Unable to generate response.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || selectedModel,
      };

      setChatMessages((prev) => [...prev, replyMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'model',
          text: 'Connection error. Aryan Sabharwal Studio can also be contacted directly at aryansabharwal156@gmail.com or via WhatsApp.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle Search Grounding
  const handleSearchSubmit = async (queryToSearch?: string) => {
    const q = queryToSearch || searchQuery;
    if (!q.trim() || searchLoading) return;

    setSearchLoading(true);
    setSearchResult(null);

    try {
      const res = await fetch('/api/ai/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      const data = await res.json();
      setSearchResult({
        query: data.query || q,
        answer: data.answer || 'No search answer returned.',
        sources: data.sources || [],
      });
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setSearchLoading(false);
    }
  };

  // Voice Web Speech / Recording Handler
  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your query in the chat.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        setVoiceInputText('');
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setVoiceInputText(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Recognition error:', err);
      setIsRecording(false);
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  // Submit Voice Query & Play Audio
  const handleVoiceSubmit = async (promptText?: string) => {
    const textToSend = promptText || voiceInputText;
    if (!textToSend.trim() || voiceLoading) return;

    setVoiceLoading(true);
    setVoiceResponseText('Thinking & synthesizing audio response...');

    try {
      const res = await fetch('/api/ai/voice-dialogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          voice: voiceVoice,
        }),
      });

      const data = await res.json();
      setVoiceResponseText(data.text || 'Response received.');

      // Play audio if base64 exists
      if (data.audioBase64) {
        playBase64Audio(data.audioBase64);
      } else {
        // Fallback to browser SpeechSynthesis
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(data.text);
          utterance.onstart = () => setIsPlayingAudio(true);
          utterance.onend = () => setIsPlayingAudio(false);
          window.speechSynthesis.speak(utterance);
        }
      }
    } catch (err) {
      console.error('Voice dialogue error:', err);
      setVoiceResponseText('Thank you for reaching out. Please connect directly with Aryan at aryansabharwal156@gmail.com.');
    } finally {
      setVoiceLoading(false);
    }
  };

  // Helper to play raw PCM or encoded base64 audio
  const playBase64Audio = (base64String: string) => {
    try {
      const binaryString = atob(base64String);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000,
      });
      audioContextRef.current = audioCtx;

      // Check if it's raw 16-bit PCM (length is even)
      const int16Array = new Int16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 2);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768;
      }

      const audioBuffer = audioCtx.createBuffer(1, float32Array.length, 24000);
      audioBuffer.copyToChannel(float32Array, 0);

      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.onended = () => setIsPlayingAudio(false);

      setIsPlayingAudio(true);
      source.start();
    } catch (err) {
      console.warn('AudioContext playback issue, attempting browser speech fallback:', err);
      if ('speechSynthesis' in window && voiceResponseText) {
        const utterance = new SpeechSynthesisUtterance(voiceResponseText);
        utterance.onstart = () => setIsPlayingAudio(true);
        utterance.onend = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Handle Project Estimation
  const handleGenerateEstimate = async () => {
    setEstLoading(true);
    setEstResult(null);

    try {
      const res = await fetch('/api/ai/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType: estProjectType,
          goals: estGoals,
          targetTimeline: estTimeline,
          targetBudget: estBudget,
        }),
      });

      const data = await res.json();
      setEstResult(data.estimate || 'Estimate generated.');
    } catch (err) {
      console.error('Estimator error:', err);
      setEstResult('Error generating estimate. Aryan can prepare a customized quote via aryansabharwal156@gmail.com.');
    } finally {
      setEstLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div
        id="ai-studio-suite-modal"
        className="relative w-full max-w-5xl h-[88vh] max-h-[850px] rounded-[1.75rem] liquid-glass-strong border border-white/15 shadow-2xl flex flex-col overflow-hidden text-white bg-black/90"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl liquid-glass flex items-center justify-center text-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading italic text-xl text-white tracking-tight">
                  Aryvanta
                </span>
                <span className="text-xs text-white/60 font-body uppercase tracking-wider">
                  // AI Studio Suite
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/70 font-body">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Founded by Aryan Sabharwal &bull; Intelligence &amp; Live Scoping</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick WhatsApp Link */}
            <a
              href="https://wa.me/916396438091"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body liquid-glass hover:bg-white/10 text-white/90 border border-white/10 transition-colors"
            >
              <span>WhatsApp Inquiry</span>
              <ExternalLink className="w-3 h-3 text-white/60" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full liquid-glass hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer border border-white/10"
              aria-label="Close AI Suite"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-white/10 bg-white/[0.01] overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body font-medium transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-white text-black shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Gemini Chatbot</span>
          </button>

          <button
            onClick={() => setActiveTab('voice')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body font-medium transition-all cursor-pointer ${
              activeTab === 'voice'
                ? 'bg-white text-black shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body font-medium transition-all cursor-pointer ${
              activeTab === 'search'
                ? 'bg-white text-black shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Google Search Grounding</span>
          </button>

          <button
            onClick={() => setActiveTab('estimate')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body font-medium transition-all cursor-pointer ${
              activeTab === 'estimate'
                ? 'bg-white text-black shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Scope & Quote</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* TAB 1: GEMINI CHATBOT */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Main Chat Thread */}
              <div className="flex-1 flex flex-col overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
                {/* Chat Control Ribbon */}
                <div className="px-5 py-2.5 bg-white/[0.02] border-b border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 uppercase tracking-wider text-[10px]">Model:</span>
                    <select
                      value={selectedModel}
                      onChange={(e: any) => setSelectedModel(e.target.value)}
                      className="bg-black/60 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-white/40 cursor-pointer"
                    >
                      <option value="gemini-3.5-flash">gemini-3.5-flash (General Tasks)</option>
                      <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Deep Architecture)</option>
                      <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Ultra-Fast)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-white/60 uppercase tracking-wider text-[10px]">Role:</span>
                    <select
                      value={selectedRole}
                      onChange={(e: any) => setSelectedRole(e.target.value)}
                      className="bg-black/60 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-white/40 cursor-pointer"
                    >
                      <option value="studio-lead">Aryan Sabharwal (Lead)</option>
                      <option value="art-director">Art Director</option>
                      <option value="system-architect">Systems Architect</option>
                      <option value="growth-strategist">Growth Strategist</option>
                    </select>

                    <button
                      onClick={() =>
                        setChatMessages([
                          {
                            id: 'reset',
                            sender: 'model',
                            text: 'Conversation thread refreshed. What would you like to explore regarding Aryan Sabharwal Studio?',
                            timestamp: 'Just now',
                            modelUsed: selectedModel,
                          },
                        ])
                      }
                      title="Clear chat history"
                      className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 font-body">
                  {chatMessages.map((msg) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-2 mb-1 text-[11px] text-white/50">
                          <span>{isUser ? 'You' : 'Studio Assistant'}</span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                          {!isUser && msg.modelUsed && (
                            <span className="liquid-glass rounded px-1.5 py-0.2 text-[9px] text-white/70">
                              {msg.modelUsed}
                            </span>
                          )}
                        </div>

                        <div
                          className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                            isUser
                              ? 'bg-white text-black font-normal rounded-tr-sm shadow-md'
                              : 'liquid-glass-strong border border-white/15 text-white/90 font-light rounded-tl-sm'
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{msg.text}</div>

                          {!isUser && (
                            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-[11px] text-white/60">
                              <button
                                onClick={() => handleCopy(msg.text, msg.id)}
                                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                              >
                                {copiedId === msg.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-white" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy response</span>
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => {
                                  onClose();
                                  onStartProject?.();
                                }}
                                className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
                              >
                                Book project sprint →
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {chatLoading && (
                    <div className="flex items-center gap-3 p-4 rounded-2xl liquid-glass border border-white/15 w-fit">
                      <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span className="text-xs text-white/70 font-body font-light">
                        Gemini is computing response...
                      </span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Prompt Shortcuts */}
                <div className="px-5 py-2 bg-white/[0.01] border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
                  <span className="text-[10px] uppercase text-white/50 tracking-wider shrink-0">Suggestions:</span>
                  {[
                    "What are Aryan's project pricing tiers?",
                    "Can Aryan deliver a 2-week MVP sprint?",
                    "Explain the modern tech stack used here.",
                    "How does Aryan design liquid glass interfaces?",
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setChatInput(preset);
                      }}
                      className="px-3 py-1 rounded-full liquid-glass hover:bg-white/10 text-xs text-white/80 whitespace-nowrap transition-colors border border-white/10 cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-4 bg-white/[0.02] border-t border-white/10 flex items-center gap-3 shrink-0"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about deliverables, timelines, design systems, or tech..."
                    className="flex-1 bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || chatLoading}
                    className="px-5 py-3 rounded-xl bg-white text-black font-body font-medium text-sm hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-sm"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

              {/* Chat Sidebar: Studio Specs */}
              <div className="hidden md:flex w-72 flex-col p-5 bg-white/[0.01] overflow-y-auto space-y-6 text-xs font-body shrink-0">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/50 mb-2">
                    // Aryan Sabharwal Profile
                  </div>
                  <div className="p-3.5 rounded-xl liquid-glass space-y-2 border border-white/10">
                    <div className="font-medium text-white text-sm">Lead Creator & Technologist</div>
                    <p className="text-white/70 font-light leading-relaxed">
                      Specialized in luxury dark interfaces, bespoke digital flagships, and full-stack React systems.
                    </p>
                    <div className="pt-2 border-t border-white/10 text-[11px] text-white/80 flex items-center justify-between">
                      <span>Location</span>
                      <span className="text-white">India / Worldwide</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/50 mb-2">
                    // Studio Engagement Tiers
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl liquid-glass border border-white/10">
                      <div className="flex justify-between font-medium text-white">
                        <span>Sprint MVP</span>
                        <span>$1.5k–$3k</span>
                      </div>
                      <div className="text-white/60 font-light mt-0.5">1–2 week intensive build</div>
                    </div>
                    <div className="p-3 rounded-xl liquid-glass border border-white/10">
                      <div className="flex justify-between font-medium text-white">
                        <span>Flagship Site</span>
                        <span>$3k–$5k</span>
                      </div>
                      <div className="text-white/60 font-light mt-0.5">3–4 week custom flagship</div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto p-3.5 rounded-xl bg-white/[0.04] border border-white/15">
                  <div className="text-[11px] font-medium text-white mb-1">Direct Booking</div>
                  <p className="text-[11px] text-white/70 font-light mb-3">
                    Ready to initiate your engagement?
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onStartProject?.();
                    }}
                    className="w-full py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors"
                  >
                    Open Scope Estimator
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VOICE STUDIO */}
          {activeTab === 'voice' && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 overflow-y-auto text-center font-body">
              <div className="max-w-xl w-full flex flex-col items-center space-y-8">
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/60 mb-2">
                    // Real-Time Voice Intelligence
                  </div>
                  <h3 className="font-heading italic text-3xl sm:text-4xl text-white tracking-tight">
                    Talk directly to Aryan's Studio AI.
                  </h3>
                  <p className="text-sm text-white/80 font-light mt-2 max-w-md mx-auto">
                    Ask questions using speech input and hear spoken answers generated in real-time.
                  </p>
                </div>

                {/* Voice Model & Voice Config */}
                <div className="flex items-center gap-3 bg-white/[0.03] px-4 py-2 rounded-full border border-white/10 text-xs">
                  <span className="text-white/60">Voice Profile:</span>
                  {(['Zephyr', 'Kore', 'Puck'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setVoiceVoice(v)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        voiceVoice === v ? 'bg-white text-black shadow-sm' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                {/* Live Microphone Visualizer Orb */}
                <div className="relative flex items-center justify-center">
                  {/* Outer Pulsing Rings */}
                  <div
                    className={`absolute w-44 h-44 rounded-full border border-white/20 transition-all duration-700 ${
                      isRecording || isPlayingAudio ? 'scale-125 opacity-100 animate-pulse' : 'scale-100 opacity-20'
                    }`}
                  />
                  <div
                    className={`absolute w-36 h-36 rounded-full border border-white/30 transition-all duration-500 ${
                      isRecording || isPlayingAudio ? 'scale-110 opacity-80' : 'scale-95 opacity-20'
                    }`}
                  />

                  {/* Center Mic Button */}
                  <button
                    onClick={isRecording ? stopSpeechRecognition : startSpeechRecognition}
                    className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xl border ${
                      isRecording
                        ? 'bg-white text-black border-white shadow-[0_0_40px_rgba(255,255,255,0.7)]'
                        : 'liquid-glass-strong border-white/30 text-white hover:border-white hover:scale-105'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-8 h-8 text-black animate-bounce" />
                        <span className="text-[10px] font-medium tracking-wider uppercase mt-1">Listening</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-8 h-8 text-white" />
                        <span className="text-[10px] font-medium tracking-wider uppercase mt-1">Tap to Speak</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Speech Transcript Box */}
                <div className="w-full p-5 rounded-2xl liquid-glass border border-white/15 text-left space-y-3">
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span className="uppercase tracking-wider text-[10px]">// Voice Input & Response</span>
                    {isPlayingAudio && (
                      <span className="flex items-center gap-1.5 text-white">
                        <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                        <span className="text-[10px]">Playing Audio Response</span>
                      </span>
                    )}
                  </div>

                  {voiceInputText ? (
                    <div className="text-xs text-white/80 p-2.5 rounded-lg bg-white/[0.04]">
                      <span className="text-white/50">You said: </span>
                      "{voiceInputText}"
                    </div>
                  ) : null}

                  <div className="text-sm sm:text-base text-white/95 font-light leading-relaxed whitespace-pre-wrap">
                    {voiceLoading ? (
                      <div className="flex items-center gap-2 text-white/70 py-2">
                        <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                        <span>Synthesizing voice response...</span>
                      </div>
                    ) : (
                      voiceResponseText
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
                    {voiceInputText && !isRecording && (
                      <button
                        onClick={() => handleVoiceSubmit(voiceInputText)}
                        disabled={voiceLoading}
                        className="px-4 py-1.5 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors"
                      >
                        Submit Query & Generate Voice
                      </button>
                    )}

                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        onClick={() => handleVoiceSubmit("Tell me about Aryan's design philosophy and web standards.")}
                        className="px-3 py-1 rounded-full liquid-glass text-[11px] text-white/70 hover:text-white border border-white/10"
                      >
                        Ask About Studio Philosophy
                      </button>
                      <button
                        onClick={() => handleVoiceSubmit("What are the pricing tiers for building a bespoke website?")}
                        className="px-3 py-1 rounded-full liquid-glass text-[11px] text-white/70 hover:text-white border border-white/10"
                      >
                        Ask About Pricing Tiers
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GOOGLE SEARCH GROUNDING */}
          {activeTab === 'search' && (
            <div className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto font-body space-y-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60 mb-1">
                  // Real-Time Google Search Grounding
                </div>
                <h3 className="font-heading italic text-2xl sm:text-3xl text-white tracking-tight">
                  Search & analyze live web intelligence with Gemini.
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-light mt-1">
                  Powered by <code className="text-white bg-white/10 px-1.5 py-0.5 rounded">gemini-3.5-flash</code> with Google Search grounding tool for up-to-date benchmarks, design trends, and tech facts.
                </p>
              </div>

              {/* Search Input Bar */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearchSubmit();
                    }}
                    placeholder="Search live web data, current React 19 benchmarks, typography trends 2026..."
                    className="w-full bg-black/60 border border-white/15 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
                <button
                  onClick={() => handleSearchSubmit()}
                  disabled={!searchQuery.trim() || searchLoading}
                  className="px-6 py-3 rounded-xl bg-white text-black font-medium text-sm hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  <span>Search Grounding</span>
                </button>
              </div>

              {/* Quick Query Presets */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                <span className="text-[11px] uppercase text-white/50 tracking-wider shrink-0">Live Research:</span>
                {[
                  'Modern dark mode liquid glass UX benchmarks 2026',
                  'Vite vs Next.js frontend performance comparison',
                  'Latest Google Gemini 3 models release specifications',
                  'Bespoke web design agency pricing models in tech',
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(q);
                      handleSearchSubmit(q);
                    }}
                    className="px-3 py-1 rounded-full liquid-glass hover:bg-white/10 text-xs text-white/80 whitespace-nowrap transition-colors border border-white/10 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Search Loading */}
              {searchLoading && (
                <div className="p-8 rounded-2xl liquid-glass border border-white/15 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <div className="text-sm font-medium text-white">
                    Querying Google Search Grounding...
                  </div>
                  <div className="text-xs text-white/60 font-light max-w-sm">
                    Retrieving real-time web results and synthesizing intelligence with Gemini 3.5 Flash.
                  </div>
                </div>
              )}

              {/* Search Results Display */}
              {searchResult && !searchLoading && (
                <div className="space-y-6 animate-fade-in">
                  {/* Answer Box */}
                  <div className="p-6 rounded-2xl liquid-glass-strong border border-white/15 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-xs uppercase tracking-wider text-white/60">
                        // Grounded Answer
                      </span>
                      <span className="text-xs font-body text-white/70">
                        Query: "{searchResult.query}"
                      </span>
                    </div>

                    <div className="text-sm sm:text-base text-white/90 font-light leading-relaxed whitespace-pre-wrap">
                      {searchResult.answer}
                    </div>
                  </div>

                  {/* Grounding Citations & Web Sources */}
                  {searchResult.sources && searchResult.sources.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-xs uppercase tracking-wider text-white/60">
                        // Grounding Citations & Live Web Sources ({searchResult.sources.length})
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {searchResult.sources.map((src, idx) => (
                          <a
                            key={idx}
                            href={src.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3.5 rounded-xl liquid-glass hover:bg-white/[0.08] border border-white/10 transition-all flex items-start justify-between gap-3 group"
                          >
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-white truncate group-hover:underline">
                                {src.title || src.uri}
                              </div>
                              <div className="text-[10px] text-white/50 truncate mt-0.5">
                                {src.uri}
                              </div>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-white/50 group-hover:text-white shrink-0 transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: AI SCOPE & QUOTE ESTIMATOR */}
          {activeTab === 'estimate' && (
            <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
              {/* Estimator Configuration */}
              <div className="w-full md:w-1/2 p-6 md:p-8 space-y-5 border-b md:border-b-0 md:border-r border-white/10 font-body">
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/60 mb-1">
                    // Intelligent Project Scoper
                  </div>
                  <h3 className="font-heading italic text-2xl text-white tracking-tight">
                    Generate an Instant Studio Architectural Scope
                  </h3>
                  <p className="text-xs text-white/75 font-light mt-1">
                    Our AI models assess requirements, recommending tech architecture, timeline milestones, and studio investment ranges.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-white/70 uppercase tracking-wider block mb-1.5">
                      Project Type
                    </label>
                    <select
                      value={estProjectType}
                      onChange={(e) => setEstProjectType(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/50"
                    >
                      <option value="Bespoke Digital Flagship">Bespoke Digital Flagship ($3,000–$6,000)</option>
                      <option value="SaaS Web Application UI/UX">SaaS Web Application UI/UX ($4,000–$8,000)</option>
                      <option value="Custom Ecommerce Experience">Custom Ecommerce Experience ($3,500–$7,000)</option>
                      <option value="2-Week Sprint MVP">2-Week Sprint MVP ($1,500–$3,000)</option>
                      <option value="AI Integration & Custom Agents">AI Integration & Custom Agents ($2,500–$5,000)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-white/70 uppercase tracking-wider block mb-1.5">
                      Key Goals & Features
                    </label>
                    <textarea
                      rows={3}
                      value={estGoals}
                      onChange={(e) => setEstGoals(e.target.value)}
                      placeholder="Describe target user outcome, integrations (Stripe, Gemini, 3D Canvas), or visual identity requirements..."
                      className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-white/70 uppercase tracking-wider block mb-1.5">
                        Target Timeline
                      </label>
                      <select
                        value={estTimeline}
                        onChange={(e) => setEstTimeline(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/50"
                      >
                        <option value="1-2 Weeks (Rapid Sprint)">1–2 Weeks (Sprint)</option>
                        <option value="3-4 Weeks (Standard)">3–4 Weeks (Standard)</option>
                        <option value="5-8 Weeks (Comprehensive)">5–8 Weeks (Flagship)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-white/70 uppercase tracking-wider block mb-1.5">
                        Target Budget
                      </label>
                      <select
                        value={estBudget}
                        onChange={(e) => setEstBudget(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/50"
                      >
                        <option value="$1,500 – $3,000">$1,500 – $3,000</option>
                        <option value="$3,000 – $5,000">$3,000 – $5,000</option>
                        <option value="$5,000 – $10,000+">$5,000 – $10,000+</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateEstimate}
                    disabled={estLoading}
                    className="w-full py-3.5 rounded-xl bg-white text-black font-medium text-sm hover:bg-white/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
                  >
                    {estLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Architecting Scope with Gemini...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate AI Project Blueprint</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Estimate Results */}
              <div className="w-full md:w-1/2 p-6 md:p-8 bg-white/[0.01] flex flex-col justify-between font-body">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/60 mb-3">
                    // AI Scope Blueprint Output
                  </div>

                  {estResult ? (
                    <div className="p-5 rounded-2xl liquid-glass-strong border border-white/15 space-y-4 max-h-[420px] overflow-y-auto text-xs leading-relaxed text-white/90 whitespace-pre-wrap">
                      {estResult}
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl liquid-glass border border-white/10 text-center space-y-3">
                      <Sparkles className="w-8 h-8 mx-auto text-white/40" />
                      <div className="text-sm font-medium text-white">
                        Ready to Scope
                      </div>
                      <p className="text-xs text-white/60 font-light max-w-xs mx-auto">
                        Configure your parameters on the left and click "Generate AI Project Blueprint" to receive a tailored architectural proposal.
                      </p>
                    </div>
                  )}
                </div>

                {estResult && (
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <a
                      href={`https://wa.me/916396438091?text=Hi%20Aryan,%20I%20generated%20a%20project%20scope%20for%20a%20${encodeURIComponent(estProjectType)}%20and%20would%20like%20to%20book%20a%20kickoff.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-white text-black font-medium text-xs text-center hover:bg-white/90 transition-colors"
                    >
                      Book This Scope on WhatsApp
                    </a>

                    <button
                      onClick={() => {
                        onClose();
                        onStartProject?.(estProjectType);
                      }}
                      className="px-4 py-2.5 rounded-xl liquid-glass hover:bg-white/10 text-white font-medium text-xs transition-colors border border-white/10"
                    >
                      Use in Contact Form
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
