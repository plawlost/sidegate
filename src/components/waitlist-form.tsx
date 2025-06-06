"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ztltrztszxhjknyfymnn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0bHRyenRzenhoamtueWZ5bW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTU0MTEsImV4cCI6MjA2NDc5MTQxMX0.eqr2cQVsXkO_SofQoqoJqdPaQ_DGHEet4zDo8ViGUDw";
const supabase = createClient(supabaseUrl, supabaseKey);

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email) {
      setError("Please enter your email.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.functions.invoke("add-to-waitlist", {
      body: { email },
    });

    if (error) {
      setError("An error occurred. Please try again.");
      console.error("Error invoking function:", error);
    } else {
      setSubmitted(true);
    }

    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center h-11 px-6 text-base font-medium bg-green-100 text-green-800 rounded-md">
        <Check className="w-5 h-5 mr-2" />
        <span>Thanks for joining!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
      <Input
        type="email"
        placeholder="enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-11 px-4 text-base font-mono"
        disabled={loading}
      />
      <Button type="submit" size="lg" className="h-11 px-6 text-base font-medium group" disabled={loading}>
        {loading ? "submitting..." : "get notified"}
        {!loading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />}
      </Button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
} 