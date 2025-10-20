import { type NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// WARNING: This API route should only be enabled in a development environment.
// It allows reading and writing to the local filesystem.

// Function to get the path to the data file
const getDataFilePath = (filename: string) => {
  // Security: Ensure filename is one of the allowed files to prevent path traversal attacks
  const allowedFiles = ['quran.json', 'quote.json', 'motivation.json'];
  if (!allowedFiles.includes(filename)) {
    throw new Error('Invalid file name');
  }
  return path.join(process.cwd(), 'src', 'lib', 'data', filename);
};

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'This API is only available in development mode' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'File name is required' }, { status: 400 });
  }

  try {
    const filePath = getDataFilePath(file);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    return NextResponse.json({ error: `Failed to read file: ${(error as Error).message}` }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'This API is only available in development mode' }, { status: 403 });
  }
  
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  
  if (!file) {
    return NextResponse.json({ error: 'File name is required' }, { status: 400 });
  }

  try {
    const filePath = getDataFilePath(file);
    const body = await request.json();
    const content = JSON.stringify(body, null, 2);
    
    await fs.writeFile(filePath, content, 'utf8');
    
    return NextResponse.json({ success: true, message: `${file} saved successfully.` });
  } catch (error) {
    return NextResponse.json({ error: `Failed to write to file: ${(error as Error).message}` }, { status: 500 });
  }
}
