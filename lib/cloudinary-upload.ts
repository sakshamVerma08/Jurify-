import { getCloudinarySignature } from '@/actions/cloudinary/sign'

export async function uploadToCloudinary(file: File) {
  // 1. Get the signature from our Server Action
  const timestamp = Math.round(new Date().getTime() / 1000).toString()
  const paramsToSign = {
    timestamp,
    folder: "jurify-kyc",
  }

  const res = await getCloudinarySignature(paramsToSign)

  if (!res.success || !res.signature) {
    throw new Error(res.error || "Failed to get Cloudinary signature")
  }

  const signature = res.signature

  // 2. Upload to Cloudinary directly
  const formData = new FormData()
  formData.append("file", file)
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string)
  formData.append("timestamp", timestamp)
  formData.append("signature", signature)
  formData.append("folder", "jurify-kyc")

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: "POST",
    body: formData,
  })

  if (!uploadRes.ok) {
    throw new Error("Failed to upload to Cloudinary")
  }

  const data = await uploadRes.json()

  return {
    secure_url: data.secure_url,
    public_id: data.public_id,
    name: file.name,
    sizeLabel: `${(data.bytes / 1024 / 1024).toFixed(1)} MB`,
  }
}
