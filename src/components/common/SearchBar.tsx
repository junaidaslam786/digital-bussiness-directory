"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  placeholder?: string;
  variant?: "default" | "large";
}

export function SearchBar({ 
  placeholder = "Search businesses, categories, or cities...",
  variant = "default"
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const isLarge = variant === "large";

  return (
    <form onSubmit={handleSearch} className="relative w-full group">
      <div className="relative">
        <Search className={`absolute left-4 text-gray-400 ${isLarge ? 'top-5 h-6 w-6' : 'top-3 h-5 w-5'}`} />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full transition-all duration-200 focus:shadow-lg ${isLarge ? 'h-14 pl-14 pr-32 text-lg' : 'h-11 pl-12 pr-24'}`}
        />
        <Button
          type="submit"
          size={isLarge ? "lg" : "default"}
          className={`absolute right-2 ${isLarge ? 'top-2' : 'top-1.5'}`}
        >
          Search
        </Button>
      </div>
    </form>
  );
}
