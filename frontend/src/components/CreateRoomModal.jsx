
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";

const languages = [
  "English", "Spanish", "French", "German", "Italian", "Japanese", "Korean",
  "Chinese", "Russian", "Arabic", "Hindi", "Bengali", "Urdu", "Tamil", "Telugu", 
  "Vietnamese", "Turkish", "Indonesian", "Nepali"
];

const levels = ["Beginner", "Intermediate", "Advanced", "Native", "Any Level"];

const CreateRoomModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    languages: [],
  });
  const { toast } = useToast();

  const handleAddLanguage = (newLanguage, level) => {
    if (formData.languages.some(l => l.name === newLanguage)) return;
    setFormData({
      ...formData,
      languages: [...formData.languages, { name: newLanguage, level }]
    });
  };

  const handleRemoveLanguage = (language) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter(l => l.name !== language)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Please provide a room name",
        variant: "destructive"
      });
      return;
    }

    if (formData.languages.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one language",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would create the room in a database
    // For this example, we'll just show a success message
    toast({
      title: "Success!",
      description: "Your room has been created",
    });

    setOpen(false);
    setFormData({ name: '', description: '', languages: [] });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="btn-gradient">
        <Plus className="h-4 w-4 mr-2" />
        Create a new group
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="text-2xl">Create a New Language Room</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Room Name</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  placeholder="English Conversation Practice" 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  placeholder="A friendly space to practice everyday English conversations..."
                  rows={3}
                />
              </div>

              <div className="grid gap-4">
                <Label>Languages</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.languages.map((lang) => (
                    <div 
                      key={lang.name} 
                      className="bg-accent/10 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {lang.name} ({lang.level})
                      <button 
                        type="button"
                        onClick={() => handleRemoveLanguage(lang.name)}
                        className="text-xs hover:text-destructive"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Select onValueChange={value => {
                    const [language, level] = value.split('|');
                    handleAddLanguage(language, level);
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Add language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(language => (
                        <React.Fragment key={language}>
                          {levels.map(level => (
                            <SelectItem key={`${language}|${level}`} value={`${language}|${level}`}>
                              {language} ({level})
                            </SelectItem>
                          ))}
                        </React.Fragment>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="btn-gradient">
                Create Room
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateRoomModal;
