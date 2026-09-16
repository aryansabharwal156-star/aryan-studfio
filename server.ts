import express from 'express';
import {createServer as createHttpServer} from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Modality } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Google GenAI Client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not defined in environment variables. Falling back to default or empty initialization.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 1. Health check & Search Engine Files
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    aiReady: Boolean(process.env.GEMINI_API_KEY),
  });
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nAllow: /\n\nSitemap: https://aryanstudionetlify.netlify.app/sitemap.xml\n');
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aryanstudionetlify.netlify.app/</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
});

// 2. Multi-turn AI Chatbot endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, model = 'gemini-3.5-flash', role = 'studio-lead' } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const ai = getAIClient();

    // Determine system instruction based on role
    let systemInstruction = `You are the Official AI Studio Assistant for ARYVANTA (founded by Aryan Sabharwal) — a modern digital technology and creative studio operating from India and serving clients internationally.
Tagline: AI • Web • SaaS • Creative Technology.
Services provided:
1. Website Development & High-conversion Digital Flagships
2. Landing Page Development
3. SaaS Tool & Web Application Development
4. AI Voice Agents & Conversational Intake
5. AI Automation & Workflow Pipelines
6. Motion Design & Commercial Ads
Pricing & Timelines: Sprints (1-2 weeks, $1.5k-$3k), Standard (3-4 weeks, $3k-$5k), Enterprise (5+ weeks, $5k-$10k+).
Direct Contact: aryansabharwal156@gmail.com, or WhatsApp at +91 6396438091.
Tone: Sophisticated, concise, architectural, insightful, and practical. Offer concrete recommendations and project guidance.`;

    if (role === 'art-director') {
      systemInstruction = `You are the Lead Art Director at ARYVANTA (founded by Aryan Sabharwal). You advise on design systems, visual hierarchy, typography pairings, luxury dark aesthetic standards, micro-interactions, and visual storytelling.`;
    } else if (role === 'system-architect') {
      systemInstruction = `You are the Principal Systems Architect at ARYVANTA (founded by Aryan Sabharwal). You advise on modern web engineering (React, TypeScript, Vite, Tailwind CSS, Node/Express, state orchestration, server-side Gemini integration, performance optimization, and accessible DOM structures).`;
    } else if (role === 'growth-strategist') {
      systemInstruction = `You are the Digital Growth Strategist at ARYVANTA (founded by Aryan Sabharwal). You advise founders and brands on conversion rate optimization, high-impact landing page psychology, funnel architecture, user acquisition motion, and compounding brand equity.`;
    }

    // Format chat contents
    // Convert previous messages to Gemini contents format
    const contents = messages.map((m: { sender: string; text: string }) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    // Select valid model based on parameter
    let selectedModel = 'gemini-3.5-flash';
    if (model === 'gemini-3.1-pro-preview') {
      selectedModel = 'gemini-3.1-pro-preview';
    } else if (model === 'gemini-3.1-flash-lite') {
      selectedModel = 'gemini-3.1-flash-lite';
    } else {
      selectedModel = 'gemini-3.5-flash';
    }

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'I apologize, but I could not generate a response at this moment.';

    res.json({
      text: replyText,
      modelUsed: selectedModel,
      role: role,
    });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to process AI chat request',
      fallbackText: 'I am currently operating in offline mode. Please feel free to reach out directly to Aryan at aryansabharwal156@gmail.com or via WhatsApp.',
    });
  }
});

// 3. Google Search Grounded Intelligence Engine
app.post('/api/ai/search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'A query string is required' });
    }

    const ai = getAIClient();

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `You are the Real-Time Market & Tech Research Agent for Aryan Sabharwal Studio.
Analyze the following query with live Google Search information: "${query}".
Synthesize the most up-to-date web intelligence, design trends, library benchmarks, or industry insights clearly and concisely in structured markdown.`,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.4,
      },
    });

    const answerText = response.text || '';
    
    // Extract grounding sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSources: Array<{ title: string; uri: string }> = [];

    if (Array.isArray(groundingChunks)) {
      for (const chunk of groundingChunks) {
        if (chunk.web?.uri) {
          webSources.push({
            title: chunk.web.title || chunk.web.uri,
            uri: chunk.web.uri,
          });
        }
      }
    }

    // Deduplicate sources by URI
    const uniqueSources = webSources.filter(
      (src, idx, self) => idx === self.findIndex((s) => s.uri === src.uri)
    );

    res.json({
      query,
      answer: answerText,
      sources: uniqueSources,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Search grounding error:', error);
    res.status(500).json({
      error: error?.message || 'Search grounding failed',
      answer: 'Search grounding is temporarily unavailable. Displaying studio internal knowledge base.',
      sources: [],
    });
  }
});

// 4. Voice Conversation / TTS Speech Generation
app.post('/api/ai/voice-dialogue', async (req, res) => {
  try {
    const { prompt, voice = 'Zephyr' } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getAIClient();

    // 1. Generate text response
    const textResponse = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are Aryan Sabharwal Studio Voice Concierge. Keep your spoken response natural, punchy, conversational, and under 3 sentences.',
        temperature: 0.7,
      },
    });

    const spokenText = textResponse.text || 'Hello, I am here to help scope your project.';

    // 2. Generate Audio TTS using gemini-3.1-flash-tts-preview
    let audioBase64: string | null = null;
    try {
      const audioResponse = await ai.models.generateContent({
        model: 'gemini-3.1-flash-tts-preview',
        contents: [{ parts: [{ text: spokenText }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice || 'Zephyr' },
            },
          },
        },
      });

      audioBase64 = audioResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
    } catch (ttsErr) {
      console.warn('TTS generation warning (falling back to client speech synthesis):', ttsErr);
    }

    res.json({
      text: spokenText,
      audioBase64: audioBase64,
      voice: voice,
    });
  } catch (error: any) {
    console.error('Voice dialogue error:', error);
    res.status(500).json({
      error: error?.message || 'Voice generation failed',
      text: 'Thank you for reaching out. How can I assist you with your web or digital project today?',
      audioBase64: null,
    });
  }
});

// 5. Intelligent Scope & Architecture Estimator
app.post('/api/ai/estimate', async (req, res) => {
  try {
    const { projectType, goals, targetTimeline, targetBudget } = req.body;

    const ai = getAIClient();

    const prompt = `Act as Aryan Sabharwal's Lead Technical Architect and Project Scoper.
Analyze the following client inquiry and generate a professional architectural estimate and project roadmap:
- Project Category: ${projectType || 'Modern Web Application'}
- Primary Goals: ${goals || 'Launch a high-conversion digital flagship with luxury dark aesthetic'}
- Preferred Timeline: ${targetTimeline || 'Standard (3-4 Weeks)'}
- Target Budget: ${targetBudget || '$3,000 - $5,000'}

Provide a structured breakdown including:
1. Executive Summary & Strategy
2. Recommended Tech Stack & Architecture
3. Key Deliverables & Milestones
4. Suggested Studio Timeline & Estimated Investment Range
5. Next Actionable Step

Be direct, sophisticated, and realistic.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        temperature: 0.6,
      },
    });

    res.json({
      estimate: response.text || 'Unable to generate estimate at this moment.',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Estimate error:', error);
    res.status(500).json({
      error: error?.message || 'Estimation failed',
      estimate: 'Standard engagement scope: 3-4 week delivery including custom art direction, responsive frontend build, performance tuning, and launch assistance.',
    });
  }
});

// Setup Vite / Static handling
async function startServer() {
  const httpServer = createHttpServer(app);

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Aryan Sabharwal Portfolio & Studio AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
