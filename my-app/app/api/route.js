import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const movies = await prisma.movie.findMany();
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, actors, releaseYear } = await req.json();
    const newMovie = await prisma.movie.create({
      data: { title, actors, releaseYear },
    });
    return NextResponse.json(newMovie, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add movie" }, { status: 500 });
  }
}
