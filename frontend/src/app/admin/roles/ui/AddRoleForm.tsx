"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Role } from "@/services/roleService";

interface AddRoleFormProps {
  onAddRole: (data: Partial<Role>) => void;
}

export function AddRoleForm({ onAddRole }: AddRoleFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRole({ name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Tên vai trò</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên vai trò"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Thêm vai trò
      </Button>
    </form>
  );
} 