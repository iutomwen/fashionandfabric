"use client";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import React from "react";
const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;
const defaultValues: Partial<LoginFormValues> = {
  email: "",
  password: "",
};
export default function Home() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const supabase = createClient();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  async function onSubmit(data: LoginFormValues) {
    toast({
      title: "Success",
      description: "You are now logged in.",
    });
  }
  return (
    <div className="container border relative p-10 h-auto md:p-0 md:h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/register"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8 hidden md:block"
        )}
      >
        Sign-up
      </Link>
      <div className="relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex">
        <div className="absolute inset-0 bg-transparent" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 mr-2"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Fashion Library
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password below to login your account
            </p>
          </div>
          <div className={cn("grid gap-6")}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Email Address"
                              {...field}
                              disabled={isLoading}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-1">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Password"
                              {...field}
                              disabled={isLoading}
                              type="password"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button disabled={isLoading}>
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign In with Email
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <p className="px-8 text-sm text-center text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
