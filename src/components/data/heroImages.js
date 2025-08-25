// Use public paths for hero images to preserve full quality
// Vite's image processing was degrading the quality of these large hero images
const base = '/hero_images/1-Young-clients.jpg';

const grid = [
  '/hero_images/2-small-business-owners.jpg',
  '/hero_images/3-coworkers.jpg',
  '/hero_images/4-retires.jpg',
  '/hero_images/5-excited-customer.jpg',
];

export const heroImages = { base, grid };
export default heroImages;
