
import React from 'react';
import Chat from '@/components/Chat';

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-[#1A1F2C]">
      <header className="border-b border-gray-800 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Invoice Processing Assistant</h1>
        <p className="text-sm text-gray-400">Upload invoices or ask questions about your financial documents</p>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <div className="container h-full max-w-4xl mx-auto">
          <div className="flex flex-col h-full rounded-lg overflow-hidden mt-4 mb-4">
            <Chat />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
