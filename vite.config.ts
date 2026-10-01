import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';

function geminiMentorPlugin(): Plugin {
  return {
    name: 'gemini-mentor-api',
    configureServer(server) {
      server.middlewares.use('/api/mentor', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const data = JSON.parse(body || '{}');
            const { message, context } = data;

            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
              res.statusCode = 200;
              res.end(JSON.stringify({ reply: null }));
              return;
            }

            const ai = new GoogleGenAI({ apiKey });
            const prompt = `You are the CodeQuest AI Mentor, an encouraging, friendly, and gamified programming tutor for learners.
The user's name is ${context?.userName || 'Player'}.
Selected programming language: ${context?.selectedLanguage || 'Python'}.
Current learning topic: ${context?.currentTopic || 'Loops'}.
User level: Level ${context?.userLevel || 8}.

Guideline:
1. Speak warmly in a game-master / mentor tone with occasional emojis (🎮, 💡, 👏, 🚀).
2. DO NOT immediately give the full code answer if they ask for help with a challenge. Instead, give a supportive tip, point out the concept, and provide a clear pedagogical hint.
3. Keep answers concise, readable, and structured.

User asked: "${message}"`;

            const aiResponse = await ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents: prompt,
            });

            const replyText = aiResponse.text || "You're doing great! Keep practicing your code.";
            res.statusCode = 200;
            res.end(JSON.stringify({
              reply: replyText,
              hintCard: {
                title: '💡 Mentor Guidance',
                content: 'Break the problem down: what should happen on the first iteration versus the last?',
                actionLabel: 'Start Practice',
              },
            }));
          } catch (err: unknown) {
            console.error('Gemini Mentor API error:', err);
            res.statusCode = 200;
            res.end(JSON.stringify({ reply: null }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiMentorPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

