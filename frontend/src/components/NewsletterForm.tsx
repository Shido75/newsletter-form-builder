import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User, AlertCircle, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
      setIsSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Error submitting form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto p-6 space-y-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100 shadow-lg animate-fadeIn">
        <div className="flex flex-col items-center text-center space-y-2">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
          <h3 className="text-xl font-semibold text-gray-900">Thank you for subscribing!</h3>
          <p className="text-gray-600">
            Please check your email to confirm your subscription.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100 shadow-lg">
      <div className="space-y-2 text-center">
        <h3 className="text-2xl font-bold text-gray-900">Subscribe to our Newsletter</h3>
        <p className="text-gray-600 text-sm">
          Get the latest updates and exclusive content delivered to your inbox.
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="your@email.com"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="John" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500 mt-4">
            By subscribing, you agree to our{" "}
            <a href="#" className="underline hover:text-blue-600">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-blue-600">
              Terms of Service
            </a>
            .
          </p>
        </form>
      </Form>
    </div>
  );
}