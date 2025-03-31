import { Container } from '@/components/Container';
import { ThemeSelector } from '@/components/ThemeSelector';

export default function Home() {
  return (
    <div>
      <Container className="relative">
        <div className="absolute top-2 right-2 z-10">
          <ThemeSelector />
        </div>
        <h1>Home</h1>
      </Container>
    </div>
  );
}
