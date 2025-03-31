import { ThemeSelector } from '@/components/ThemeSelector';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div className="fixed top-2 right-2 z-10">
        <ThemeSelector />
      </div>
    </div>
  );
}
