'use client';
import { useCompletion } from 'ai/react';
import { useState, useCallback } from 'react';

export default function SpellCheck() {
  const [content, setContent] = useState('');
  const { complete } = useCompletion({
    api: '/api/spellCheck',
  });

  const handleCheckSpelling = useCallback(
    async (c: string) => {
      const completion = await complete(c);
      if (!completion) throw new Error('Failed to check typos');
      const typos = JSON.parse(completion);
      if (typos?.length && !window.confirm('Typos found… continue?')) return;
      else alert('Post published');
    },
    [complete],
  );

  return (
    
    <div>
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write your diary here" className='bg-black w-[90vw] h-[20vh] p-4 text-white text-2xl' />
      <button onClick={() => handleCheckSpelling(content)}  className="mb-2 text-2xl bg-black text-white p-3">Check</button>
    </div>
  );
}