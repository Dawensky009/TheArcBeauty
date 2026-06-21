import { NextResponse } from "next/server";
import { getReviews, getRatingSummary } from "@/lib/data";

// Cache the Google response for 24h to respect quota + Places ToS.
export const revalidate = 86400;

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
}

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (key && placeId) {
    try {
      const url =
        `https://maps.googleapis.com/maps/api/place/details/json` +
        `?place_id=${placeId}&fields=rating,user_ratings_total,reviews&reviews_sort=newest&key=${key}`;
      const res = await fetch(url, { next: { revalidate: 86400 } });
      const data = await res.json();
      if (data?.result) {
        return NextResponse.json({
          source: "google",
          rating: data.result.rating ?? null,
          total: data.result.user_ratings_total ?? null,
          reviews: (data.result.reviews ?? []).map((r: GoogleReview) => ({
            author: r.author_name,
            rating: r.rating,
            text: r.text,
            date: r.relative_time_description,
            profilePhoto: r.profile_photo_url ?? null,
          })),
          // Google Places ToS: attribution must be displayed alongside reviews.
          attribution: "Powered by Google",
        });
      }
    } catch {
      /* fall through to curated */
    }
  }

  // Fallback: curated reviews (English source). The Places API caps live
  // reviews at 5, so the full wall is curated in the CMS for design control.
  const summary = getRatingSummary();
  return NextResponse.json({
    source: "curated",
    rating: summary.rating,
    total: summary.total,
    reviews: getReviews().map((r) => ({
      author: r.author,
      rating: r.rating,
      text: r.text.en,
      date: r.date,
    })),
  });
}
