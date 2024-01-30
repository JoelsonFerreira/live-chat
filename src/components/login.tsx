import { ChevronRight } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { useChat } from "@/contexts/server-context";

export function Login() {
  const { login } = useChat()

  return (
    <main className="min-h-screen p-4 flex flex-col gap-4 justify-center items-center">
      <form className="flex items-center gap-2" onSubmit={(event) => {
        event.stopPropagation();
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const username = data.get("username")?.toString().trim()

        if (username && username.length > 0) login(username)
      }}>
        <Input placeholder="Digite um nome de usuário" name="username" />
        <Button type="submit">
          <ChevronRight color="#FFF" />
        </Button>
      </form>
    </main>
  );
}