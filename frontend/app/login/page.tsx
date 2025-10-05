"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, UserCircle, Building2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"tenant" | "landlord" | null>(null);
  const [loading, setLoading] = useState(false);


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
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Login to your YourBroker account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={undefined} className="space-y-6">
              <div className="space-y-4">
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

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <a href="/signup" className="text-primary hover:underline font-semibold">
                  Sign up
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;