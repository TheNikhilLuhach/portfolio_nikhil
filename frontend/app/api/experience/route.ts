import { NextResponse } from 'next/server';
import experienceData from '@/data/experience.json';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const experience = experienceData as { id: number }[];
    
    if (id) {
      const exp = experience.find((e: { id: number }) => e.id === parseInt(id));
      if (!exp) {
        return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
      }
      return NextResponse.json(exp);
    }
    
    return NextResponse.json(experienceData);
  } catch (error) {
    console.error('Experience API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
