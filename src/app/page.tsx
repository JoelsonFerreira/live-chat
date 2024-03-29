"use client"
import { useState } from "react";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";

import { Chat } from "@/components/chat";
import { Login } from "@/components/login";
import { MessageList } from "@/components/message-list";

import { useChat } from "@/contexts/server-context";

export default function Home() {
  const { user: currentUser } = useChat()
  const [selectedChat, setSelectedChat] = useState<string>()

  if (!currentUser) return <Login />

  return (
    <div className="min-h-screen grid place-items-center">
      <Card className="w-full h-full max-w-7xl max-h-[60rem] flex">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="flex flex-col gap-4 w-full lg:max-w-lg p-4" minSize={20}>
            <header className="flex items-center gap-2 h-12">
              <strong className="text-gray-800">Hello, {currentUser}</strong>
            </header>

            <MessageList onClick={setSelectedChat} selected={selectedChat} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={65} className="hidden lg:block">
            {selectedChat && <Chat authorId={selectedChat} showBackButton={false} className="h-full flex flex-col" />}
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </div>
  );
}
