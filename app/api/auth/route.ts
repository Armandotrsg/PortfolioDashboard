import { NextResponse, NextRequest } from "next/server";

interface APIRequest extends NextRequest {
    json(): Promise<{password: string}>;
}

export async function POST(req: APIRequest) {
    const {password} = await req.json();

    const validPassword = process.env.PASSWORD;
    if (password === validPassword) {
        return NextResponse.json({success: true});
    } else {
        return NextResponse.json({success: false});
    }
}