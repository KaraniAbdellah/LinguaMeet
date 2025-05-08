
import React from 'react';
import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Avatar = ({ user, size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };
  
  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <UIAvatar className={sizeClasses[size]}>
      <AvatarImage src={user?.avatarUrl} />
      <AvatarFallback className="language-gradient text-white">
        {getInitials(user?.name || user?.username)}
      </AvatarFallback>
    </UIAvatar>
  );
};

export default Avatar;
