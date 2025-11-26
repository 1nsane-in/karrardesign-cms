import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const GIST_ID = "117e211ec2dab089e7efca3b945fb3d0";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const { name, sector } = await request.json();

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
      gistData.files["karrar-patners.json"].content
    );

    const updatedContent = [...currentContent, { id: uuidv4(), name, sector }];

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
            "karrar-patners.json": {
              content: JSON.stringify(updatedContent, null, 2),
            },
          },
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Failed to update gist");
    }

    return NextResponse.json({ success: true, clients: updatedContent });
  } catch (error) {
    console.error("Error updating gist:", error);
    return NextResponse.json(
      { error: "Failed to update clients" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, sector } = await request.json();

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
      gistData.files["karrar-patners.json"].content
    );

    const updatedContent = currentContent.map(
      (client: { id: string; name: string; sector: string }) =>
        client.id === id ? { id, name, sector } : client
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
            "karrar-patners.json": {
              content: JSON.stringify(updatedContent, null, 2),
            },
          },
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Failed to update gist");
    }

    return NextResponse.json({ success: true, clients: updatedContent });
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Failed to update client" },
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
      gistData.files["karrar-patners.json"].content
    );

    const updatedContent = currentContent.filter(
      (client: { id: string }) => client.id !== id
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
            "karrar-patners.json": {
              content: JSON.stringify(updatedContent, null, 2),
            },
          },
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Failed to update gist");
    }

    return NextResponse.json({ success: true, clients: updatedContent });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Failed to delete client" },
      { status: 500 }
    );
  }
}
