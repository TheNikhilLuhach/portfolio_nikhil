import { NextResponse } from 'next/server';
import skillsData from '@/data/skills.json';

export async function GET() {
  try {
    return NextResponse.json(skillsData);
  } catch (error) {
    console.error('Skills API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
