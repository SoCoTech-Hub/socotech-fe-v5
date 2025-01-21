"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Alert, AlertDescription, AlertTitle } from "./alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";
import { FormControl, FormItem, FormLabel } from "./form";
import { useToast } from "./hooks";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Textarea } from "./textarea";

// Define the form schema using TypeScript
type FormData = {
  reason: string;
  additionalFeedback: string;
  deletionType: "permanent" | "temporary";
};

const REASONS = {
  permanent: [
    { value: "not-useful", label: "Not useful for me" },
    { value: "too-expensive", label: "Too expensive" },
    { value: "found-alternative", label: "Found a better alternative" },
    { value: "too-complicated", label: "Too complicated to use" },
    { value: "privacy-concerns", label: "Privacy concerns" },
    { value: "other", label: "Other" },
  ],
  temporary: [
    { value: "taking-break", label: "Taking a break" },
    { value: "seasonal-use", label: "Seasonal use only" },
    { value: "traveling", label: "Traveling or temporarily unavailable" },
    { value: "financial", label: "Temporary financial constraints" },
    { value: "other", label: "Other" },
  ],
};

export const DeleteAccount = ({
  deleteAccount,
  deactivateAccount,
}: {
  deleteAccount: () => void;
  deactivateAccount: () => void;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Initialize the form with default values
  const methods = useForm<FormData>({
    defaultValues: {
      reason: "",
      additionalFeedback: "",
      deletionType: "permanent",
    },
  });

  const {
    watch,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = methods;
  const deletionType = watch("deletionType");

  useEffect(() => {
    setValue("reason", "");
  }, [deletionType, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    setIsProcessing(true);
    try {
      if (values.deletionType === "permanent") {
        deleteAccount();
      } else {
        deactivateAccount();
      }
      toast({
        title:
          values.deletionType === "permanent"
            ? "Account Deleted"
            : "Account Deactivated",
      });
      window.location.replace("/auth/logout");
    } catch {
      toast({
        title: "Error",
        description: "Failed to process account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Manage Your Account</h1>
      <div className="mx-auto max-w-2xl space-y-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Deactivating or deleting your account will remove your access to the
            system. Please read the options carefully before proceeding.
          </AlertDescription>
        </Alert>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Deletion Type Selection */}
            <FormItem>
              <FormLabel>Account Action</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) =>
                    setValue("deletionType", value as "permanent" | "temporary")
                  }
                  defaultValue="permanent"
                >
                  {["temporary", "permanent"].map((type) => (
                    <FormItem key={type} className="flex items-center">
                      <RadioGroupItem value={type} />
                      <FormLabel className="ml-2">
                        {type === "temporary"
                          ? "Temporarily deactivate my account"
                          : "Permanently delete my account"}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>

            {/* Reason Selection */}
            <FormItem>
              <FormLabel>Reason for {deletionType}</FormLabel>
              <Select
                onValueChange={(value) => setValue("reason", value)}
                value={watch("reason")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent className="bg-primary text-primaryForeground">
                  {REASONS[deletionType].map((reason) => (
                    <SelectItem key={reason.value} value={reason.value}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.reason && (
                <p className="mt-1 text-sm text-red-500">
                  Please select a reason.
                </p>
              )}
            </FormItem>

            {/* Additional Feedback */}
            <FormItem>
              <FormLabel>Additional Feedback (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...register("additionalFeedback", {
                    maxLength: {
                      value: 500,
                      message:
                        "Additional feedback must not exceed 500 characters.",
                    },
                  })}
                  className="resize-none"
                />
              </FormControl>
              {errors.additionalFeedback && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.additionalFeedback.message}
                </p>
              )}
            </FormItem>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Link scroll={false} href="/" passHref>
                <Button variant="outline">Cancel</Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={isProcessing}>
                    {isProcessing
                      ? "Processing..."
                      : deletionType === "permanent"
                        ? "Delete Account"
                        : "Deactivate Account"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      {deletionType === "permanent"
                        ? "This action cannot be undone. Your data will be permanently removed."
                        : "Your account will be temporarily deactivated. You can reactivate it by logging in."}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSubmit(onSubmit)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Confirm"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
