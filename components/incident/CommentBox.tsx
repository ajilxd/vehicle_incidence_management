"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircleIcon as ChatIcon } from "lucide-react";

interface CommentBoxProps {
  onAddComment: (comment: string) => void;
}

export const CommentBox: React.FC<CommentBoxProps> = ({ onAddComment }) => {
  const [comment, setComment] = React.useState("");

  const handleAdd = () => {
    if (!comment.trim()) return;
    onAddComment(comment.trim());
    setComment("");
  };
  const handleReset = () => {
    setComment("");
  };

  return (
    <Card className="mx-auto">
      <CardHeader className="flex items-center gap-2">
        <ChatIcon className="w-5 h-5 text-gray-500" />
        <CardTitle className="text-sm font-medium">Add Comment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          rows={3}
        />
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="default" size="sm" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
