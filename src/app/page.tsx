import { QuoteApiClient } from '@/components/quote-api-client';
import { Book, FlaskConical, Github, Rocket, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <QuoteApiClient />

      <section id="documentation" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            <Book className="w-10 h-10 mr-3 inline-block gradient-text" />
            API Documentation
          </h2>

          <div className="max-w-5xl mx-auto space-y-8">
            <div className="card rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Base URL
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
                <code className="text-primary">
                  /api
                </code>
              </div>
            </div>

            <div className="card rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Available Endpoints
              </h3>
              <div className="space-y-4">
                  <p><span className="endpoint-badge">GET</span> <code className="ml-3 font-mono text-lg text-gray-800 dark:text-white">/quotes</code> - Returns all quotes.</p>
                  <p><span className="endpoint-badge">GET</span> <code className="ml-3 font-mono text-lg text-gray-800 dark:text-white">/quotes/random</code> - Returns a random quote.</p>
                  <p><span className="endpoint-badge">GET</span> <code className="ml-3 font-mono text-lg text-gray-800 dark:text-white">/quotes?limit=5</code> - Returns a limited number of quotes.</p>
                  <p><span className="endpoint-badge">GET</span> <code className="ml-3 font-mono text-lg text-gray-800 dark:text-white">/quotes?search=happiness</code> - Search quotes by keyword.</p>
                  <p><span className="endpoint-badge">GET</span> <code className="ml-3 font-mono text-lg text-gray-800 dark:text-white">/quotes?author=সূরা%20আন-নিসা</code> - Filter by author.</p>
                  <p><span className="endpoint-badge">GET</span> <code className="ml-3 font-mono text-lg text-gray-800 dark:text-white">/categories</code> - Returns available categories.</p>
              </div>
            </div>
            
            <div className="card rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Response Format
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              All responses return JSON with the following structure:
            </p>

            <div className="code-block">
              <pre><code className="language-json">{
`{
  "data": [
    {
      "id": 1,
      "text": "নিশ্চয়ই আল্লাহর পথই একমাত্র পথ।",
      "author": "আল-কুরআন ৬:৭",
      "type": "quran"
    }
  ],
  "count": 1
}`}</code></pre>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card rounded-xl shadow-lg p-6 text-center">
              <Rocket className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                Fast & Lightweight
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Static JSON files ensure instant responses with no server delays.
              </p>
            </div>

            <div className="card rounded-xl shadow-lg p-6 text-center">
              <i className="fas fa-lock-open text-5xl text-primary mb-4"></i>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                No Authentication
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Completely free and open. No API keys or rate limits.
              </p>
            </div>

            <div className="card rounded-xl shadow-lg p-6 text-center">
                <i className="fas fa-code text-5xl text-primary mb-4"></i>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                Easy Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Simple REST-like endpoints that work with any language.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="gradient-bg text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">Built with ❤️ using Next.js</p>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com" target="_blank" className="hover:text-gray-200 transition">
                <Github className="text-2xl" />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
                <Star className="text-2xl" />
            </a>
          </div>
          <p className="mt-4 text-sm opacity-75">
            © {new Date().getFullYear()} Quote API. Open Source Project.
          </p>
        </div>
      </footer>
    </div>
  );
}
