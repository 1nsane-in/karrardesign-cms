import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const GIST_ID = "6cf3a9f4c0b75370ab1f03d27747476a";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const { quote, name, description } = await request.json();

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 }
      );
    }

    const gistResponse = await fetch(
      `https://api.github.com/gists/${GIST_ID}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!gistResponse.ok) {
      throw new Error("Failed to fetch gist");
    }

    const gistData = await gistResponse.json();
    const currentContent = JSON.parse(
      gistData.files["karrar-testimonials.json"].content
    );

    const updatedContent = [...currentContent, { id: uuidv4(), quote, name, description }];

    const updateResponse = await fetch(
      `https://api.github.com/gists/${GIST_ID}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: {
            "karrar-testimonials.json": {
              content: JSON.stringify(updatedContent, null, 2),
            },
          },
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Failed to update gist");
    }

    return NextResponse.json({ success: true, testimonials: updatedContent });
  } catch (error) {
    console.error("Error updating gist:", error);
    return NextResponse.json(
      { error: "Failed to update testimonials" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, quote, name, description } = await request.json();

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 }
      );
    }

    const gistResponse = await fetch(
      `https://api.github.com/gists/${GIST_ID}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!gistResponse.ok) {
      throw new Error("Failed to fetch gist");
    }

    const gistData = await gistResponse.json();
    const currentContent = JSON.parse(
      gistData.files["karrar-testimonials.json"].content
    );

    const updatedContent = currentContent.map(
      (testimonial: { id: string; quote: string; name: string; description: string }) =>
        testimonial.id === id ? { id, quote, name, description } : testimonial
    );

    const updateResponse = await fetch(
      `https://api.github.com/gists/${GIST_ID}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: {
            "karrar-testimonials.json": {
              content: JSON.stringify(updatedContent, null, 2),
            },
          },
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Failed to update gist");
    }

    return NextResponse.json({ success: true, testimonials: updatedContent });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 }
      );
    }

    const gistResponse = await fetch(
      `https://api.github.com/gists/${GIST_ID}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!gistResponse.ok) {
      throw new Error("Failed to fetch gist");
    }

    const gistData = await gistResponse.json();
    const currentContent = JSON.parse(
      gistData.files["karrar-testimonials.json"].content
    );

    const updatedContent = currentContent.filter(
      (testimonial: { id: string }) => testimonial.id !== id
    );

    const updateResponse = await fetch(
      `https://api.github.com/gists/${GIST_ID}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: {
            "karrar-testimonials.json": {
              content: JSON.stringify(updatedContent, null, 2),
            },
          },
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Failed to update gist");
    }

    return NextResponse.json({ success: true, testimonials: updatedContent });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}