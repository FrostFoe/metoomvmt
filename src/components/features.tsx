import { Rocket, LockOpen, Code } from 'lucide-react';

const featuresData = [
  {
    icon: <Rocket className="h-12 w-12 text-primary mb-4 mx-auto" />,
    title: "Fast & Lightweight",
    description: "Static JSON files ensure instant responses with no server delays.",
  },
  {
    icon: <LockOpen className="h-12 w-12 text-primary mb-4 mx-auto" />,
    title: "No Authentication",
    description: "Completely free and open. No API keys or rate limits.",
  },
  {
    icon: <Code className="h-12 w-12 text-primary mb-4 mx-auto" />,
    title: "Easy Integration",
    description: "Simple REST-like endpoints that work with any language.",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featuresData.map((feature, index) => (
            <div key={index} className="p-6 text-center rounded-xl shadow-lg border bg-card text-card-foreground">
              {feature.icon}
              <h3 className="text-xl font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
