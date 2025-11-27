import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

interface ProjectDetails {
  category: string;
  service: string;
  location: string;
  year: string;
  area: string;
  description: string;
  fullDescription: string;
  description2?: string;
  images: string[];
}

interface Project {
  id: string;
  image: string;
  title: string;
  slug: string;
  category: string;
  service: string;
  location: string;
  details: ProjectDetails;
}

let projects: Project[] = [];

export async function GET() {
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newProject: Project = {
      id: uuidv4(),
      image: body.image || "",
      title: body.title || "",
      slug: body.slug || (body.title ? body.title.toLowerCase().replaceAll(/\s+/g, "-") : ""),
      category: body.category || "",
      service: body.service || "",
      location: body.location || "",
      details: {
        category: body.details?.category || "",
        service: body.details?.service || "",
        location: body.details?.location || "",
        year: body.details?.year || "",
        area: body.details?.area || "",
        description: body.details?.description || "",
        fullDescription: body.details?.fullDescription || "",
        description2: body.details?.description2 || "",
        images: body.details?.images || [],
      },
    };

    projects.push(newProject);

    return NextResponse.json({ success: true, projects });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    const projectIndex = projects.findIndex((p) => p.id === id);
    if (projectIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...body,
      details: {
        ...projects[projectIndex].details,
        ...body.details,
      },
    };

    return NextResponse.json({ success: true, projects });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    projects = projects.filter((p) => p.id !== id);

    return NextResponse.json({ success: true, projects });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
