import { Rocket, Zap, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const featuresData = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "দ্রুত এবং হালকা",
    description:
      "স্ট্যাটিক JSON ফাইলগুলি সার্ভারের বিলম্ব ছাড়াই তাত্ক্ষণিক প্রতিক্রিয়া নিশ্চিত করে।",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "কোন প্রমাণীকরণ নেই",
    description:
      "সম্পূর্ণ বিনামূল্যে এবং উন্মুক্ত। কোন API কী বা রেট সীমা নেই।",
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "সহজ ইন্টিগ্রেশন",
    description: "সহজ REST-এর মতো এন্ডপয়েন্ট যা যেকোনো ভাষার সাথে কাজ করে।",
  },
];

export function Features() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            কেন উক্তি API বেছে নেবেন?
          </h2>
          <p className="text-muted-foreground mt-2">
            একটি সহজ এবং নির্ভরযোগ্য উক্তি পরিষেবার জন্য আপনার যা কিছু প্রয়োজন।
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featuresData.map((feature, index) => (
            <Card
              key={index}
              className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
