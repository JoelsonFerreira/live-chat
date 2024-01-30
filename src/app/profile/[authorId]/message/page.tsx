import { Chat } from "@/components/chat";

export default function Messages({
  params: {
    authorId,
  }
}: {
  params: {
    authorId: string,
  }
}) {
  return (
    <div className="min-h-svh grid place-items-center">
      <main className="w-full h-full max-w-7xl flex">
        <Chat authorId={authorId} showBackButton={true} className="w-full h-full flex flex-col" />
      </main>
    </div>
  );
}