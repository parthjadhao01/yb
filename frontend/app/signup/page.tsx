"use client";

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

type SignupFormInputs = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState<"tenant" | "landlord" | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormInputs>();

  const onSubmit = async (data: SignupFormInputs) => {
    if (!selectedRole) {
      alert("Please select a role (Tenant or Landlord)");
      return;
    }

    setLoading(true);
    try {
      const apiUrl =
        selectedRole === "tenant"
          ? `http://localhost:3000/api/auth/register/tenant`
          : `http://localhost:3000/api/auth/register/landlord`;

      const payload = { ...data, userType: selectedRole };

      const res = await axios.post(apiUrl, payload);

      alert(`Account created successfully as ${selectedRole}`);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", selectedRole);

      reset();

      // redirect based on role
      if (selectedRole === "tenant") router.push("/tenant/dashboard");
      else router.push("/landlord");
    } catch (err: any) {
      console.error("Signup failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <span className="text-2xl font-bold text-primary-foreground">YB</span>
            </div>
            <span className="text-2xl font-bold text-primary">YourBroker</span>
          </a>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Join YourBroker today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Role Selection */}
              <div>
                <Label className="text-base font-semibold mb-3 block">I am a</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("tenant")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedRole === "tenant"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <UserCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="font-semibold">Tenant</p>
                    <p className="text-xs text-muted-foreground">Looking for property</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("landlord")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedRole === "landlord"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Building2 className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="font-semibold">Landlord</p>
                    <p className="text-xs text-muted-foreground">Have properties</p>
                  </button>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Full name is required" })}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  {...register("phone", {
                    required: "Phone number is required",
                    minLength: { value: 10, message: "Enter a valid phone number" },
                  })}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <a href="/login" className="text-primary hover:underline font-semibold">
                  Login
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
