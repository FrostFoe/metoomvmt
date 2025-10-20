import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { API_KEY } from '@/lib/constants';

// Mock data store - in a real app, this would be a database.
let dataStore = [
  { id: 1, name: 'Laptop', category: 'Electronics' },
  { id: 2, name: 'T-Shirt', category: 'Apparel' },
  { id: 3, name: 'Coffee Mug', category: 'Kitchen' },
  { id: 4, name: 'Gaming Mouse', category: 'Electronics' },
];

// Zod schema for POST request validation
const postDataSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
});

/**
 * Authenticates the request by checking for a valid API key in the headers.
 * @param request - The incoming NextRequest.
 * @returns boolean - True if authenticated, false otherwise.
 */
function authenticate(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');
  // In a real-world app, consider using a more secure comparison method 
  // like `crypto.timingSafeEqual` to prevent timing attacks.
  return apiKey === API_KEY;
}

/**
 * Handles GET requests to /api/data.
 * Returns a list of items, optionally filtered by 'category' or 'search' query parameters.
 * Requires a valid API key.
 */
export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: 'Unauthorized: Invalid or missing API key' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let filteredData = [...dataStore];

  if (category) {
    filteredData = filteredData.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filteredData = filteredData.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  }

  return NextResponse.json({ data: filteredData }, { status: 200 });
}

/**
 * Handles POST requests to /api/data.
 * Adds a new item to the data store after validating the request body.
 * Requires a valid API key.
 */
export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: 'Unauthorized: Invalid or missing API key' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Bad Request: Invalid JSON format' }, { status: 400 });
  }

  const validation = postDataSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: 'Bad Request: Missing or invalid fields', details: validation.error.flatten().fieldErrors }, { status: 400 });
  }
  
  const newData = {
    id: dataStore.reduce((maxId, item) => Math.max(item.id, maxId), 0) + 1,
    ...validation.data,
  };
  
  dataStore.push(newData);

  return NextResponse.json({ message: 'Data added successfully', data: newData }, { status: 201 });
}
