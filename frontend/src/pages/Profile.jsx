
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LogOut, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import NavBar from '@/components/NavBar';
import Avatar from '@/components/Avatar';
import LanguageTag from '@/components/LanguageTag';
import { useAuth } from '@/hooks/useAuth';

const languages = [
  "English", "Spanish", "French", "German", "Italian", "Japanese", "Korean",
  "Chinese", "Russian", "Arabic", "Hindi", "Bengali", "Urdu", "Tamil", "Telugu", 
  "Vietnamese", "Turkish", "Indonesian", "Nepali"
];

const levels = ["Beginner", "Intermediate", "Advanced", "Native"];

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    username: user?.username || '',
  });

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedLevel, setSelectedLevel] = useState('Beginner');

  const handleAddLanguage = () => {
    if (user.languages.some(l => l.name === selectedLanguage)) return;
    
    const updatedLanguages = [
      ...user.languages,
      { name: selectedLanguage, level: selectedLevel }
    ];
    
    updateProfile({ languages: updatedLanguages });
  };

  const handleRemoveLanguage = (languageName) => {
    const updatedLanguages = user.languages.filter(l => l.name !== languageName);
    updateProfile({ languages: updatedLanguages });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile(profileData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  <Avatar user={user} size="lg" />
                </div>
                <CardTitle className="text-2xl">{user?.name}</CardTitle>
                <CardDescription>@{user?.username}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">My Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {user?.languages?.map((lang) => (
                      <div key={lang.name} className="flex items-center">
                        <LanguageTag language={lang.name} level={lang.level} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-12 md:col-span-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Update your profile information and preferences</CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="profile">
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="profile" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Language Preferences
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile">
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={profileData.name} 
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input 
                            id="username" 
                            value={profileData.username} 
                            onChange={(e) => setProfileData({...profileData, username: e.target.value})} 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profileData.email} 
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})} 
                        />
                      </div>
                      
                      <Button type="submit" className="btn-gradient">
                        Save Changes
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="preferences">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">My Languages</h3>
                        
                        <div className="grid gap-4">
                          <div className="flex flex-wrap gap-2">
                            {user?.languages?.map((lang) => (
                              <div key={lang.name} className="bg-accent/10 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                {lang.name} ({lang.level})
                                <button 
                                  onClick={() => handleRemoveLanguage(lang.name)}
                                  className="text-xs hover:text-destructive"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="language">Language</Label>
                              <Select 
                                value={selectedLanguage} 
                                onValueChange={setSelectedLanguage}
                              >
                                <SelectTrigger id="language">
                                  <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                <SelectContent>
                                  {languages.map(language => (
                                    <SelectItem key={language} value={language}>
                                      {language}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label htmlFor="level">Level</Label>
                              <Select 
                                value={selectedLevel} 
                                onValueChange={setSelectedLevel}
                              >
                                <SelectTrigger id="level">
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent>
                                  {levels.map(level => (
                                    <SelectItem key={level} value={level}>
                                      {level}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex items-end">
                              <Button 
                                type="button" 
                                className="btn-gradient" 
                                onClick={handleAddLanguage}
                              >
                                Add Language
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
