
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send, MessageSquare, Users, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import NavBar from '@/components/NavBar';
import Avatar from '@/components/Avatar';
import LanguageTag from '@/components/LanguageTag';
import { useAuth } from '@/hooks/useAuth';

// Mock room data
const MOCK_ROOMS = [
  {
    id: "1",
    name: "English & Hindi Practice",
    description: "A friendly space for beginners to practice speaking English and Hindi.",
    languages: [
      { name: "English", level: "Beginner" },
      { name: "Hindi", level: "Any Level" }
    ],
    isActive: true,
    isOwner: true,
    participants: [
      { name: "John Doe", username: "johndoe", isOnline: true },
      { name: "Jane Smith", username: "janesmith", isOnline: true },
      { name: "Sam Brown", username: "sambrown", isOnline: false }
    ],
    messages: [
      { id: 1, user: { name: "John Doe", username: "johndoe" }, text: "Hello everyone! How are you doing today?", timestamp: "10:32 AM" },
      { id: 2, user: { name: "Jane Smith", username: "janesmith" }, text: "Hi John! I'm good, thanks. How about you?", timestamp: "10:33 AM" },
      { id: 3, user: { name: "Sam Brown", username: "sambrown" }, text: "Hello! I'm new here. Excited to practice English with you all.", timestamp: "10:35 AM" },
      { id: 4, user: { name: "John Doe", username: "johndoe" }, text: "Welcome Sam! We're happy to have you here.", timestamp: "10:36 AM" },
      { id: 5, user: { name: "Jane Smith", username: "janesmith" }, text: "Yes, welcome! What topics are you interested in discussing?", timestamp: "10:38 AM" }
    ]
  },
  {
    id: "2",
    name: "English + Bengali Discussion",
    description: "Join us for interesting discussions about culture and movies in English and Bengali.",
    languages: [
      { name: "English", level: "Any Level" },
      { name: "Bengali", level: "Intermediate" }
    ],
    isActive: true,
    isOwner: false,
    participants: [
      { name: "Alex Johnson", username: "alexj", isOnline: true },
      { name: "Priya Sharma", username: "priyasharma", isOnline: false },
      { name: "Michael Lee", username: "michaell", isOnline: true },
      { name: "Sarah Wilson", username: "sarahw", isOnline: false },
      { name: "David Chen", username: "davidc", isOnline: true }
    ],
    messages: [
      { id: 1, user: { name: "Alex Johnson", username: "alexj" }, text: "What's everyone's favorite Bengali movie?", timestamp: "Yesterday" },
      { id: 2, user: { name: "Priya Sharma", username: "priyasharma" }, text: "I really enjoyed 'Pather Panchali' by Satyajit Ray. It's a classic!", timestamp: "Yesterday" },
      { id: 3, user: { name: "Michael Lee", username: "michaell" }, text: "I haven't seen many Bengali films. Any recommendations for beginners?", timestamp: "Yesterday" },
      { id: 4, user: { name: "Priya Sharma", username: "priyasharma" }, text: "You might want to start with 'Feluda' series, they're detective stories and quite engaging.", timestamp: "Yesterday" }
    ]
  }
];

const RoomDetail = () => {
  const { roomId } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  
  // Find room by ID
  const room = MOCK_ROOMS.find(r => r.id === roomId);
  
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Room not found</h2>
          <Link to="/" className="text-accent hover:underline">
            Return to home page
          </Link>
        </div>
      </div>
    );
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // In a real app, this would send the message to a backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const onlineParticipants = room.participants.filter(p => p.isOnline);
  const offlineParticipants = room.participants.filter(p => !p.isOnline);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-4 flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </Link>
            
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                {room.name}
                {room.isActive && (
                  <span className="ml-2 relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
              </h1>
              
              <div className="flex flex-wrap gap-1 mt-1">
                {room.languages.map((lang, i) => (
                  <LanguageTag key={`${lang.name}-${i}`} language={lang.name} level={lang.level} />
                ))}
              </div>
            </div>
          </div>
          
          {room.isOwner && (
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Room Settings
            </Button>
          )}
        </div>
        
        <div className="flex-1 flex rounded-lg overflow-hidden border shadow-sm">
          <Tabs defaultValue="chat" className="flex flex-col flex-1">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="chat" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="participants" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Participants ({room.participants.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="flex flex-col flex-1 p-0">
              <div className="flex-1 p-4 space-y-4 overflow-auto">
                {room.messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex gap-3 ${msg.user.username === user?.username ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar user={msg.user} size="sm" />
                    
                    <div className={`max-w-[70%] ${msg.user.username === user?.username ? "bg-accent text-accent-foreground" : "bg-muted"} rounded-lg p-3`}>
                      <div className="flex items-baseline justify-between mb-1">
                        <span className={`font-medium text-sm ${msg.user.username === user?.username ? "text-white" : ""}`}>
                          {msg.user.name}
                        </span>
                        <span className={`text-xs ml-2 ${msg.user.username === user?.username ? "text-white/70" : "text-muted-foreground"}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                      <p className={msg.user.username === user?.username ? "text-white" : ""}>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input 
                    placeholder="Type your message..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={!newMessage.trim()} 
                    className="btn-gradient"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="participants" className="flex flex-col flex-1 p-0 overflow-auto">
              <div className="p-4">
                <h4 className="font-medium mb-3 flex items-center">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Online ({onlineParticipants.length})
                </h4>
                
                <div className="space-y-3 mb-6">
                  {onlineParticipants.map((participant, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar user={participant} size="sm" />
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">@{participant.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <h4 className="font-medium mb-3 text-muted-foreground">
                  Offline ({offlineParticipants.length})
                </h4>
                
                <div className="space-y-3">
                  {offlineParticipants.map((participant, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar user={participant} size="sm" />
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">@{participant.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default RoomDetail;
