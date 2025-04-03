import { Container } from '@/components/Container';
import { ThemeSelector } from '@/components/ThemeSelector';

export default function Home() {
  return (
    <div>
      <Container className="relative">
        <div className="flex items-center justify-between">
          <h1>Home</h1> <ThemeSelector />
        </div>
      </Container>
    </div>
  );
}
