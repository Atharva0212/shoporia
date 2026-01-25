export const subCategories=[
  'mobile-phones',
  'laptops',
  'cameras',
  'audio',
  'accessories',
  't-shirts',
  'jackets',
  'hoodies',
  'jeans',
  'sweaters',
  'running-shoes',
  'sneakers',
  'boots',
  'chairs',
  'tables',
  'beds-and-sofas',
  'kitchen-appliances',
  'cleaning-appliances',
  'climate-control',
  'remote-control',
  'educational-toys',
  'board-games-and-puzzles',
  'gym-equipment',
  'outdoor-sports'
] as const;

export type SubCategory=typeof subCategories[number];