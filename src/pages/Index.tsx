
import React from 'react';
import Chat from '@/components/Chat';

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="border-b px-6 py-4">
        <h1 className="text-2xl font-bold text-primary">Invoice Chat Assistant</h1>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <div className="container h-full max-w-4xl mx-auto">
          <div className="flex flex-col h-full border rounded-lg shadow-sm overflow-hidden mt-4 mb-4">
            <Chat />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
