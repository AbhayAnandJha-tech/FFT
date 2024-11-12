"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  Send,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Smile,
  Hand,
  FileTextIcon,
} from "lucide-react";

export default function VideoLecture() {
  const [messages, setMessages] = useState([
    { id: 1, user: "Abhay", content: "Great lecture so far!" },
    {
      id: 2,
      user: "Krishna",
      content: "I have a question about the last slide.",
    },
  ]);
  const [handRaised, setHandRaised] = useState(false);

  const sendMessage = (content: string) => {
    setMessages([
      ...messages,
      { id: messages.length + 1, user: "You", content },
    ]);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background text-foreground">
      <div className="flex-grow md:w-3/4 p-4">
        <div className="aspect-video bg-black mb-4">
          <video className="w-full h-full" controls>
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex flex-row">
          <div className="flex-grow">
            <h1 className="text-2xl font-bold mb-2">
              The Teddy and the Butterfly
            </h1>
            <p className="text-muted-foreground mb-4">
              Learn about the power of play and creativity in engineering
            </p>
          </div>
          <div>
            <div className="w-full md:w-1/3 flex flex-row gap-x-4">
              <Button variant="outline" className={"bg-blue-100 text-blue-600"}>
                <Hand className="mr-2 h-4 w-4" />
                {"Raise Hand"}
              </Button>
              <Button variant="outline">
                <FileTextIcon className="mr-2 h-4 w-4" />
                {"Show Lecture PDF"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/4 p-4 border-l">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Chat</h2>
            <Button variant="outline" size="sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              Ask Doubt
            </Button>
          </div>
          <ScrollArea className="flex-grow mb-4">
            {messages.map((message) => (
              <div key={message.id} className="mb-4">
                <div className="flex items-center mb-1">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage
                      src={`/placeholder-user.jpg`}
                      alt={message.user}
                    />
                    <AvatarFallback>{message.user[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{message.user}</span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </ScrollArea>
          <Separator className="my-2" />
          <div className="flex space-x-2 mb-2">
            <Button variant="outline" size="sm">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem(
                "message"
              ) as HTMLInputElement;
              if (input.value.trim()) {
                sendMessage(input.value);
                input.value = "";
              }
            }}
            className="flex space-x-2"
          >
            <Input id="message" placeholder="Type a message..." />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
