"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  MessageCircle,
  Send,
  ThumbsUp,
  Heart,
  Smile,
  Hand,
  FileText,
  PlayCircle,
  PauseCircle,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying) {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 1
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const sendMessage = (content: string) => {
    setMessages([
      ...messages,
      { id: messages.length + 1, user: "You", content },
    ]);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-b from-yellow-50 to-white text-gray-800">
      <div className="flex-grow md:w-3/4 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="aspect-video bg-black mb-6 rounded-lg overflow-hidden shadow-lg relative"
        >
          <video className="w-full h-full" controls={false}>
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-center justify-between text-white mb-2">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-yellow-400"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <PauseCircle size={24} />
                  ) : (
                    <PlayCircle size={24} />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-yellow-400"
                >
                  <SkipBack size={24} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-yellow-400"
                >
                  <SkipForward size={24} />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-yellow-400"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              The Teddy and the Butterfly
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Learn about the power of play and creativityyyyyyyy in engineering
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Button
              variant="outline"
              className={`${
                handRaised
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-white text-gray-800"
              } border-2 border-yellow-500 hover:bg-yellow-100 transition-colors duration-300`}
              onClick={() => setHandRaised(!handRaised)}
            >
              <Hand className="mr-2 h-4 w-4" />
              {handRaised ? "Lower Hand" : "Raise Hand"}
            </Button>
            <Button
              variant="outline"
              className="bg-white text-gray-800 border-2 border-gray-300 hover:bg-gray-100 transition-colors duration-300"
            >
              <FileText className="mr-2 h-4 w-4" />
              Show Lecture PDF
            </Button>
          </div>
        </motion.div>
        <Tabs defaultValue="notes" className="w-full">
          <TabsList>
            <TabsTrigger value="notes">Lecture Notes</TabsTrigger>
            <TabsTrigger value="questions">Q&A</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          <TabsContent
            value="notes"
            className="p-4 bg-white rounded-lg shadow mt-2"
          >
            <h3 className="text-xl font-semibold mb-2">Lecture Notes</h3>
            <p>Here you can find the main points of the lecture...</p>
          </TabsContent>
          <TabsContent
            value="questions"
            className="p-4 bg-white rounded-lg shadow mt-2"
          >
            <h3 className="text-xl font-semibold mb-2">Q&A</h3>
            <p>Ask and answer questions about the lecture here...</p>
          </TabsContent>
          <TabsContent
            value="resources"
            className="p-4 bg-white rounded-lg shadow mt-2"
          >
            <h3 className="text-xl font-semibold mb-2">Additional Resources</h3>
            <ul className="list-disc list-inside">
              <li>Link to related articles</li>
              <li>Recommended books</li>
              <li>Practice exercises</li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="md:w-1/4 p-6 bg-white shadow-lg"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Chat</h2>
            <Button
              variant="outline"
              size="sm"
              className="bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-300"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Ask Doubt
            </Button>
          </div>
          <ScrollArea className="flex-grow mb-6 pr-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.user}`}
                        alt={message.user}
                      />
                      <AvatarFallback>{message.user[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-gray-800">
                      {message.user}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{message.content}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
          <Separator className="my-4" />
          <div className="flex space-x-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-white hover:bg-gray-100 transition-colors duration-300"
            >
              <ThumbsUp className="h-4 w-4 text-blue-500" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white hover:bg-gray-100 transition-colors duration-300"
            >
              <Heart className="h-4 w-4 text-red-500" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white hover:bg-gray-100 transition-colors duration-300"
            >
              <Smile className="h-4 w-4 text-yellow-500" />
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
            <Input
              id="message"
              placeholder="Type a message..."
              className="bg-gray-100 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-300"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
