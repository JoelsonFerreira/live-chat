import type { MouseEventHandler } from "react";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

export type Message = {
  author: string,
  message?: {
    text: string;
    sended: boolean;
    time: Date
  },
  onClick: MouseEventHandler<HTMLButtonElement>
  selected: boolean
}

export function Message({
  author,
  message,
  onClick,
  selected
}: Message) {
  return (
    <Button onClick={onClick} variant={selected ? "default" : "outline"} className={`flex items-center gap-2 relative w-full h-max`}>
      <Avatar>
        <AvatarFallback className="text-gray-800">{author.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="grow overflow-hidden flex flex-col items-start justify-between h-full gap-2">
        <strong className={`${selected ? "text-gray-200" : "text-gray-800"}`}>{author}</strong>
        <div className={`truncate ${selected ? "text-gray-300" : "text-gray-500"}`}>{message?.sended ? "You: " : ""}{message?.text}</div>
      </div>
      {message && <span className={`absolute top-2 right-4 ${selected ? "text-gray-300" : "text-gray-500"}`}>{message?.time.getHours()}:{message?.time.getMinutes()}</span>}
    </Button>
  )
}