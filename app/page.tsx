import { Container } from '@/components/Container';
import { ThemeSelector } from '@/components/ThemeSelector';
import ExerciseCard from '@/components/ExerciseCard';
import { COLUMN_DATA } from '@/mock/column';

export default function Home() {
  const columnData = COLUMN_DATA;

  return (
    <Container>
      <div className="mb-4 flex items-center justify-between">
        <h1>Home</h1> <ThemeSelector />
      </div>
      <div className="flex flex-col gap-4">
        {columnData.map((e, i) => (
          <ExerciseCard key={i} exercise={e} />
        ))}
      </div>
    </Container>
  );
}
