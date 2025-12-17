import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import type { Patient } from "@shared/types";
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.coerce.number().min(0, "Age must be a positive number").max(120, "Invalid age"),
  gender: z.enum(["Male", "Female", "Other"]),
  condition: z.string().min(2, "Condition is required"),
  roomNumber: z.string().min(1, "Room number is required"),
});
type FormValues = z.infer<typeof formSchema>;
interface AdmitPatientDialogProps {
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}
export function AdmitPatientDialog({ onSuccess, trigger }: AdmitPatientDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: undefined,
      gender: "Other",
      condition: "",
      roomNumber: "",
    },
  });
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      await api<Patient>("/api/patients", {
        method: "POST",
        body: JSON.stringify(values),
      });
      toast.success("Patient admitted successfully", {
        description: `${values.name} has been assigned to room ${values.roomNumber}.`,
      });
      setOpen(false);
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Failed to admit patient:", error);
      toast.error("Failed to admit patient", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
            <Plus className="h-4 w-4" />
            Admit Patient
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Admit New Patient</DialogTitle>
          <DialogDescription>
            Enter patient details to create a new admission record.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="45" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Condition</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Chest Pain" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Assignment</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 101-A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700 text-white">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Admit Patient
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}