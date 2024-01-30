"use client"

import { ChevronRight } from "lucide-react";

import { BackButton } from "@/components/back-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/server-context";

export function Chat({ authorId, showBackButton, className }: { authorId: string, showBackButton: boolean, className?: string }) {
  const { sendMessage, messages, user } = useChat()

  const userMessages = messages.find(message => message.user === authorId)

  return (
    <main className={"w-full h-full flex flex-col gap-4 bg-slate-50 " + className}>
      <header className="flex items-center gap-2 p-4 bg-slate-600">
        {showBackButton && <BackButton />}
        <strong className="text-white">{authorId}</strong>
      </header>

      <ul className="grow p-4">
        {userMessages?.messages.map(message => (
          message.sended ?
            <li className="flex items-center gap-2 justify-end">
              <span className="block bg-white py-2 px-4 rounded-2xl rounded-tr-none">{message.text}</span>
              <strong className="block">{user}</strong>
            </li> :
            <li className="flex items-center gap-2">
              <strong className="block">{authorId}</strong>
              <span className="block bg-white py-2 px-4 rounded-2xl rounded-tl-none">{message.text}</span>
            </li>
        ))}
      </ul>

      <form className="flex items-center gap-2 p-4" onSubmit={(event) => {
        event.stopPropagation();
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const message = data.get("message")?.toString().trim()

        if (message && message.length > 0) sendMessage(authorId, message)

        event.currentTarget.message.value = "";
      }}>
        <Input placeholder="Escreva sua mensagem..." className="rounded-full h-10" name="message" />
        <Button className="bg-cyan-800 rounded-full p-2" type="submit">
          <ChevronRight color="#FFF" />
        </Button>
      </form>
    </main>
  );
}