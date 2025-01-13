"use client";

import Link from "next/link";

import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

const AffiliateHomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 text-secondary-foreground bg-secondary">
          <div className="container px-4 mx-auto text-center">
            <h1 className="mb-4 text-4xl font-bold">
              Earn More with Our Affiliate Program
            </h1>
            <p className="mb-8 text-xl">
              Join our network of successful affiliates and start earning today!
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild size="lg">
                <Link href="/register">Register Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/transactions">View Transactions</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-muted">
          <div className="container px-4 mx-auto">
            <h2 className="mb-12 text-3xl font-bold text-center">
              How It Works
            </h2>
            <Tabs defaultValue="register" className="max-w-2xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="register">Register</TabsTrigger>
                <TabsTrigger value="promote">Promote</TabsTrigger>
                <TabsTrigger value="earn">Earn</TabsTrigger>
              </TabsList>
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>1. Register</CardTitle>
                    <CardDescription>
                      Sign up for our affiliate program
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Complete our simple registration process to get started.
                      It only takes a few minutes!
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="/register">Register Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="promote">
                <Card>
                  <CardHeader>
                    <CardTitle>2. Promote</CardTitle>
                    <CardDescription>
                      Share your unique affiliate link
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Use your personalized affiliate link to promote our
                      products on your website, social media, or email
                      campaigns.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="earn">
                <Card>
                  <CardHeader>
                    <CardTitle>3. Earn</CardTitle>
                    <CardDescription>
                      Get paid for your referrals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Earn commissions on every successful referral. We offer
                      timely payouts and transparent reporting.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline">
                      <Link href="/transactions">View Transactions</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AffiliateHomePage;
