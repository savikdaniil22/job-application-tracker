import dbConnect from "@/lib/dbConnect";
import Application from "@/lib/models/Application";
import { NextResponse } from "next/server";

// Получить все записи
export async function GET() {
  try {
    await dbConnect(); // Подключаемся к базе данных
    const applications = await Application.find(); // Получаем все записи
    return NextResponse.json(applications);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// Добавить новую запись
export async function POST(req: Request) {
  try {
    await dbConnect(); // Подключаемся к базе данных
    const body = await req.json();
    const newApplication = await Application.create(body); // Создаём новую запись
    return NextResponse.json(newApplication);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// Обновить запись
export async function PUT(req: Request) {
  try {
    await dbConnect(); // Подключаемся к базе данных
    const body = await req.json();
    const { id, ...updateData } = body;
    const updatedApplication = await Application.findByIdAndUpdate(id, updateData, { new: true }); // Обновляем запись
    if (!updatedApplication) {
      return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
    }
    return NextResponse.json(updatedApplication);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// Удалить запись
export async function DELETE(req: Request) {
  try {
    await dbConnect(); // Подключаемся к базе данных
    const body = await req.json();
    const { id } = body;
    const deletedApplication = await Application.findByIdAndDelete(id); // Удаляем запись
    if (!deletedApplication) {
      return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
