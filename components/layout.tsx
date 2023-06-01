interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex flex-col space-y-4">
      <header
        className="sticky top-0 z-40 "
        style={{ backgroundColor: '#1f1f23' }}
      >
        <div className="h-16 border-b border-b-slate-200 py-4">
          <h1 className="text-2xl font-bold leading-[1.1] tracking-tighter text-center mb-3">
            Chat with Gridbot
          </h1>
        </div>
      </header>
      <div className="container">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
