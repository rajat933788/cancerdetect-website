import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, X, Send, Bot, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { HfInference } from "@huggingface/inference";
import { ChevronUp, ChevronDown } from "lucide-react";

const HF_API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN;
const hf = new HfInference(HF_API_TOKEN);

const faqData = [
    {
        question: "What is thyroid cancer?",
        answer: "Thyroid cancer is a type of cancer that starts in the thyroid gland, which is located at the base of your neck. The thyroid produces hormones that regulate heart rate, blood pressure, body temperature, and weight."
    },
    {
        question: "What are the risk factors for thyroid cancer?",
        answer: "Risk factors include exposure to high levels of radiation, family history of thyroid cancer, certain genetic syndromes, being female, and age (thyroid cancer can occur at any age)."
    },
    {
        question: "How does the risk assessment tool work?",
        answer: "Our AI-powered risk assessment tool analyzes various factors such as age, gender, family history, and symptoms to provide a personalized risk assessment. It's important to note that this is not a diagnosis but a tool to help you understand potential risks."
    },
    {
        question: "Where can I find more information about treatment options?",
        answer: "You can check our 'Learn About Thyroid Cancer' section or visit the dashboard for comprehensive information about treatment options, including surgery, radioactive iodine therapy, hormone therapy, and targeted drug therapy."
    }
];

const fetchHuggingFaceResponse = async (message) => {
    try {
        // Create a context for the model about thyroid cancer
        const systemPrompt = `You are a helpful thyroid cancer information assistant. Provide accurate, compassionate, and concise responses about thyroid cancer, symptoms, diagnosis, and treatment. Limit responses to 2-3 sentences when possible.`;
        
        const userMessage = message;
        const response = await hf.textGeneration({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            inputs: `<s>[INST] ${systemPrompt}\n\nUser question: ${userMessage} [/INST]`,
            parameters: {
                max_new_tokens: 150,
                temperature: 0.7,
                top_p: 0.95,
                repetition_penalty: 1.2
            }
        });
        
        let responseText = response.generated_text;
        
        // Extract just the assistant's response (remove the prompt)
        const assistantResponseMatch = responseText.match(/\[\/INST\](.*)/s);
        if (assistantResponseMatch && assistantResponseMatch[1]) {
            responseText = assistantResponseMatch[1].trim();
        }
        
        return responseText || generateLocalResponse(message);
    } catch (error) {
        console.error("Error fetching from Hugging Face:", error);
        // Fallback to local response
        return generateLocalResponse(message);
    }
};

// Fallback function for local response generation
const generateLocalResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    
    // Check for matches in FAQ data
    for (const faq of faqData) {
        if (
            lowerCaseMessage.includes(faq.question.toLowerCase()) ||
            faq.question.toLowerCase().includes(lowerCaseMessage)
        ) {
            return faq.answer;
        }
    }

    // Check for specific keywords
    if (lowerCaseMessage.includes("symptom")) {
        return "Common symptoms of thyroid cancer include a lump in the neck, swollen lymph nodes, pain in the neck or throat, voice changes, and difficulty swallowing. However, many people with thyroid cancer don't have symptoms at early stages.";
    } else if (lowerCaseMessage.includes("test") || lowerCaseMessage.includes("diagnos")) {
        return "Thyroid cancer is typically diagnosed through physical examination, blood tests, imaging tests (ultrasound, CT scan), and biopsy. Our risk assessment tool can help identify if you should consider speaking with a healthcare provider.";
    } else if (lowerCaseMessage.includes("prevent")) {
        return "While you can't prevent thyroid cancer, you can reduce risk by avoiding unnecessary radiation exposure and maintaining a healthy lifestyle. Regular neck checks and medical check-ups can help with early detection.";
    } else if (lowerCaseMessage.includes("dashboard") || lowerCaseMessage.includes("data")) {
        return "Our dashboard provides visualizations of thyroid cancer statistics and trends. You can access it from the main menu or by clicking on 'View Dashboard' in the tools section.";
    } else if (lowerCaseMessage.includes("assessment") || lowerCaseMessage.includes("risk")) {
        return "You can assess your thyroid cancer risk using our AI tool. Click on 'Check Thyroid Cancer Risk' from the main page to get started. The assessment is confidential and takes about 5 minutes to complete.";
    } else if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
        return "Hello! I'm here to help answer your questions about thyroid cancer and guide you through our platform. What would you like to know?";
    } else if (lowerCaseMessage.includes("thank")) {
        return "You're welcome! If you have any more questions, feel free to ask. Your health matters to us.";
    }

    return "I don't have specific information about that. For detailed medical advice, please consult a healthcare professional.";
};

const ThyroidChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: "bot",
            text: "👋 Hi there! I'm your Thyroid Cancer Awareness assistant. How can I help you today?",
            timestamp: new Date()
        },
        {
            id: 2,
            type: "bot",
            text: "You can ask me questions about thyroid cancer, risk factors, symptoms, or how to use this platform.",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [apiEnabled, setApiEnabled] = useState(true); // Toggle for API vs local responses
    const [suggestedQuestions, setSuggestedQuestions] = useState([
        "What is thyroid cancer?",
        "How does the risk assessment work?",
        "What are common symptoms?",
        "How can I navigate this website?"
    ]);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const scrollAreaRef = useRef(null);

    useEffect(() => {
        // Auto-scroll to the newest message when messages change
        if (scrollAreaRef.current && messages.length > 0) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                const lastMessageElement = document.getElementById(`message-${messages[messages.length - 1].id}`);
                if (lastMessageElement) {
                    lastMessageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    }, [messages, isTyping]);
    
    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSuggestedQuestionClick = (question) => {
        handleSendMessage(question);
    };


    const handleToggleApi = () => {
        setApiEnabled(!apiEnabled);
    };

    const handleSendMessage = async (messageText = inputValue) => {
        if (!messageText.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            type: "user",
            text: messageText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Save user question to Firestore (optional)
        try {
            await addDoc(collection(db, "chatQuestions"), {
                question: messageText,
                timestamp: serverTimestamp()
            });
        } catch (error) {
            console.error("Error saving chat question:", error);
        }

        // Get response (from API or local depending on toggle)
        try {
            let botResponse;
            
            if (apiEnabled) {
                botResponse = await fetchHuggingFaceResponse(messageText);
            } else {
                botResponse = generateLocalResponse(messageText);
            }
            
            setTimeout(() => {
                const newBotMessage = {
                    id: Date.now() + 1,
                    type: "bot",
                    text: botResponse,
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, newBotMessage]);
                setIsTyping(false);

                updateSuggestedQuestions(messageText.toLowerCase());
            }, 1000); 
        } catch (error) {
            console.error("Error getting response:", error);
            setIsTyping(false);
            
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: "bot",
                text: "Sorry, I'm having trouble connecting to my knowledge base. Please try again later.",
                isError: true,
                timestamp: new Date()
            }]);
        }
    };

    const updateSuggestedQuestions = (message) => {
        if (message.includes("symptom")) {
            setSuggestedQuestions([
                "How are symptoms different in men and women?",
                "At what stage do symptoms appear?",
                "What is the risk assessment tool?",
                "When should I see a doctor?"
            ]);
        } else if (message.includes("treatment")) {
            setSuggestedQuestions([
                "What treatment options exist?",
                "Is surgery always needed?",
                "What about radioactive iodine?",
                "What's the recovery process like?"
            ]);
        } else if (message.includes("diagnos")) {
            setSuggestedQuestions([
                "How accurate are thyroid biopsies?",
                "What blood tests are needed?",
                "What's involved in a thyroid scan?",
                "How long do results take?"
            ]);
        } else {
            setSuggestedQuestions([
                "What are risk factors?",
                "How is thyroid cancer diagnosed?",
                "Tell me about treatment options",
                "What does the dashboard show?"
            ]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <>
            {!isOpen && (
                <div className="fixed bottom-8 right-8 z-50">
                    <Button
                        onClick={toggleChat}
                        className="rounded-full p-4 shadow-xl bg-purple-600 hover:bg-purple-700"
                        size="icon"
                    >
                        <MessageCircle className="w-6 h-6" />
                    </Button>
                </div>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="fixed bottom-5 right-2 z-50 w-96 h-auto flex flex-col bg-white shadow-2xl rounded-xl border border-purple-200 overflow-hidden"
                    >
                        <Card className="w-full h-full flex flex-col shadow-xl border-2 border-purple-200 rounded-xl">
                            
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8 bg-white text-purple-600">
                                        <Bot className="h-8 w-8" />
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold text-lg">Thyroid Helper</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs flex items-center">
                                                <span className="h-2 w-2 rounded-full bg-green-400 mr-1"></span>
                                                Online
                                            </span>
                                            <Badge 
                                                variant="outline" 
                                                className="text-xs bg-white/20 border-white/30 text-white cursor-pointer"
                                                onClick={handleToggleApi}
                                            >
                                                {apiEnabled ? "AI: On" : "AI: Off"}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white hover:bg-white/20 rounded-full h-8 w-8"
                                    onClick={toggleChat}
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <ScrollArea className="h-[320px] p-4" scrollable ref={scrollAreaRef}>
                                <div className="space-y-4 pb-2">
                                {messages.map((msg, index) => (
                                    <div 
                                        key={msg.id} 
                                        id={`message-${msg.id}`}
                                        className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                                                msg.type === "user" 
                                                    ? "bg-purple-600 text-white" 
                                                    : msg.isError 
                                                        ? "bg-red-50 text-red-600 border border-red-200" 
                                                        : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {msg.text}
                                            <div className="text-xs opacity-70 mt-1 text-right">
                                                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                    {isTyping && (
                                        <div className="flex">
                                            <div className="bg-gray-100 rounded-2xl p-3 shadow-sm">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>

                            {/* Suggested questions with minimize button */}
                            <div className="bg-gray-50 -mt-3">
                                <div className="flex justify-between items-center px-3 py-2 border-b border-gray-100">
                                    <p className="text-xs text-gray-500">Suggested questions:</p>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 rounded-full hover:bg-gray-200"
                                        onClick={() => setShowSuggestions(!showSuggestions)}
                                    >
                                        {showSuggestions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </Button>
                                </div>
                                
                                {showSuggestions && (
                                    <div className="p-2">
                                        <div className="flex flex-wrap gap-2">
                                            {suggestedQuestions.map((question, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                    className="bg-white hover:bg-purple-50 text-purple-700 cursor-pointer transition-colors border border-purple-200"
                                                    onClick={() => handleSuggestedQuestionClick(question)}
                                                >
                                                    {question}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input area */}
                            <div className="p-3 bg-white border-t border-purple-100 flex items-center gap-2">
                                <Input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your message..."
                                    className="flex-1 focus-visible:ring-purple-500"
                                />
                                <Button 
                                    onClick={() => handleSendMessage()} 
                                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                                    size="icon"
                                    disabled={!inputValue.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ThyroidChatbot;