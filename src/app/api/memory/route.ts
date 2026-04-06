import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // The user's prompt assumes FormData is used for file upload
    const formData = await req.formData();
    
    // Fallback if the user is not authenticated (for demo purposes / to match typical setups)
    const userId = user?.id || null;

    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;

    console.log("FORM:", title, date, file);

    let fileUrl = null;

    // upload file to storage
    if (file && file.size > 0) {
      // Need arrayBuffer from File to upload to Supabase storage
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const fileName = `${userId || 'anonymous'}/${Date.now()}-${file.name}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('memory_gallery')
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false
        });
        
      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('memory_gallery')
        .getPublicUrl(fileName);
        
      fileUrl = publicUrl;
    }

    // SAVE TO DB
    const { data: memory, error } = await supabase
      .from('memories')
      .insert({
        user_id: userId,
        title,
        date,
        type,
        description,
        media_url: fileUrl,
        // The old 'image_url' and 'caption' are nullable now, but we can also set fallback values if required
      })
      .select()
      .single();

    if (error) {
      console.error("Database save error:", error);
      throw error;
    }

    return NextResponse.json(memory);

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to save memory", error: error.message },
      { status: 500 }
    );
  }
}
