"use server";

export async function createBooking(params) {
  try {
    const { ideaData } = params || {};

    if (!ideaData) {
      return { success: false, error: "No data provided" };
    }

    const { _id, ideaTitle, category, tags, estimatedBudget } = ideaData;
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const res = await fetch(`${serverUrl}/api/idea`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ideaId: _id,
        ideaTitle,
        category,
        tags,
        estimatedBudget,
        createdAt: new Date(),
      }),
    });

    if (!res.ok) {
      throw new Error("Booking Failed");
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, error: error.message };
  }
}
