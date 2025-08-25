// Import hero images using Vite's static import system for proper optimization
import baseImage from '../../Assets/hero_images/1-Young-clients.jpg';
import gridImage1 from '../../Assets/hero_images/2-small-business-owners.jpg';
import gridImage2 from '../../Assets/hero_images/3-coworkers.jpg';
import gridImage3 from '../../Assets/hero_images/4-retires.jpg';
import gridImage4 from '../../Assets/hero_images/5-excited-customer.jpg';

const base = baseImage;

const grid = [
  gridImage1,
  gridImage2,
  gridImage3,
  gridImage4,
];

export const heroImages = { base, grid };
export default heroImages;
