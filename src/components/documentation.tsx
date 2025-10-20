import { Book } from 'lucide-react';
import { CodeBlock } from './code-block';

const responseFormat = `{
  "data": [
    {
      "id": 1,
      "text": "নিশ্চয়ই আল্লাহর পথই একমাত্র পথ।",
      "author": "আল-কুরআন ৬:৭",
      "type": "quran"
    }
  ],
  "count": 1
}`;

const endpoints = [
    { method: 'GET', path: '/quotes', description: 'Returns all quotes.' },
    { method: 'GET', path: '/quotes/random', description: 'Returns a random quote.' },
    { method: 'GET', path: '/quotes?limit=5', description: 'Returns a limited number of quotes.' },
    { method: 'GET', path: '/quotes?search=happiness', description: 'Search quotes by keyword.' },
    { method: 'GET', path: '/quotes?author=সূরা%20আন-নিসা', description: 'Filter by author.' },
    { method: 'GET', path: '/categories', description: 'Returns available categories.' },
]

export function Documentation() {
    return (
        <section id="documentation" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            <Book className="w-10 h-10 mr-3 inline-block gradient-text" />
            API Documentation
          </h2>

          <div className="max-w-5xl mx-auto space-y-8">
            <div className="p-6 rounded-xl shadow-lg border bg-card text-card-foreground">
              <h3 className="text-2xl font-bold mb-4">
                Base URL
              </h3>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-primary-foreground bg-primary rounded px-1 py-0.5">
                  /api
                </code>
              </div>
            </div>

            <div className="p-6 rounded-xl shadow-lg border bg-card text-card-foreground">
              <h3 className="text-2xl font-bold mb-6">
                Available Endpoints
              </h3>
              <div className="space-y-4">
                {endpoints.map((endpoint, index) => (
                    <p key={index}>
                        <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-foreground bg-primary rounded-md">{endpoint.method}</span>
                        <code className="ml-3 font-mono text-lg">{endpoint.path}</code>
                        <span className="text-muted-foreground"> - {endpoint.description}</span>
                    </p>
                ))}
              </div>
            </div>
            
            <div className="p-6 rounded-xl shadow-lg border bg-card text-card-foreground">
              <h3 className="text-2xl font-bold mb-4">
                Response Format
              </h3>
              <p className="text-muted-foreground mb-4">
                All responses return JSON with the following structure:
              </p>
              <CodeBlock code={responseFormat} />
            </div>
          </div>
        </div>
      </section>
    );
}
