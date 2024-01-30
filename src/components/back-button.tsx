"use client"

import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BackButton() {
  const { back } = useRouter()

  return (
    <Button onClick={back}>
      <ChevronLeft />
    </Button>
  )
}