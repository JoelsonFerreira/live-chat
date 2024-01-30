import { useChat } from "@/contexts/server-context"

import { Message } from "./message"
import { useRouter } from "next/navigation"

export function MessageList({ selected, onClick }: { selected?: string, onClick: (clickedChat: string) => void }) {
  const { messages, user: currentUser } = useChat()
  const { push } = useRouter()

  return (
    <section className="flex flex-col gap-2">
      {messages
        .map(({ user, messages }, idx) => (
          user !== currentUser &&
          <Message
            key={idx}
            author={user}
            message={messages[messages.length - 1]}
            onClick={() => {
              const width = window.innerWidth

              if (width >= 1024) return onClick(user)

              push(`/profile/${user}/message`)
            }}
            selected={selected === user}
          />
        ))
      }
    </section>
  )
}