"use client"

import { ChevronRight } from "lucide-react";

import { BackButton } from "@/components/back-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/server-context";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Chat({ authorId, showBackButton, className }: { authorId: string, showBackButton: boolean, className?: string }) {
  const { sendMessage, messages, user } = useChat()

  const userMessages = messages.find(message => message.user === authorId)

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row gap-2 items-center justify-start space-y-0">
        {showBackButton && <BackButton />}
        <CardTitle>{authorId}</CardTitle>
      </CardHeader>

      <CardContent className="grow overflow-y-auto grid gap-2 content-start">
        {userMessages?.messages.map((message, idx) => (
          message.sended ?
            <li key={idx} className="list-none flex items-start gap-2 justify-end">
              <div className="flex flex-col items-end">
                <span className="block bg-gray-200 py-2 px-4 rounded-2xl rounded-tr-none">{message.text}</span>
                <span className={`text-gray-500`}>{message?.time.getHours()}:{message?.time.getMinutes()}</span>
              </div>
              <Avatar>
                <AvatarFallback className="bg-gray-800 text-gray-200">{user?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </li> :
            <li key={idx} className="list-none flex items-start gap-2">
              <Avatar>
                <AvatarFallback className="bg-gray-800 text-gray-200">{authorId.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="block bg-gray-200 py-2 px-4 rounded-2xl rounded-tl-none">{message.text}</span>
                <span className={`text-gray-500`}>{message?.time.getHours()}:{message?.time.getMinutes()}</span>
              </div>
            </li>
        ))}
      </CardContent>

      <CardFooter>
        <form className="w-full flex items-center gap-2" onSubmit={(event) => {
          event.stopPropagation();
          event.preventDefault();

          const data = new FormData(event.currentTarget);

          const message = data.get("message")?.toString().trim()

          if (message && message.length > 0) sendMessage(authorId, message)

          event.currentTarget.message.value = "";
        }}>
          <Input placeholder="Escreva sua mensagem..." name="message" />
          <Button type="submit">
            <ChevronRight color="#FFF" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}