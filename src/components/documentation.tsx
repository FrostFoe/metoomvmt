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
    { method: 'GET', path: '/api/quran', description: 'সমস্ত কুরআন উক্তি প্রদান করে।' },
    { method: 'GET', path: '/api/hadith', description: 'সমস্ত হাদিস উক্তি প্রদান করে।' },
    { method: 'GET', path: '/api/quote', description: 'সাধারণ উক্তি প্রদান করে।' },
    { method: 'GET', path: '/api/motivation', description: 'প্রেরণামূলক উক্তি প্রদান করে।' },
    { method: 'GET', path: '/api/quran?random=true', description: 'একটি এলোমেলো কুরআন উক্তি প্রদান করে।' },
    { method: 'GET', path: '/api/quote?limit=1', description: 'সীমিত সংখ্যক উক্তি প্রদান করে।' },
    { method: 'GET', path: '/api/motivation?search=সাফল্য', description: 'কীওয়ার্ড দ্বারা উক্তি অনুসন্ধান করুন।' },
    { method: 'GET', path: '/api/quran?author=আল-বাকারা', description: 'লেখক দ্বারা ফিল্টার করুন।' },
]

export function Documentation() {
    return (
        <section id="documentation" className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <BookOpenCheck className="w-12 h-12 mx-auto mb-4 gradient-text" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                API ডকুমেন্টেশন
            </h2>
            <p className="text-muted-foreground mt-2">উপলব্ধ এন্ডপয়েন্টগুলি अन्वेषण করুন এবং API কীভাবে ব্যবহার করতে হয় তা শিখুন।</p>
          </div>

          <div className="max-w-5xl mx-auto grid gap-12">
            <div className="p-6 rounded-xl shadow-lg border bg-card text-card-foreground animate-fade-in-up">
              <h3 className="text-2xl font-bold mb-4">
                বেস URL
              </h3>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-primary-foreground bg-primary rounded px-2 py-1">
                  /api
                </code>
              </div>
            </div>

            <div className="rounded-xl shadow-lg border bg-card text-card-foreground animate-fade-in-up animation-delay-200">
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">
                        উপলব্ধ এন্ডপয়েন্ট
                    </h3>
                </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">পদ্ধতি</TableHead>
                      <TableHead>পথ</TableHead>
                      <TableHead>বর্ণনা</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {endpoints.map((endpoint, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Badge variant="default" className="text-sm">{endpoint.method}</Badge>
                        </TableCell>
                        <TableCell>
                            <code className="font-mono text-sm md:text-base bg-muted px-2 py-1 rounded-md break-words">{endpoint.path}</code>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{endpoint.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="p-6 rounded-xl shadow-lg border bg-card text-card-foreground animate-fade-in-up animation-delay-400">
              <h3 className="text-2xl font-bold mb-4">
                 প্রতিক্রিয়া ফর্ম্যাট
              </h3>
              <p className="text-muted-foreground mb-4">
                সমস্ত API প্রতিক্রিয়া একটি সামঞ্জস্যপূর্ণ JSON কাঠামো অনুসরণ করে।
              </p>
              <CodeBlock code={responseFormat} />
            </div>
          </div>
        </div>
      </section>
    );
}
