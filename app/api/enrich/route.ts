export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    let html = "";

    // Fetch website HTML
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      html = await response.text();
    } catch (error) {
      console.error("Website fetch failed:", error);
      return new Response(
        JSON.stringify({
          summary: "Website could not be fetched.",
          whatTheyDo: ["Unable to fetch website content"],
          keywords: [],
          signals: [],
          source: url,
          timestamp: new Date().toISOString(),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Clean HTML: remove scripts, styles, and tags
    const cleanText = html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "") 
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")  
      .replace(/<[^>]+>/g, " ")                            
      .replace(/\s+/g, " ")                                
      .trim();

    // Generate simple summary
    const summary = cleanText.slice(0, 200) + (cleanText.length > 200 ? "..." : "");

    // Extract simple keywords: take most frequent words (basic approach)
    const words = cleanText.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
    const frequency: Record<string, number> = {};
    words.forEach(word => frequency[word] = (frequency[word] || 0) + 1);
    const keywords = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);

    // Signals: check for presence of common business/contact terms
    const signals = [];
    if (cleanText.match(/contact|email|phone|support/)) signals.push("Contact info present");
    if (cleanText.match(/about|company|team/)) signals.push("Company info present");
    if (cleanText.match(/product|service|offer/)) signals.push("Products/Services mentioned");

    // What they do: extract first meaningful sentence
   const sentences = cleanText.match(/[^\.!\?]+[\.!\?]/g);
const whatTheyDo = [sentences?.[0]?.trim() || "Description unavailable"];

    const result = {
      summary,
      whatTheyDo,
      keywords,
      signals,
      source: url,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Processing failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}