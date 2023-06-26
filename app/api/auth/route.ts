import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const {password} = await req.json();

    const validPassword = process.env.PASSWORD;
    if (password === validPassword) {
        return NextResponse.json({success: true});
    } else {
        return NextResponse.json({success: false});
    }
}