import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Magic } from 'magic-sdk';

// Initialize Magic for server-side DID token validation
const magic = new Magic(process.env.MAGIC_SECRET_KEY!);

export async function POST(request: NextRequest) {
    try {
        const { email, didToken, address } = await request.json();

        if (!email || !didToken) {
            return NextResponse.json({ error: 'Email and DID token are required' }, { status: 400 });
        }

        // For now, we'll trust the frontend validation and use the provided address
        // In production, you should validate the DID token server-side
        const userAddress = address || `0x${Math.random().toString(16).substr(2, 40)}`;
        const userEmail = email;

        // Generate JWT token
        const token = jwt.sign(
            {
                email: userEmail,
                address: userAddress,
                role: null,
                isVetted: false
            },
            process.env.JWT_SECRET || 'farmlink-secret',
            { expiresIn: '7d' }
        );

        return NextResponse.json({
            success: true,
            token,
            user: {
                email: userEmail,
                address: userAddress,
                role: null,
                isVetted: false
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
}
