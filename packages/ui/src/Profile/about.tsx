"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { Skeleton } from "../skeleton";
import { Switch } from "../switch";
import { Textarea } from "../textarea";

interface UserProfile {
  firstName: string;
  surname: string;
  email: string;
  bio?: string;
  location?: string;
}

export default function AboutSection(props: UserProfile) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch user data
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      setProfile({
        firstName: props.firstName,
        surname: props.surname,
        email: props.email,
        bio: props.bio,
        location: props.location,
      });
      setIsLoading(false);
    };

    void fetchData();
  }, [props]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = () => {
    // Here you would typically send the updated profile to your backend
    console.log("Saving profile:", profile);
    setIsEditing(false);
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">About Me</CardTitle>
        <div className="flex items-center space-x-2">
          <Switch
            checked={isEditing}
            onCheckedChange={setIsEditing}
            id="edit-mode"
            disabled={isLoading}
          />
          <Label htmlFor="edit-mode">Edit Mode</Label>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-4 w-[180px]" />
            </>
          ) : (
            profile && (
              <>
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-lg">{profile.firstName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="surname">Surname</Label>
                  {isEditing ? (
                    <Input
                      id="surname"
                      name="surname"
                      value={profile.surname}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-lg">{profile.surname}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-lg">{profile.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profile.bio}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  ) : (
                    <p className="text-lg">{profile.bio}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      name="location"
                      value={profile.location}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-lg">{profile.location}</p>
                  )}
                </div>
                {isEditing && (
                  <Button onClick={handleSave} className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                )}
              </>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}