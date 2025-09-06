import { NextRequest, NextResponse } from "next/server";
import { UploadClient } from "@storacha/upload-client";

// Initialize Storacha UploadClient
const client = new UploadClient({ token: process.env.WEB3_STORAGE_TOKEN! });

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const farmerAddress = formData.get("farmerAddress") as string;
        const documents = formData.getAll("documents") as File[];

        if (!farmerAddress || documents.length === 0) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Upload documents to IPFS
        const files = documents.map(file => new File([file], file.name, { type: file.type }));
        const cid = await client.upload(files);

        // In production: call smart contract to vet farmer
        // const contract = new ethers.Contract(REGISTRY_ADDRESS, ABI, signer);
        // await contract.vetFarmer(farmerAddress);

        // Register ENS subdomain (mock for now)
        const ensName = `farmer-${farmerAddress.slice(2, 8)}.farmlink.eth`;

        // Store in database (mock for now)
        console.log(`Farmer ${farmerAddress} vetted with documents at ${cid}`);
        console.log(`ENS name: ${ensName}`);

        return NextResponse.json({
            success: true,
            ensName,
            documentCID: cid,
            message: "Farmer verification submitted successfully",
        });
    } catch (error) {
        console.error("Farmer vetting error:", error);
        return NextResponse.json({ error: "Verification failed" }, { status: 500 });
    }
}
