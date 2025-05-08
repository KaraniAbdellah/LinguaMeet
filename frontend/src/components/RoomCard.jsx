
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Avatar from './Avatar';
import LanguageTag from './LanguageTag';

const RoomCard = ({ room }) => {
  return (
    <Card className="glass-card overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <div>
          <div className="flex gap-2 items-center">
            <h3 className="font-bold text-lg">{room.name}</h3>
            {room.isActive && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {room.languages.map((lang, i) => (
              <LanguageTag key={`${lang.name}-${i}`} language={lang.name} level={lang.level} />
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <p className="text-muted-foreground text-sm line-clamp-2">{room.description}</p>
        
        <div className="flex -space-x-2 mt-4">
          {room.participants.slice(0, 3).map((participant, i) => (
            <Avatar key={i} user={participant} size="sm" />
          ))}
          
          {room.participants.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">
              +{room.participants.length - 3}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2 flex justify-between">
        <div className="flex items-center text-muted-foreground text-xs">
          <Users className="h-3 w-3 mr-1" />
          <span>{room.participants.length} participants</span>
        </div>
        
        <div className="flex gap-2">
          {room.isOwner && (
            <Button variant="outline" size="sm">
              <Settings className="h-3 w-3 mr-1" />
              Settings
            </Button>
          )}
          <Button size="sm" className="btn-gradient">
            <Link to={`/room/${room.id}`} className="flex items-center">
              Join
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
