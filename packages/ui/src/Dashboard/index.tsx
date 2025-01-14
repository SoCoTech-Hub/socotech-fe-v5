"use client";

import { useState } from "react";
import {
  BookMarked,
  BookOpen,
  Clock,
  Heart,
  MessageSquare,
  Newspaper,
  Send,
  Share2,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { Textarea } from "../textarea";
import { UserAbout } from "./userAbout";

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState("news");
  const [newPost, setNewPost] = useState("");
  const [comments, setComments] = useState<Record<number, string>>({});

  //TODO: Fetch User details
  const user = {
    name: "Jane Doe",
    username: "@janedoe",
    profilePic: "/placeholder.svg?height=128&width=128",
    bannerImage: "/placeholder.svg?height=300&width=1000",
    school: "University of Example",
    province: "Example Province",
    grade: "Senior",
    bio: "Passionate about technology and innovation. Always learning and exploring new ideas. Love to collaborate on exciting projects!",
    followers: 1234,
    following: 567,
    totalHours: 120,
    completedLessons: 25,
    lessonsInProgress: 5,
  };
  //TODO: Fetch newsfeed
  const newsFeed = [
    {
      id: 1,
      author: {
        name: "Tech Innovator",
        username: "@techinnovator",
        avatar: "/placeholder.svg?height=64&width=64",
      },
      title: "New Research Breakthrough",
      content:
        "Scientists discover a new renewable energy source that could revolutionize the way we power our homes and cities. This breakthrough has the potential to significantly reduce our carbon footprint and combat climate change.",
      image: "/placeholder.svg?height=200&width=400",
      likes: 156,
      shares: 42,
      comments: [
        {
          author: "EcoWarrior",
          content: "This is exactly what we need to fight climate change!",
        },
        {
          author: "ScepticalScientist",
          content: "Interesting. I'd like to see more data on this.",
        },
      ],
    },
    {
      id: 2,
      author: {
        name: "Conference Organizer",
        username: "@conforg",
        avatar: "/placeholder.svg?height=64&width=64",
      },
      title: "Tech Conference Announced",
      content:
        "Annual DevCon set to take place next month, featuring keynote speeches from industry leaders and workshops on cutting-edge technologies. Early bird tickets are now available for purchase.",
      video: "https://example.com/devcon-promo.mp4",
      likes: 89,
      shares: 23,
      comments: [
        {
          author: "CodeEnthusiast",
          content: "Can't wait! Already got my tickets.",
        },
        {
          author: "NetworkingPro",
          content: "Great opportunity to meet like-minded professionals!",
        },
      ],
    },
    {
      id: 3,
      author: {
        name: "Startup News",
        username: "@startupnews",
        avatar: "/placeholder.svg?height=64&width=64",
      },
      title: "Startup Secures Funding",
      content:
        "Local tech startup raises $10 million in Series A funding to expand their AI-powered education platform. The company aims to make personalized learning accessible to students worldwide.",
      image: "/placeholder.svg?height=200&width=400",
      likes: 213,
      shares: 67,
      comments: [
        {
          author: "InvestorInsights",
          content: "This startup has huge potential. One to watch!",
        },
        {
          author: "EdTechEnthusiast",
          content: "Excited to see how this will transform education!",
        },
      ],
    },
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the new post to your backend
    //TODO: add submit logic
    console.log("New post submitted:", newPost);
    setNewPost("");
  };

  const handleCommentSubmit = (postId: number) => {
    if (comments[postId]) {
      // Here you would typically send the new comment to your backend
      //TODO: Post comment
      console.log(`New comment on post ${postId}:`, comments[postId]);
      setComments((prev) => ({ ...prev, [postId]: "" }));
    }
  };

  return (
    <div className="container mx-auto space-y-6 p-4 dark:bg-gray-900">
      <div className="relative">
        <img
          src={user.bannerImage}
          alt="Profile Banner"
          width={1000}
          height={300}
          className="h-48 w-full rounded-t-lg object-cover"
        />
        <div className="absolute -bottom-16 left-4 rounded-full border-4 border-white dark:border-gray-800">
          <Avatar className="h-32 w-32">
            <AvatarImage src={user.profilePic} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="ml-40 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">{user.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{user.username}</p>
        </div>
        <div className="mt-4 flex space-x-4 md:mt-0">
          <div className="text-center">
            <p className="text-xl font-semibold dark:text-white">
              {user.followers}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Followers
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold dark:text-white">
              {user.following}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Following
            </p>
          </div>
          <Button
            variant="outline"
            className="dark:border-gray-600 dark:text-white"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Follow
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">
              Total Hours Spent
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">
              {user.totalHours}
            </div>
            <p className="text-xs text-muted-foreground">hours</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">
              Completed Lessons
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">
              {user.completedLessons}
            </div>
            <p className="text-xs text-muted-foreground">lessons</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">
              Lessons in Progress
            </CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">
              {user.lessonsInProgress}
            </div>
            <p className="text-xs text-muted-foreground">lessons</p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 dark:bg-gray-800">
          <TabsTrigger value="news">
            <Newspaper className="mr-2 h-4 w-4" />
            News Feed
          </TabsTrigger>
          <TabsTrigger value="about">
            <Users className="mr-2 h-4 w-4" />
            About
          </TabsTrigger>
          <TabsTrigger value="achievments">
            <Trophy className="mr-2 h-4 w-4" />
            Achievments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="news" className="mt-6">
          <Card className="mb-6 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold dark:text-white">
                Create Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePostSubmit}>
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="mb-4 dark:bg-gray-700 dark:text-white"
                />
                <Button type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  Post
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold dark:text-white">
                News Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {newsFeed.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden dark:bg-gray-700"
                  >
                    <CardHeader className="flex flex-row items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={item.author.avatar}
                          alt={item.author.name}
                        />
                        <AvatarFallback>{item.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg font-semibold dark:text-white">
                          {item.author.name}
                        </CardTitle>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.author.username}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto dark:border-gray-600 dark:text-white"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Follow
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <h3 className="text-xl font-semibold dark:text-white">
                        {item.title}
                      </h3>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={200}
                          className="h-48 w-full rounded-md object-cover"
                        />
                      )}
                      {item.video && (
                        <video
                          src={item.video}
                          controls
                          className="h-48 w-full rounded-md object-cover"
                        >
                          Your browser does not support the video tag.
                        </video>
                      )}
                      <p className="dark:text-gray-300">{item.content}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <div className="flex w-full items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="dark:text-gray-300"
                        >
                          <Heart className="mr-2 h-4 w-4" />
                          {item.likes} Likes
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="dark:text-gray-300"
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          {item.shares} Shares
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="dark:text-gray-300"
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          {item.comments.length} Comments
                        </Button>
                      </div>
                      <div className="w-full space-y-2">
                        {item.comments.map((comment, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {comment.author[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 rounded-lg bg-gray-100 p-2 dark:bg-gray-600">
                              <p className="text-sm font-semibold dark:text-white">
                                {comment.author}
                              </p>
                              <p className="text-sm dark:text-gray-300">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex w-full items-center space-x-2">
                        <Input
                          placeholder="Add a comment..."
                          value={comments[item.id] ?? ""}
                          onChange={(e) =>
                            setComments((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                          className="flex-1 dark:bg-gray-600 dark:text-white"
                        />
                        <Button onClick={() => handleCommentSubmit(item.id)}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="about" className="mt-6">
          <UserAbout
            school={user.school}
            province={user.province}
            grade={user.grade}
            bio={user.bio}
          />
        </TabsContent>
        <TabsContent value="achievments" className="mt-6">
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold dark:text-white">
                Achievments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="dark:text-gray-300">You have no Achievments.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
