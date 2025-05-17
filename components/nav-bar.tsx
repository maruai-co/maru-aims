"use client"

import { UserAvatar } from "@/components/user-avatar"

interface NavBarProps {
  title: string
}

export function NavBar({ title }: NavBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-background border-b border-border z-40 ml-[16rem]">
      <div className="flex h-[5.5rem] items-center px-6">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <div className="ml-auto">
          <UserAvatar />
        </div>
      </div>
    </div>
  )
}