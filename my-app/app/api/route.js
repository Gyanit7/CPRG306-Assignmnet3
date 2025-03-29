import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL);
const db = client.db("movieDB");
const movieCollection = db.collection("movies");

export async function POST(request) {
  try {
    const { title, actors, releaseYear } = await request.json();
    const newMovie = { title, actors, releaseYear: parseInt(releaseYear, 10) };

    await client.connect();
    const result = await movieCollection.insertOne(newMovie);
    
    if (result.acknowledged) {
      newMovie._id = result.insertedId;
      return new Response(JSON.stringify(newMovie), { status: 201 });
    }

    return new Response("Failed to add movie", { status: 500 });
  } catch (error) {
    console.error("Error adding movie:", error.message);
    return new Response("Error adding movie", { status: 500 });
  } finally {
    await client.close();
  }
}

export async function GET() {
  try {
    await client.connect();
    const movies = await movieCollection.find({}).toArray();
    return new Response(JSON.stringify(movies), { status: 200 });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    return new Response("Error fetching movies", { status: 500 });
  } finally {
    await client.close();
  }
}

export async function PUT(request) {
  try {
    const { id, title, actors, releaseYear } = await request.json();
    
    await client.connect();
    const result = await movieCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, actors, releaseYear: parseInt(releaseYear, 10) } }
    );

    if (result.modifiedCount === 0) {
      return new Response("Movie not found or no changes made", { status: 404 });
    }

    return new Response("Movie updated", { status: 200 });
  } catch (error) {
    console.error("Error updating movie:", error.message);
    return new Response("Error updating movie", { status: 500 });
  } finally {
    await client.close();
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    await client.connect();
    const result = await movieCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response("Movie not found", { status: 404 });
    }

    return new Response("Movie deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting movie:", error.message);
    return new Response("Error deleting movie", { status: 500 });
  } finally {
    await client.close();
  }
}
