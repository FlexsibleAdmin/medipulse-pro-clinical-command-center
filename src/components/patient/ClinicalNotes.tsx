import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Plus, Save } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
interface Note {
  id: string;
  text: string;
  date: Date;
  author: string;
}
const MOCK_NOTES: Note[] = [
  {
    id: "1",
    text: "Patient admitted with complaints of chest pain and shortness of breath. ECG shows sinus tachycardia.",
    date: new Date(Date.now() - 86400000),
    author: "Dr. Sarah Chen"
  },
  {
    id: "2",
    text: "Started on Beta blockers. Monitoring BP every 4 hours.",
    date: new Date(Date.now() - 43200000),
    author: "Dr. Sarah Chen"
  }
];
export function ClinicalNotes() {
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [newNote, setNewNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const handleSave = () => {
    if (!newNote.trim()) return;
    const note: Note = {
      id: crypto.randomUUID(),
      text: newNote,
      date: new Date(),
      author: "Dr. Sarah Chen" // Mocked current user
    };
    setNotes([note, ...notes]);
    setNewNote("");
    setIsAdding(false);
    toast.success("Clinical note saved");
  };
  return (
    <Card className="h-full flex flex-col shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          Clinical Notes
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsAdding(!isAdding)}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 gap-4">
        {isAdding && (
          <div className="space-y-2 animate-slide-up">
            <Textarea
              placeholder="Enter clinical observations..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button size="sm" onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Note
              </Button>
            </div>
          </div>
        )}
        <ScrollArea className="flex-1 -mr-4 pr-4">
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="flex flex-col gap-1 p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">{note.author}</span>
                  <span className="text-xs text-muted-foreground">{format(note.date, "MMM d, HH:mm")}</span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {note.text}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}