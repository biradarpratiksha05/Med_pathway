import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Mic, Camera, Volume as VolumeUp } from 'lucide-react';
import { Message } from '../types';

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your medication assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en-US', name: 'English' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'hi-IN', name: 'Hindi' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'll help you manage your medications. Would you like me to read out your next scheduled medications?",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = selectedLanguage;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  const handleScan = async () => {
    // Implementation for document scanning using device camera
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        // Process the image using Tesseract.js
        const { createWorker } = await import('tesseract.js');
        const worker = await createWorker();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(file);
        await worker.terminate();
        
        setInput(text);
      }
    };
    
    input.click();
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <MessageCircle className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-lg font-semibold">Medication Assistant</h2>
        </div>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-2 py-1 border rounded-md text-sm"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
              {message.sender === 'bot' && (
                <button
                  onClick={() => {
                    const speech = new SpeechSynthesisUtterance(message.text);
                    speech.lang = selectedLanguage;
                    window.speechSynthesis.speak(speech);
                  }}
                  className="ml-2 text-gray-600 hover:text-gray-800"
                >
                  <VolumeUp className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <button
            onClick={startVoiceRecognition}
            className={`p-2 rounded-full ${
              isListening ? 'bg-red-500' : 'bg-gray-200'
            } hover:bg-gray-300`}
          >
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={handleScan}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <Camera className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}