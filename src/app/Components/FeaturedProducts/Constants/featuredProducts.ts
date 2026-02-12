import { FeaturedProductCardData } from "../type";

export const featuredProducts:FeaturedProductCardData[]=[
  {
    slug: 'chair',
    name: 'Chair',
    price: 11999,
    originalPrice: 13999,
    image: 'https://plus.unsplash.com/premium_photo-1683133939183-edd5476e6200?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hhaXJ8ZW58MHwyfDB8fHww'
  },
  {
    slug: 'coffee-maker',
    name: 'Coffee maker',
    price: 4999,
    originalPrice: 5499,
    image: 'https://images.unsplash.com/photo-1608354580875-30bd4168b351?w=500&auto=format&fit=crop&q=60'
  },
  {
    slug: 'magnetic-exercise-bike',
    name: 'Magnetic Exercise Bike',
    price: 15999,
    originalPrice: 20999,
    image: 'https://images.unsplash.com/photo-1707985287164-c84627ad6eba?w=500&auto=format&fit=crop&q=60'
  },
  {
    slug: 'noise-cancelling-headphones',
    name: 'Noise cancelling headphones',
    price: 18000,
    originalPrice: 20000,
    image: 'https://images.unsplash.com/photo-1765279339828-bb765f3631c8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    slug: 'skyphantom-4k-camera-drone',
    name: 'SkyPhantom 4K Camera Drone',
    price: 12999,
    originalPrice: 18499,
    image: 'https://plus.unsplash.com/premium_photo-1714618849685-89cad85746b1?w=500&auto=format&fit=crop&q=60'
  },
  {
    slug: 't-shirt',
    name: 'T-shirt',
    price: 799,
    originalPrice: 999,
    image: 'https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww'
  }
]as const;