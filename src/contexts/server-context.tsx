"use client"

import { type ReactNode, createContext, useContext, useState, use } from "react";

type TServerContext = {
  sendMessage: (to: string, message: string) => void
  messages: { user: string, messages: { text: string, sended: boolean }[] }[]
  user?: string
  login: (user: string) => void
  onlineUsers: string[]
}

const ServerContext = createContext<TServerContext | null>(null)

export function ServerProvider({ children }: { children?: ReactNode }) {
  const [messages, setMessages] = useState<{ user: string, message: string, sended: boolean }[]>([])
  const [user, setUser] = useState<string>()
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])

  const ws = new WebSocket(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

  ws.onopen = () => console.log('[server] connected');
  ws.onclose = () => console.log('[server] disconnected');
  ws.onmessage = (event) => {
    const messageData = JSON.parse(event.data);

    if (messageData.type === "ONLINE") {
      setOnlineUsers(messageData.users)
    } else {
      const { to, from, message } = messageData

      if (from && message) setMessages(prevMessages => [...prevMessages, { user: from === user ? to : from, message: message, sended: from === user }])
    }
  };

  const sendMessage = (
    to: string,
    message: string
  ) => user && ws.send(JSON.stringify({
    from: user,
    to,
    message
  }));

  const login = (user: string) => {
    setUser(user)

    ws.send(JSON.stringify({
      type: "LOGIN",
      user: user
    }));
  }

  const currentMessages = messages
    .reduce((result, message) => {
      const userMessagesIndex = result.findIndex(({ user }) => user === message.user)

      if (userMessagesIndex !== -1) {
        const copy = [...result]

        copy[userMessagesIndex].messages = [...copy[userMessagesIndex].messages, { text: message.message, sended: message.sended }]

        return copy
      }

      return [...result, { user: message.user, messages: [{ text: message.message, sended: message.sended }] }]
    }, [] as { user: string, messages: { text: string, sended: boolean }[] }[])

  const blankMessages = onlineUsers
    .filter(user => !currentMessages.some(message => message.user === user))
    .map(user => ({ user, messages: [] }))

  return (
    <ServerContext.Provider
      value={{
        sendMessage,
        messages: [...currentMessages, ...blankMessages],
        user,
        login,
        onlineUsers,
      }}
    >
      {children}
    </ServerContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ServerContext)

  if (!context) throw new Error("'useChat' hook should be used inside a 'ServerProvider' component.")

  return context
}