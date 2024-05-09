import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(){
    const data = await getServerSession()
    return NextResponse.json({
        message:data
    })
}