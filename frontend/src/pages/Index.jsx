
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import CreateRoomModal from '@/components/CreateRoomModal';
import RoomCard from '@/components/RoomCard';
import LanguageFilters from '@/components/LanguageFilters';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

// Mock rooms data
const MOCK_ROOMS = [
  {
    id: 1,
    name: "English & Hindi Practice",
    description: "A friendly space for beginners to practice speaking English and Hindi.",
    languages: [
      { name: "English", level: "Beginner" },
      { name: "Hindi", level: "Any Level" }
    ],
    isActive: true,
    isOwner: true,
    participants: [
      { name: "John Doe", username: "johndoe" },
      { name: "Jane Smith", username: "janesmith" },
      { name: "Sam Brown", username: "sambrown" }
    ]
  },
  {
    id: 2,
    name: "English + Bengali Discussion",
    description: "Join us for interesting discussions about culture and movies in English and Bengali.",
    languages: [
      { name: "English", level: "Any Level" },
      { name: "Bengali", level: "Intermediate" }
    ],
    isActive: true,
    isOwner: false,
    participants: [
      { name: "Alex Johnson", username: "alexj" },
      { name: "Priya Sharma", username: "priyasharma" },
      { name: "Michael Lee", username: "michaell" },
      { name: "Sarah Wilson", username: "sarahw" },
      { name: "David Chen", username: "davidc" }
    ]
  },
  {
    id: 3,
    name: "English Practice Group",
    description: "Daily English practice for all levels. We discuss everyday topics and help each other improve.",
    languages: [
      { name: "English", level: "Any Level" }
    ],
    isActive: false,
    isOwner: false,
    participants: [
      { name: "Robert Miller", username: "robertm" },
      { name: "Emily White", username: "emilyw" }
    ]
  },
  {
    id: 4,
    name: "Urdu Conversation Circle",
    description: "Practice Urdu in a supportive environment. All levels welcome!",
    languages: [
      { name: "Urdu", level: "Any Level" }
    ],
    isActive: true,
    isOwner: false,
    participants: [
      { name: "Ahmed Khan", username: "ahmedk" },
      { name: "Fatima Ali", username: "fatimaa" },
      { name: "Hassan Malik", username: "hassanm" }
    ]
  },
  {
    id: 5,
    name: "Telugu Learning Community",
    description: "Learn and practice Telugu with native speakers.",
    languages: [
      { name: "Telugu", level: "Beginner" },
      { name: "English", level: "Intermediate" }
    ],
    isActive: true,
    isOwner: false,
    participants: [
      { name: "Ravi Kumar", username: "ravik" },
      { name: "Sunita Reddy", username: "sunitar" }
    ]
  },
  {
    id: 6,
    name: "French & Vietnamese Exchange",
    description: "Cultural and language exchange between French and Vietnamese speakers.",
    languages: [
      { name: "French", level: "Intermediate" },
      { name: "Vietnamese", level: "Intermediate" }
    ],
    isActive: false,
    isOwner: false,
    participants: [
      { name: "Pierre Dubois", username: "pierred" },
      { name: "Linh Nguyen", username: "linhn" },
      { name: "Sophie Martin", username: "sophiem" }
    ]
  },
];

const allLanguages = [
  "English", "Spanish", "French", "German", "Italian", "Japanese", "Korean",
  "Chinese", "Russian", "Arabic", "Hindi", "Bengali", "Urdu", "Tamil", "Telugu", 
  "Vietnamese", "Turkish", "Indonesian", "Nepali"
];

const Index = () => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [expandedFilters, setExpandedFilters] = useState(false);
  const { isAuthenticated } = useAuth();

  // Filter rooms based on selected languages
  const filteredRooms = MOCK_ROOMS.filter(room => {
    if (selectedLanguages.length === 0) return true;
    return room.languages.some(lang => selectedLanguages.includes(lang.name));
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Language Practice Community</h1>
            <p className="text-muted-foreground">Join language rooms to practice with natives and learners</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <CreateRoomModal />
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <div className="mb-6">
              <LanguageFilters 
                allLanguages={allLanguages} 
                selectedLanguages={selectedLanguages} 
                setSelectedLanguages={setSelectedLanguages}
                expanded={expandedFilters}
                setExpanded={setExpandedFilters}
              />
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <span className="language-gradient w-2 h-2 rounded-full inline-block mr-2"></span>
                Active Rooms
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="bg-muted w-2 h-2 rounded-full inline-block mr-2"></span>
                All Rooms
              </Button>
              {isAuthenticated && (
                <Button variant="ghost" className="w-full justify-start">
                  <span className="bg-primary w-2 h-2 rounded-full inline-block mr-2"></span>
                  My Rooms
                </Button>
              )}
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            {filteredRooms.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No rooms found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or create a new room</p>
                <CreateRoomModal />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map(room => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-6 bg-card border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 LanguageMate. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
