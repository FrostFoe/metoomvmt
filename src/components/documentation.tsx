import { BookOpenCheck } from 'lucide-react';
import { CodeBlock } from './code-block';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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
    { method: 'GET', path: '/api/quotes', description: 'Returns all quotes.' },
    { method: 'GET', path: '/api/quotes/random', description: 'Returns a random quote.' },
    { method: 'GET', path: '/api/quotes?limit=5', description: 'Returns a limited number of quotes.' },
    { method: 'GET', path: '/api/quotes?search=happiness', description: 'Search quotes by keyword.' },
    { method: 'GET', path: '/api/quotes?author=সূরা%20আন-নিসা', description: 'Filter by author.' },
    { method: 'GET', path: '/api/categories', description: 'Returns available categories.' },
]

export function Documentation() {
    return (
        <section id="documentation" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <BookOpenCheck className="w-12 h-12 mx-auto mb-4 gradient-text" />
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
                API Documentation
            </h2>
            <p className="text-muted-foreground mt-2">Explore the available endpoints and learn how to use the API.</p>
          </div>

          <div className="max-w-5xl mx-auto grid gap-12">
            <div className="p-6 rounded-xl shadow-lg border bg-card text-card-foreground animate-fade-in-up">
              <h3 className="text-2xl font-bold mb-4">
                Base URL
              </h3>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-primary-foreground bg-primary rounded px-2 py-1">
                  /api
                </code>
              </div>
            </div>

            <div className="rounded-xl shadow-lg border bg-card text-card-foreground animate-fade-in-up animation-delay-200">
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">
                        Available Endpoints
                    </h3>
                </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Method</TableHead>
                    <TableHead>Path</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endpoints.map((endpoint, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Badge variant="default" className="text-sm">{endpoint.method}</Badge>
                      </TableCell>
                      <TableCell>
                          <code className="font-mono text-base bg-muted px-2 py-1 rounded-md">{endpoint.path}</code>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{endpoint.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="p-6 rounded-xl shadow-lg border bg-card text-card-foreground animate-fade-in-up animation-delay-400">
              <h3 className="text-2xl font-bold mb-4">
                Response Format
              </h3>
              <p className="text-muted-foreground mb-4">
                All API responses follow a consistent JSON structure.
              </p>
              <CodeBlock code={responseFormat} />
            </div>
          </div>
        </div>
      </section>
    );
}
