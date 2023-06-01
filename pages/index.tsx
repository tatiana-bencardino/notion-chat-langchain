import { useRef, useState, useEffect } from 'react';
import Layout from '@/components/layout';

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSearch() {
    if (!query) {
      alert('Please input a question');
      return;
    }

    setAnswer('');
    setQuery('');
    setLoading(true);

    const question = query.trim();
    questions.push(question);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
        }),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error(response.statusText);
      }

      const answer = await response.json();

      if (answer.text) {
        setAnswer(answer.text);
        questions.push(answer.text);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  }

  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && query) {
      handleSearch();
    } else {
      return;
    }
  };

  return (
    <Layout>
      <section className="container max-w-xl mx-auto pt-4 pb-6 md:pt-8 md:pb-10 lg:pt-10 lg:pb-16">
        <div className="mx-auto flex flex-col gap-4">
          {questions.map((item, i) => {
            return (
              item.length > 0 && (
                <div className="rounded-md border-neutral-300 border p-5 mt-4">
                  <h2 className="text-xl font-bold leading-[1.1] tracking-tighter text-center">
                    {i % 2 === 0 ? 'Question' : 'Answer'}
                  </h2>
                  <p
                    className="leading-normal sm:leading-7 mt-3"
                    style={{ color: 'white' }}
                  >
                    {item}
                  </p>
                </div>
              )
            );
          })}
          {loading && (
            <>
              <div className="rounded-md border-neutral-300 border p-5 mt-4">
                <h2 className="text-xl font-bold leading-[1.1] tracking-tighter text-center">
                  Answer
                </h2>
                <p
                  className="leading-normal sm:leading-7 mt-3"
                  style={{ color: 'white' }}
                >
                  <div className="mt-3">
                    <>
                      <div className="animate-pulse mt-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded mt-2"></div>
                        <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      </div>
                    </>
                  </div>
                </p>
              </div>
            </>
          )}
          <div className="z-40 flex w-full max-w-xl items-center space-x-2">
            <input
              ref={inputRef}
              className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
              type="text"
              placeholder="Type a question for Gridbot..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleEnter}
              disabled={loading}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900 h-10 py-2 px-4"
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
