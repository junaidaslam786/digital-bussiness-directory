/**
 * Generate placeholder image URL
 * Using picsum.photos for reliable placeholder images
 */
export function getPlaceholderImage(
  width: number = 800,
  height: number = 600,
  seed?: string
): string {
  // Use picsum.photos with seed for consistent images
  const baseUrl = "https://picsum.photos";
  
  if (seed) {
    return `${baseUrl}/seed/${seed}/${width}/${height}`;
  }
  
  return `${baseUrl}/${width}/${height}`;
}

/**
 * Generate enterprise-specific placeholder image
 */
export function getEnterpriseImage(enterpriseId: string, index: number = 0): string {
  return getPlaceholderImage(800, 600, `${enterpriseId}-${index}`);
}

/**
 * Map of category-specific image IDs from unsplash
 */
const categoryImageMap: Record<string, string> = {
  manufacturing: "1565008576549-f08e9ff3cf52", // Factory/industrial
  technology: "1488590528505-98d2b5aba04b", // Tech/computer
  healthcare: "1576091160399-112ba8d25d1d", // Medical/hospital
  education: "1523050854058-8df90110c9f1", // Classroom/education
  logistics: "1586528116311-ad8dd3c8310d", // Warehouse/logistics
  finance: "1554224311-1696c67c67d4", // Business/finance
  tourism: "1469854523690-44d8cac1a9c8", // Hotel/resort
  "food-beverage": "1414235077428-338989a2e8c0", // Restaurant/food
  retail: "1555421689-d68471e189f2", // Shopping/retail
  consulting: "1521737711867-e3b97375f902", // Office/consulting
  "real-estate": "1560518883-ce1e1c3d589e", // Building/real estate
  entertainment: "1489599849927-2ee91cede3ba", // Entertainment/cinema
};

/**
 * Get category-specific placeholder image from Unsplash
 */
export function getCategoryImage(categorySlug: string, width: number = 800, height: number = 600): string {
  const imageId = categoryImageMap[categorySlug];
  
  if (imageId) {
    return `https://images.unsplash.com/photo-${imageId}?w=${width}&h=${height}&fit=crop&q=80`;
  }
  
  // Fallback to generic business image
  return `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=${width}&h=${height}&fit=crop&q=80`;
}

/**
 * Update enterprise gallery with proper images
 */
export function getEnterpriseGallery(enterpriseId: string, categorySlug: string, count: number = 3) {
  return Array.from({ length: count }, (_, i) => ({
    url: i === 0 ? getCategoryImage(categorySlug) : getEnterpriseImage(enterpriseId, i),
    alt: `Image ${i + 1}`,
  }));
}
