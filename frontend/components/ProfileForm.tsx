"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
  emergencyContact?: string; // tenant only
  BankName?: string; // landlord only
  AccountNumber?: string; // landlord only
  IFSCCode?: string; // landlord only
};

type ProfileFormProps = {
  userType: "tenant" | "landlord";
};

// ---------- COMPONENT ----------
const ProfileForm = ({ userType }: ProfileFormProps) => {
  const [loading, setLoading] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>();

  // Base API URLs
  const apiBase =
    userType === "tenant"
      ? "http://localhost:3000/api/tenant/profile"
      : "http://localhost:3000/api/landlord/profile";

  // ---------- FETCH PROFILE ----------
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(apiBase, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // backend returns slightly different structure for landlord
        const data =
          userType === "tenant" ? res.data : res.data.landlord || res.data;

        reset(data);
        setInitialDataLoaded(true);
      } catch (err: any) {
        console.error("Error loading profile:", err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, [userType, reset, apiBase]);

  // ---------- SUBMIT HANDLER ----------
  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await axios.put(apiBase, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
    } catch (err: any) {
      console.error("Error updating profile:", err.response?.data || err.message);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- RENDER ----------
  if (!initialDataLoaded)
    return <p className="text-center py-10">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold capitalize">
            {userType} Profile
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* NAME */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register("name", { required: "Name is required" })} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: { value: 10, message: "Enter a valid phone number" },
                })}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* TENANT FIELDS */}
            {userType === "tenant" && (
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" {...register("emergencyContact")} />
              </div>
            )}

            {/* LANDLORD FIELDS */}
            {userType === "landlord" && (
              <>
                <div>
                  <Label htmlFor="BankName">Bank Name</Label>
                  <Input id="BankName" {...register("BankName")} />
                </div>

                <div>
                  <Label htmlFor="AccountNumber">Account Number</Label>
                  <Input
                    id="AccountNumber"
                    type="text"
                    {...register("AccountNumber", {
                      minLength: {
                        value: 6,
                        message: "Enter a valid account number",
                      },
                    })}
                  />
                  {errors.AccountNumber && (
                    <p className="text-sm text-red-500">
                      {errors.AccountNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="IFSCCode">IFSC Code</Label>
                  <Input
                    id="IFSCCode"
                    {...register("IFSCCode", {
                      pattern: {
                        value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                        message: "Invalid IFSC format",
                      },
                    })}
                  />
                  {errors.IFSCCode && (
                    <p className="text-sm text-red-500">
                      {errors.IFSCCode.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* SUBMIT BUTTON */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save / Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
