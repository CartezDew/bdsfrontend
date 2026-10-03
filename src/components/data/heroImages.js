import clients480 from '../../Assets/Hero/1-Young-clients-480.webp';
import clients800 from '../../Assets/Hero/1-Young-clients-800.webp';
import clients1440 from '../../Assets/Hero/1-Young-clients-1440.webp';
import owners240 from '../../Assets/Hero/2-small-business-owners-240.webp';
import owners480 from '../../Assets/Hero/2-small-business-owners-480.webp';
import owners720 from '../../Assets/Hero/2-small-business-owners-720.webp';
import coworkers240 from '../../Assets/Hero/3-coworkers-240.webp';
import coworkers480 from '../../Assets/Hero/3-coworkers-480.webp';
import coworkers720 from '../../Assets/Hero/3-coworkers-720.webp';
import retirees240 from '../../Assets/Hero/4-retires-240.webp';
import retirees480 from '../../Assets/Hero/4-retires-480.webp';
import retirees720 from '../../Assets/Hero/4-retires-720.webp';
import customer240 from '../../Assets/Hero/5-excited-customer-240.webp';
import customer480 from '../../Assets/Hero/5-excited-customer-480.webp';
import customer720 from '../../Assets/Hero/5-excited-customer-720.webp';

// Allow for object-fit: cover in the tall mobile frame, as well as desktop width.
// Keep the base sizes/srcSet in sync with the early preload in index.html.
const base = {
  src: clients800,
  srcSet: `${clients480} 480w, ${clients800} 800w, ${clients1440} 1440w`,
  sizes: '(max-width: 850px) 380px, 500px',
  width: 5494,
  height: 3665,
  alt: 'Young clients planning their financial future',
};

const gridImage = (small, medium, large, alt) => ({
  src: medium,
  srcSet: `${small} 240w, ${medium} 480w, ${large} 720w`,
  sizes: '(max-width: 850px) 190px, 250px',
  width: 3,
  height: 2,
  alt,
});

const grid = [
  gridImage(owners240, owners480, owners720, 'Small business owners working together'),
  gridImage(coworkers240, coworkers480, coworkers720, 'Coworkers collaborating'),
  gridImage(retirees240, retirees480, retirees720, 'Clients enjoying retirement'),
  gridImage(customer240, customer480, customer720, 'A happy client'),
];

export const heroImages = { base, grid };
export default heroImages;
