"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Input } from "../input";
import { Label } from "../label";
import { ScrollArea } from "../scroll-area";

interface Guardian {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

export default function GuardianManager() {
  const [guardians, setGuardians] = useState<Guardian[]>([
    {
      id: "1",
      name: "John Doe",
      relationship: "Father",
      phone: "123-456-7890",
      email: "john@example.com",
    },
    {
      id: "2",
      name: "Jane Doe",
      relationship: "Mother",
      phone: "098-765-4321",
      email: "jane@example.com",
    },
  ]);
  const [editingGuardian, setEditingGuardian] = useState<Guardian | null>(null);
  const [isAddingGuardian, setIsAddingGuardian] = useState(false);

  const handleEdit = (guardian: Guardian) => {
    setEditingGuardian(guardian);
  };

  const handleDelete = (id: string) => {
    setGuardians(guardians.filter((g) => g.id !== id));
  };

  const handleSave = (guardian: Guardian) => {
    if (guardian.id) {
      setGuardians(guardians.map((g) => (g.id === guardian.id ? guardian : g)));
    } else {
      setGuardians([...guardians, { ...guardian, id: Date.now().toString() }]);
    }
    setEditingGuardian(null);
    setIsAddingGuardian(false);
  };

  const GuardianForm = ({
    guardian,
    onSave,
  }: {
    guardian: Guardian;
    onSave: (guardian: Guardian) => void;
  }) => {
    const [form, setForm] = useState(guardian);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(form);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="relationship">Relationship</Label>
          <Input
            id="relationship"
            name="relationship"
            value={form.relationship}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Save</Button>
      </form>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Guardian Information</CardTitle>
          <CardDescription>Manage your listed guardians</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {guardians.map((guardian) => (
              <Card key={guardian.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold">{guardian.name}</h3>
                      <p>{guardian.relationship}</p>
                      <p>{guardian.phone}</p>
                      <p>{guardian.email}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(guardian)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Guardian</DialogTitle>
                          </DialogHeader>
                          <GuardianForm
                            guardian={guardian}
                            onSave={handleSave}
                          />
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(guardian.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddingGuardian(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Guardian
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Guardian</DialogTitle>
              </DialogHeader>
              <GuardianForm
                guardian={{
                  id: "",
                  name: "",
                  relationship: "",
                  phone: "",
                  email: "",
                }}
                onSave={handleSave}
              />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
