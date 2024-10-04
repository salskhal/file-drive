"use client";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useSession,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Key } from "lucide-react";

export default function Home() {
  // const session = useSession();

  const files = useQuery(api.files.getFiles);
  const createFile = useMutation(api.files.createFiles);

  console.log(files);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button>Click me</Button>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <h1 className="text-4xl font-bold">Welcome to your new app!</h1>

      <SignedIn>
        <div>
          <SignOutButton />
        </div>
      </SignedIn>

      <h2 className="text-2xl font-semibold">Files</h2> 
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}

      <Button
        onClick={() => {
          createFile({
            name: "Hello, world!",
          });
        }}
      >
        Click me
      </Button>
    </div>
  );
}
