import { connect } from '@/utils/database';
import Recipe from '@/models/recipe';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { author, title, description, ingredients, steps, imageUrl } = body;

    // Validate input data
    if (!author || !title || !description || !ingredients || !steps || !imageUrl) {
      return NextResponse.json({ message: "All fields are required.", success: false }, { status: 400 });
    }

    // Create new recipe
    const newRecipe = new Recipe({
      author,
      title,
      description,
      ingredients,
      steps,
      imageUrl
    });

    // Save to database
    const savedRecipe = await newRecipe.save();

    return NextResponse.json({
      message: "Recipe added successfully.",
      success: true,
      data: savedRecipe
    }, { status: 201 });

  } catch (error) {
    console.error('Error saving recipe:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
