import { Rocket, Zap, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';


const featuresData = [
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Fast & Lightweight",
    description: "Static JSON files ensure instant responses with no server delays.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "No Authentication",
    description: "Completely free and open. No API keys or rate limits.",
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: "Easy Integration",
    description: "Simple REST-like endpoints that work with any language.",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Why Choose Quote API?
            </h2>
            <p className="text-muted-foreground mt-2">Everything you need for a simple and reliable quote service.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featuresData.map((feature, index) => (
             <Card key={index} className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                        {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        {feature.description}
                    </p>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
