"use client"

import { redirect, useRouter } from "next/navigation";

import { useState, type MouseEventHandler } from "react";

import { ChevronRight, UserRound } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Chat } from "@/components/chat";

import { useChat } from "@/contexts/server-context";

type Message = {
  author: string,
  message?: {
    text: string;
    sended: boolean;
  },
  createdAt: Date,
  onClick: MouseEventHandler<HTMLButtonElement>
}

function Message({
  author,
  message,
  createdAt,
  onClick,
}: Message) {
  return (
    <Button onClick={onClick} className="flex items-center gap-2 relative w-full">
      <div className="w-12 h-w-12 min-w-12 min-h-12 rounded-full bg-gray-200 animate-pulse grid place-items-center">
        <UserRound color="#888" />
      </div>
      <div className="grow overflow-hidden flex flex-col items-start justify-between h-full gap-2">
        <strong className="text-gray-800">{author}</strong>
        <div className="truncate text-gray-500">{message?.sended ? "You: " : ""}{message?.text}</div>
      </div>
      <span className="absolute top-0 right-0 text-gray-500">{createdAt.getHours()}:{createdAt.getMinutes()}</span>
    </Button>
  )
}

export default function Home() {
  const { messages, user: currentUser, login } = useChat()
  const [selectedChat, setSelectedChat] = useState<string>()
  const { push } = useRouter()

  if (!currentUser)
    return (
      <main className="min-h-screen p-4 flex flex-col gap-4 justify-center items-center">
        <form className="flex items-center gap-2" onSubmit={(event) => {
          event.stopPropagation();
          event.preventDefault();

          const data = new FormData(event.currentTarget);

          const username = data.get("username")?.toString().trim()

          if (username && username.length > 0) login(username)
        }}>
          <Input placeholder="Digite um nome de usuário" className="rounded-full h-10" name="username" />
          <Button className="bg-cyan-800 rounded-full p-2" type="submit">
            <ChevronRight color="#FFF" />
          </Button>
        </form>
      </main>
    )

  return (
    <div className="min-h-screen grid place-items-center">
      <main className="w-full h-full max-w-7xl max-h-[60rem] flex">
        <aside className="flex flex-col gap-4 w-full lg:max-w-lg p-4">
          <header className="flex items-center gap-2 h-12">
            <strong className="text-gray-800">Hello, {currentUser}</strong>
          </header>

          <section className="flex flex-col gap-4">
            {messages
              .map(({ user, messages }, idx) => (
                user !== currentUser &&
                <Message
                  key={idx}
                  author={user}
                  message={messages[messages.length - 1]}
                  createdAt={new Date()}
                  onClick={() => {
                    const width = window.innerWidth

                    if (width >= 1024) return setSelectedChat(user)

                    push(`/profile/${user}/message`)
                  }}
                />
              ))
            }
          </section>
        </aside>
        {selectedChat && <Chat className="hidden lg:flex" authorId={selectedChat} showBackButton={false} />}
      </main>
    </div>
  );
}
