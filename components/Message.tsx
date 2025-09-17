import React from 'react';
import { ChatMessage, MessageSender } from '../types';
import { UserIcon } from './icons/UserIcon';
import { AiIcon } from './icons/AiIcon';

interface MessageProps {
  message: ChatMessage;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === MessageSender.USER;

  const wrapperClasses = `flex items-start gap-4 p-4 ${isUser ? '' : 'bg-slate-800/50'}`;
  const iconWrapperClasses = `flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-indigo-500' : 'bg-sky-500'}`;
  const textClasses = 'text-slate-300 leading-relaxed';

  return (
    <div className={wrapperClasses}>
      <div className={iconWrapperClasses}>
        {isUser ? <UserIcon className="w-5 h-5" /> : <AiIcon className="w-5 h-5" />}
      </div>
      <div className="flex-1 pt-1">
        <p className="font-bold text-slate-100 mb-1">{isUser ? 'You' : 'DevOps Assistant'}</p>
        <div className={textClasses} dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }} />
      </div>
    </div>
  );
};
