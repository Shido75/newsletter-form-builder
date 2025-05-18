import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Mail, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Globe, 
  Briefcase, 
  Calendar, 
  Bell
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define schemas for each step
const personalInfoSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().optional(),
});

const preferencesSchema = z.object({
  interests: z.array(z.string()).min(1, { message: "Select at least one interest" }),
  frequency: z.enum(["daily", "weekly", "monthly"], { 
    required_error: "Please select a frequency" 
  }),
  location: z.string().optional(),
});

const confirmationSchema = z.object({
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  allowPromotions: z.boolean().optional(),
});

// Combined schema for all steps
const formSchema = z.object({
  ...personalInfoSchema.shape,
  ...preferencesSchema.shape,
  ...confirmationSchema.shape,
});

type FormValues = z.infer<typeof formSchema>;

// Interest options
const interestOptions = [
  { id: "technology", label: "Technology" },
  { id: "business", label: "Business" },
  { id: "design", label: "Design" },
  { id: "marketing", label: "Marketing" },
  { id: "lifestyle", label: "Lifestyle" },
];

export function NewsletterForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FormValues>>({});
  const [progress, setProgress] = useState(33);
  const [activeTab, setActiveTab] = useState("step1");
  const [showFloatingForm, setShowFloatingForm] = useState(false);

  // Initialize form with combined schema
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      interests: [],
      frequency: "weekly",
      location: "",
      agreeToTerms: false,
      allowPromotions: false,
    },
  });

  // Watch form values for floating label effect
  const watchEmail = form.watch("email");
  const watchFirstName = form.watch("firstName");
  const watchLastName = form.watch("lastName");

  // Update progress based on step
  useEffect(() => {
    if (step === 1) {
      setProgress(33);
      setActiveTab("step1");
    } else if (step === 2) {
      setProgress(66);
      setActiveTab("step2");
    } else if (step === 3) {
      setProgress(100);
      setActiveTab("step3");
    }
  }, [step]);

  // Show floating form after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingForm(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle next step
  const handleNext = async () => {
    let schema;
    if (step === 1) {
      schema = personalInfoSchema;
    } else if (step === 2) {
      schema = preferencesSchema;
    }

    try {
      // Validate current step
      const currentValues = form.getValues();
      await schema.parseAsync({
        ...(step === 1 ? {
          email: currentValues.email,
          firstName: currentValues.firstName,
          lastName: currentValues.lastName,
        } : {}),
        ...(step === 2 ? {
          interests: currentValues.interests,
          frequency: currentValues.frequency,
          location: currentValues.location,
        } : {}),
      });

      // Update form data and move to next step
      setFormData(prev => ({ ...prev, ...form.getValues() }));
      setStep(prev => prev + 1);
    } catch (err) {
      // Trigger validation errors
      form.trigger();
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  // Handle form submission
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

  // Success state
  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto p-6 space-y-4 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-100 shadow-lg animate-fadeIn">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse-subtle"></div>
            <CheckCircle2 className="h-16 w-16 text-green-500 relative z-10" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Thank you for subscribing!</h3>
          <p className="text-gray-600">
            Please check your email to confirm your subscription.
          </p>
          <div className="w-full max-w-xs p-4 mt-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Pro tip:</span> Add our email to your contacts to ensure you receive our newsletters.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Floating mini form
  const FloatingMiniForm = () => (
    <div className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-xl p-4 w-72 transform transition-all duration-500 z-50 ${showFloatingForm ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <button 
        className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1 text-gray-600 hover:bg-gray-300"
        onClick={() => setShowFloatingForm(false)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <h4 className="text-sm font-semibold mb-2">Don't miss out!</h4>
      <p className="text-xs text-gray-600 mb-3">Subscribe to our newsletter for exclusive updates.</p>
      <div className="flex space-x-2">
        <Input 
          placeholder="Your email" 
          className="h-8 text-xs" 
          onChange={(e) => form.setValue("email", e.target.value)}
        />
        <Button 
          size="sm" 
          className="h-8 text-xs bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            setShowFloatingForm(false);
            form.setValue("email", form.getValues().email);
          }}
        >
          Join
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-100 shadow-lg relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-shimmer -z-10"></div>
        
        {/* Progress indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Step {step} of 3</span>
            <span>{progress}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {/* Form header */}
        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-bold text-gray-900 animate-fadeIn">
            {step === 1 && "Join Our Newsletter"}
            {step === 2 && "Customize Your Experience"}
            {step === 3 && "Almost Done!"}
          </h3>
          <p className="text-gray-600 text-sm animate-fadeIn">
            {step === 1 && "Get the latest updates delivered to your inbox."}
            {step === 2 && "Tell us what you're interested in."}
            {step === 3 && "Review and confirm your subscription."}
          </p>
        </div>

        {/* Error alert */}
        {error && (
          <Alert variant="destructive" className="animate-fadeIn">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs value={activeTab} className="w-full">
              {/* Step 1: Personal Information */}
              <TabsContent value="step1" className={step === 1 ? "animate-fadeIn" : "hidden"}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className={`relative input-focus-effect rounded-md ${watchEmail ? 'has-value' : ''}`}>
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="your@email.com"
                              className="pl-10 transition-all duration-300 border-gray-300 focus:border-blue-400"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                // Real-time validation feedback
                                if (e.target.value && !e.target.value.includes('@')) {
                                  form.setError('email', { 
                                    type: 'manual', 
                                    message: 'Please include an @ in the email address' 
                                  });
                                } else {
                                  form.clearErrors('email');
                                }
                              }}
                            />
                            {field.value && (
                              <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500 animate-fadeIn" />
                            )}
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
                            <div className={`relative input-focus-effect rounded-md ${watchFirstName ? 'has-value' : ''}`}>
                              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                placeholder="John" 
                                className="pl-10 transition-all duration-300 border-gray-300 focus:border-blue-400" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
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
                            <div className={`relative input-focus-effect rounded-md ${watchLastName ? 'has-value' : ''}`}>
                              <Input 
                                placeholder="Doe" 
                                className="transition-all duration-300 border-gray-300 focus:border-blue-400" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Step 2: Preferences */}
              <TabsContent value="step2" className={step === 2 ? "animate-fadeIn" : "hidden"}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="interests"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Interests</FormLabel>
                          <FormDescription>
                            Select topics you'd like to receive updates about.
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {interestOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="interests"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 shadow-sm transition-all hover:bg-gray-50"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          const updatedValue = checked
                                            ? [...(field.value || []), option.id]
                                            : field.value?.filter(
                                                (value) => value !== option.id
                                              ) || [];
                                          field.onChange(updatedValue);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Email Frequency</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="daily" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Daily
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="weekly" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Weekly
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="monthly" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Monthly
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (Optional)</FormLabel>
                        <FormControl>
                          <div className="relative input-focus-effect rounded-md">
                            <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Your location"
                              className="pl-10 transition-all duration-300 border-gray-300 focus:border-blue-400"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          We'll send you region-specific content.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Step 3: Confirmation */}
              <TabsContent value="step3" className={step === 3 ? "animate-fadeIn" : "hidden"}>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      Subscription Summary
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li><span className="font-medium">Email:</span> {form.getValues().email}</li>
                      <li><span className="font-medium">Name:</span> {form.getValues().firstName} {form.getValues().lastName}</li>
                      <li><span className="font-medium">Interests:</span> {form.getValues().interests?.map(i => {
                        const option = interestOptions.find(opt => opt.id === i);
                        return option?.label;
                      }).join(', ') || 'None selected'}</li>
                      <li><span className="font-medium">Frequency:</span> {form.getValues().frequency?.charAt(0).toUpperCase() + form.getValues().frequency?.slice(1)}</li>
                      {form.getValues().location && <li><span className="font-medium">Location:</span> {form.getValues().location}</li>}
                    </ul>
                  </div>

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer">
                            I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="allowPromotions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer">
                            I'd like to receive promotional emails (optional)
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-2">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex items-center transition-all hover:translate-x-[-2px]"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all hover:translate-x-[2px] shadow-md hover:shadow-lg"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg animate-pulse-subtle"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Complete Subscription"}
                </Button>
              )}
            </div>

            {/* Terms text */}
            {step === 1 && (
              <p className="text-xs text-center text-gray-500 mt-4 animate-fadeIn">
                By continuing, you agree to our{" "}
                <a href="#" className="underline hover:text-blue-600">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-blue-600">
                  Terms of Service
                </a>
                .
              </p>
            )}
          </form>
        </Form>
      </div>

      {/* Floating mini form */}
      <FloatingMiniForm />
    </>
  );
}