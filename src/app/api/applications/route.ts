import dbConnect from "@/lib/dbConnect";
import Application from "@/lib/models/Application";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const applications = await Application.find();
    return NextResponse.json(applications);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newApplication = await Application.create(body);
    return NextResponse.json(newApplication);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...updateData } = body;
    const updatedApplication = await Application.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedApplication) {
      return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
    }
    return NextResponse.json(updatedApplication);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id } = body;
    const deletedApplication = await Application.findByIdAndDelete(id);
    if (!deletedApplication) {
      return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
