'use server'

import { v2 as cloudinary } from 'cloudinary'
import { requireAuth } from '@/lib/auth/auth-helper'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function getCloudinarySignature(paramsToSign: Record<string, string>) {
  try {
    const session = await requireAuth()
    if (!session) {
      return { success: false, error: 'Unauthorized access' }
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    )

    return { success: true, signature }
  } catch (error) {
    console.error('[CLOUDINARY_SIGN_ERROR]', error)
    return { success: false, error: 'Internal server error' }
  }
}
