import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MoreVertical, Send, Bot, Lightbulb, Sparkles, Loader2, Play } from 'lucide-react';
import { AIMessage, UserProfile, ScreenId } from '../../types';
import { aiMentor } from '../../services/aiService';
import { sound } from '../../services/sound';

interface AIMentorScreenProps {
  profile: UserProfile;
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const AIMentorScreen: React.FC<AIMentorScreenProps> = ({
  profile,
  onBack,
  onNavigate,
}) => {
  // Initial messages matching Screenshot 8 exactly!
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'm1',
      sender: 'mentor',
      text: "You're getting better! 👏\n\nI noticed you're struggling with loop conditions.\n\nLet's try a simpler challenge with a hint.",
      timestamp: '9:41 AM',
      hintCard: {
        title: '💡 Hint',
        content: 'A loop helps you repeat the same code multiple times without writing it again and again.',
        actionLabel: 'Start Practice',
      },
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || inputMessage;
    if (!textToSend.trim() || loading) return;

    sound.playClick();
    const userMsg: AIMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await aiMentor.askMentor(
        textToSend,
        [...messages, userMsg],
        {
          userName: profile.name,
          selectedLanguage: profile.selectedLanguage,
          currentTopic: 'Loops',
          userLevel: profile.level,
        }
      );

      const botMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'mentor',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hintCard: response.hintCard,
      };

      setMessages((prev) => [...prev, botMsg]);
      sound.playMove();
    } catch {
      // Fallback response
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'mentor',
          text: `You're making great progress in ${profile.selectedLanguage}! Try testing your loop boundaries.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[760px] h-full flex flex-col justify-between bg-[#0b0e1b] text-white">
      {/* Header matching Screenshot 8 */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 bg-[#0d1022]/90 backdrop-blur-md sticky top-0 z-30 border-b border-purple-900/30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onBack();
            }}
            className="w-10 h-10 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 border border-purple-700/30 flex items-center justify-center text-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* AI Mentor Avatar & Status */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 shadow-md shadow-cyan-500/30 flex items-center justify-center">
                <div className="w-full h-full bg-[#121633] rounded-[14px] flex items-center justify-center text-cyan-300">
                  <Bot className="w-6 h-6" />
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0b0e1b]" />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-white leading-tight">AI Mentor</h2>
              <span className="text-[11px] text-emerald-400 font-medium">Online</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => sound.playClick()}
          className="w-10 h-10 rounded-xl hover:bg-purple-900/30 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar">
        {messages.map((msg) => {
          const isMentor = msg.sender === 'mentor';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMentor ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[88%] rounded-3xl p-4 shadow-lg leading-relaxed text-sm ${
                  isMentor
                    ? 'bg-[#141836] border border-purple-900/50 text-slate-100 rounded-tl-sm'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm'
                }`}
              >
                <p className="whitespace-pre-line text-sm">{msg.text}</p>

                {/* Embedded Hint Card matching Screenshot 8 */}
                {msg.hintCard && (
                  <div className="mt-3.5 p-3.5 rounded-2xl bg-[#0c0f24] border border-cyan-500/30 shadow-inner">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                      <Lightbulb className="w-4 h-4 fill-amber-400" />
                      <span>{msg.hintCard.title}</span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                      {msg.hintCard.content}
                    </p>

                    {/* Start Practice Button matching Screenshot 8 */}
                    {msg.hintCard.actionLabel && (
                      <button
                        onClick={() => {
                          sound.playClick();
                          onNavigate('game_loop');
                        }}
                        className="mt-3 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>{msg.hintCard.actionLabel}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              <span className="text-[10px] text-slate-500 mt-1 px-2 font-mono">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-cyan-400 p-3 rounded-2xl bg-[#141836] border border-cyan-500/30 w-fit animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>AI Mentor is thinking...</span>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-1.5 flex gap-2 overflow-x-auto no-scrollbar">
        {['Give me another hint 💡', 'Explain for vs while', 'Why do we start at 0?'].map(
          (chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="text-[11px] font-medium whitespace-nowrap px-3 py-1.5 rounded-full bg-[#141836] border border-purple-900/40 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              {chip}
            </button>
          )
        )}
      </div>

      {/* Bottom Message Input matching Screenshot 8 */}
      <div className="p-4 bg-[#0d1024]/95 backdrop-blur-md border-t border-purple-900/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 rounded-2xl bg-[#141838] border border-purple-900/50 px-3.5 py-2 shadow-inner focus-within:border-cyan-400 transition-colors"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || loading}
            className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 disabled:opacity-40 flex items-center justify-center text-white cursor-pointer shadow-md shadow-blue-600/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
