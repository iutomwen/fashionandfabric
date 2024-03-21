"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { toast } from "@/components/ui/use-toast";
import { Tables } from "@/utils/types";
import { AuthSession } from "@supabase/supabase-js";
import { useTransition } from "react";
import { updateAuthUser } from "../actions";
const ProfileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
});
export default function EditProfileForm({
  user,
  session,
}: {
  user: Tables<"profiles">;
  session: AuthSession;
}) {
  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      username:
        `${session?.user?.user_metadata?.first_name} ${session?.user?.user_metadata?.last_name}` ||
        "",
      email: session?.user?.email || "",
    },
    mode: "onChange",
  });
  const [isPending, startTransition] = useTransition();
  async function onSubmit(data: z.infer<typeof ProfileFormSchema>) {
    const { username } = data;
    const updateData = {
      user_metadata: {
        first_name: username.split(" ")[0],
        last_name: username.split(" ")[1],
      },
    };
    const result = await updateAuthUser(user.id, updateData);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated.",
    });
    const { error, data: updatedData } = JSON.parse(result);
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emaili </FormLabel>
              <FormControl>
                <Input
                  disabled
                  readOnly
                  type="email"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can manage verified email addresses in your email settings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
