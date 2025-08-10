import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        toast({ title: "Subscribed!", description: "You'll receive promotions and offers." });
        setEmail("");
      }}
      className="flex gap-2 w-full max-w-md"
      aria-label="Newsletter Subscription"
    >
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit">Join</Button>
    </form>
  );
};

export default NewsletterForm;
