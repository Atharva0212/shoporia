
export type SearchProduct = {
  key: string;
  productName: string;
  brand: string;
  thumbnail: string;
};

export const searchProduct: SearchProduct[] = [
  {
    brand: 'Apple',
    thumbnail: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?_gl=1*1803mbb*_ga*MTkzOTkxNjMzNC4xNzY3NDI5MTEy*_ga_8JE65Q40S6*czE3Njc0NDQ4OTMkbzIkZzEkdDE3Njc0NDU0ODckajYwJGwwJGgw',
    key: 'iphone-16',
    productName: 'iPhone 16'
  },
  {
    brand: 'Samsung',
    thumbnail: 'https://images.pexels.com/photos/4716356/pexels-photo-4716356.jpeg?_gl=1*16jda8b*_ga*MTkzOTkxNjMzNC4xNzY3NDI5MTEy*_ga_8JE65Q40S6*czE3Njc0NDQ4OTMkbzIkZzEkdDE3Njc0NDQ5MTQkajM5JGwwJGgw',
    key: 'samsung-galaxy-z-flip-5',
    productName: 'Samsung Galaxy Z Flip 5'
  },
  {
    brand: 'Asus',
    thumbnail: 'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg',
    key: 'asus-rog-phone-7',
    productName: 'Asus ROG Phone 7'
  },
  {
    brand: 'Xiaomi',
    thumbnail: 'https://images.unsplash.com/photo-1655356392708-c675781f1748?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENoaW5pc2UlMjBzbWFydCUyMHBob25lfGVufDB8fDB8fHww',
    key: 'redmi-note-12',
    productName: 'Redmi Note 12'
  },
  {
    brand: 'Samsung',
    thumbnail: 'https://images.unsplash.com/photo-1738830241330-ae47f3708ad4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    key: 'samsung-galaxy-s25',
    productName: 'Samsung Galaxy S25'
  },
  {
    brand: 'Asus',
    thumbnail: 'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    key: 'gaming-laptop',
    productName: 'Gaming laptop'
  },
  {
    brand: 'Lenovo',
    thumbnail: 'https://images.pexels.com/photos/6325888/pexels-photo-6325888.jpeg?_gl=1*mx3qnn*_ga*MTkzOTkxNjMzNC4xNzY3NDI5MTEy*_ga_8JE65Q40S6*czE3Njc0NDQ4OTMkbzIkZzEkdDE3Njc0NDYzNjgkajUyJGwwJGgw',
    key: 'business-laptop',
    productName: 'Business laptop'
  },
  {
    brand: 'HP',
    thumbnail: 'https://images.pexels.com/photos/6053286/pexels-photo-6053286.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    key: 'ultrabook-laptop',
    productName: 'Ultrabook laptop'
  },
  {
    brand: 'Dell',
    thumbnail: 'https://images.pexels.com/photos/1266982/pexels-photo-1266982.jpeg?_gl=1*uq0n4a*_ga*MTkzOTkxNjMzNC4xNzY3NDI5MTEy*_ga_8JE65Q40S6*czE3Njc0NDQ4OTMkbzIkZzEkdDE3Njc0NDY0ODEkajUzJGwwJGgw',
    key: 'convertible-laptop',
    productName: 'Convertible laptop'
  },
  {
    brand: 'Acer',
    thumbnail: 'https://images.pexels.com/photos/7394015/pexels-photo-7394015.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    key: 'notebook-computer',
    productName: 'Notebook computer'
  },
  {
    brand: 'Canon',
    thumbnail: 'https://images.pexels.com/photos/1787220/pexels-photo-1787220.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    key: 'dslr-camera',
    productName: 'DSLR camera'
  },
  {
    brand: 'Sony',
    thumbnail: 'https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?_gl=1*k2qe5t*_ga*MTkzOTkxNjMzNC4xNzY3NDI5MTEy*_ga_8JE65Q40S6*czE3Njc0NDQ4OTMkbzIkZzEkdDE3Njc0NDY3NjIkajM4JGwwJGgw',
    key: 'mirrorless-camera',
    productName: 'Mirrorless camera'
  },
  {
    brand: 'Canon',
    thumbnail: 'https://images.pexels.com/photos/2984630/pexels-photo-2984630.jpeg?_gl=1*ipcayu*_ga*MTkzOTkxNjMzNC4xNzY3NDI5MTEy*_ga_8JE65Q40S6*czE3Njc0NDQ4OTMkbzIkZzEkdDE3Njc0NDY4ODYkajIxJGwwJGgw',
    key: 'point-and-shoot-camera',
    productName: 'Point and shoot camera'
  },
  {
    brand: 'GoPro',
    thumbnail: 'https://images.pexels.com/photos/690806/pexels-photo-690806.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    key: 'action-camera',
    productName: 'Action camera'
  },
  {
    brand: 'Nikon',
    thumbnail: 'https://images.pexels.com/photos/690806/pexels-photo-690806.jpeg?_gl=1*ewsofh*_ga*MTkzOTkxNjMzNC4xNzY3NDI5MTEy*_ga_8JE65Q40S6*czE3Njc0NDQ4OTMkbzIkZzEkdDE3Njc0NDY5MjYkajUzJGwwJGgw',
    key: 'professional-camera',
    productName: 'Professional camera'
  },
  {
    brand: 'Sony',
    thumbnail: 'https://images.pexels.com/photos/610945/pexels-photo-610945.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    key: 'wireless-headphones',
    productName: 'Wireless headphones'
  },
  {
    brand: 'Bose',
    thumbnail: 'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    key: 'over-ear-headphones',
    productName: 'Over ear headphones'
  },
  {
    brand: 'Sony',
    thumbnail: 'https://images.unsplash.com/photo-1612478120679-5b7412e15f84?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    key: 'noise-cancelling-headphones',
    productName: 'Noise cancelling headphones'
  },
  {
    brand: 'Apple',
    thumbnail: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    key: 'earbuds',
    productName: 'Earbuds'
  },
  {
    brand: 'JBL',
    thumbnail: 'https://images.pexels.com/photos/1279365/pexels-photo-1279365.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    key: 'bluetooth-speaker',
    productName: 'Bluetooth speaker'
  },
  {
    brand: 'Mi',
    thumbnail: 'https://images.unsplash.com/photo-1706275399494-fb26bbc5da63?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    key: 'power-bank',
    productName: 'Power bank'
  },
  {
    brand: 'Samsung',
    thumbnail: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?w=500',
    key: 'smart-watch',
    productName: 'Smart watch'
  },
  {
    brand: 'Logitech',
    thumbnail: 'https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg?w=500',
    key: 'wireless-mouse',
    productName: 'Wireless mouse'
  },
  {
    brand: 'SanDisk',
    thumbnail: 'https://images.pexels.com/photos/5474286/pexels-photo-5474286.jpeg?_gl=1*14hszd7*_ga*MTkzOTkxNjMzNC4xNzY3NDI5MTEy*_ga_8JE65Q40S6*czE3Njc0NDQ4OTMkbzIkZzEkdDE3Njc0NDc4MzkkajU1JGwwJGgw',
    key: 'usb-drive',
    productName: 'USB drive'
  },
  {
    brand: 'Redragon',
    thumbnail: 'https://images.pexels.com/photos/532173/pexels-photo-532173.jpeg?w=500',
    key: 'keyboard',
    productName: 'Keyboard'
  },
  {
    brand: 'FashionCo',
    thumbnail: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    key: 't-shirt',
    productName: 'T-shirt'
  },
  {
    brand: 'FashionCo',
    thumbnail: 'https://images.unsplash.com/photo-1556098539-3019e1bdf05e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fEphY2tldHxlbnwwfHwwfHx8MA%3D%3D',
    key: 'jacket',
    productName: 'Jacket'
  },
  {
    brand: 'FashionCo',
    thumbnail: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9vZGllfGVufDB8fDB8fHww',
    key: 'hoodie',
    productName: 'Hoodie'
  },
  {
    brand: 'FashionCo',
    thumbnail: 'https://images.pexels.com/photos/603022/pexels-photo-603022.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    key: 'jeans',
    productName: 'Jeans'
  },
  {
    brand: 'FashionCo',
    thumbnail: 'https://images.unsplash.com/photo-1606246521962-399c38ab3d0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHN3ZWF0ZXJ8ZW58MHx8MHx8fDA%3D',
    key: 'sweater',
    productName: 'Sweater'
  },
  {
    brand: 'FashionCo',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1663036305464-5abcd6b7fd18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFJ1bm5pbmclMjBTaG9lc3xlbnwwfHwwfHx8MA%3D%3D',
    key: 'running-shoes',
    productName: 'Running Shoes'
  },
  {
    brand: 'FashionCo',
    thumbnail: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNuZWFrZXJzfGVufDB8fDB8fHww',
    key: 'sneakers',
    productName: 'Sneakers'
  },
  {
    brand: 'FashionCo',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1673367751802-ed858d3950d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEJvb3RzfGVufDB8fDB8fHww',
    key: 'boots',
    productName: 'Boots'
  },
  {
    brand: 'Heritage Furnishings',
    thumbnail: 'https://images.pexels.com/photos/3773583/pexels-photo-3773583.png?_gl=1*1ggxxoa*_ga*MTkzOTkxNjMzNC4xNzY3NDI5MTEy*_ga_8JE65Q40S6*czE3Njc0NTc2MzckbzMkZzEkdDE3Njc0NTc5MjMkajM5JGwwJGgw',
    key: 'wooden-dining-chair',
    productName: 'Wooden Dining Chair'
  },
  {
    brand: 'Urban Living',
    thumbnail: 'https://images.unsplash.com/photo-1678016935857-396bfff65aae?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    key: 'modern-coffee-table',
    productName: 'Modern Coffee Table'
  },
  {
    brand: 'Comfort Plus',
    thumbnail: 'https://images.pexels.com/photos/3757055/pexels-photo-3757055.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    key: 'luxury-recliner-sofa',
    productName: 'Luxury Recliner Sofa'
  },
  {
    brand: 'WorkEase',
    thumbnail: 'https://images.pexels.com/photos/31726663/pexels-photo-31726663.jpeg?_gl=1*naj5ge*_ga*MTkzOTkxNjMzNC4xNzY3NDI5MTEy*_ga_8JE65Q40S6*czE3NzA2NzMzMjEkbzYkZzEkdDE3NzA2NzMzNjkkajEyJGwwJGgw',
    key: 'ergonomic-office-chair',
    productName: 'Ergonomic Office Chair'
  },
  {
    brand: 'Heritage Furnishings',
    thumbnail: 'https://images.pexels.com/photos/14063638/pexels-photo-14063638.jpeg?_gl=1*j7tqwo*_ga*MTkzOTkxNjMzNC4xNzY3NDI5MTEy*_ga_8JE65Q40S6*czE3Njc0NTc2MzckbzMkZzEkdDE3Njc0NTg5OTckajYwJGwwJGgw',
    key: 'oak-wood-side-table',
    productName: 'Oak Wood Side Table'
  },
  {
    brand: 'Comfort Plus',
    thumbnail: 'https://images.pexels.com/photos/5942505/pexels-photo-5942505.jpeg?_gl=1*wimtbz*_ga*MTkzOTkxNjMzNC4xNzY3NDI5MTEy*_ga_8JE65Q40S6*czE3Njc0NTc2MzckbzMkZzEkdDE3Njc0NTkyOTgkajQ4JGwwJGgw',
    key: 'premium-sofa',
    productName: 'Premium Sofa'
  },
  {
    brand: 'GameMaster',
    thumbnail: 'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?_gl=1*y9g42y*_ga*MTkzOTkxNjMzNC4xNzY3NDI5MTEy*_ga_8JE65Q40S6*czE3Njc0NTc2MzckbzMkZzEkdDE3Njc0NTk2NDckajIxJGwwJGgw',
    key: 'chair',
    productName: 'Chair'
  },
  {
    brand: 'ComfortLine',
    thumbnail: 'https://images.unsplash.com/photo-1759722667524-d11dd52824e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEFybWNoYWlyfGVufDB8MnwwfHx8MA%3D%3D',
    key: 'armchair',
    productName: 'Armchair'
  },
  {
    brand: 'WoodWorks',
    thumbnail: 'https://images.pexels.com/photos/534172/pexels-photo-534172.jpeg?_gl=1*mijh3u*_ga*MTkzOTkxNjMzNC4xNzY3NDI5MTEy*_ga_8JE65Q40S6*czE3Njc0NTc2MzckbzMkZzEkdDE3Njc0NTk5MzgkajQ5JGwwJGgw',
    key: 'dining-table',
    productName: 'Dining Table'
  },
  {
    brand: 'SkyPhantom',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1714618849685-89cad85746b1?w=500&auto=format&fit=crop&q=60',
    key: 'skyphantom-4k-camera-drone',
    productName: 'SkyPhantom 4K Camera Drone'
  },
  {
    brand: 'ThunderDrift',
    thumbnail: 'https://images.unsplash.com/photo-1732947655987-add693211191?w=500&auto=format&fit=crop&q=60',
    key: 'thunderdrift-4wd-rc-car',
    productName: 'ThunderDrift 4WD RC Race Car'
  },
  {
    brand: 'STEM-Learn',
    thumbnail: 'https://images.unsplash.com/photo-1723863947861-f4f5bdd30db5?w=500&auto=format&fit=crop&q=60',
    key: 'solar-system-planetarium-kit',
    productName: 'Solar System Planetarium Kit'
  },
  {
    brand: 'STEM-Learn',
    thumbnail: 'https://images.unsplash.com/photo-1589254066007-898d52d910d3?w=500&auto=format&fit=crop&q=60',
    key: 'junior-coding-robot',
    productName: 'Junior Coding Robot'
  },
  {
    brand: 'TableTop',
    thumbnail: 'https://images.unsplash.com/photo-1719749938238-731b576cc694?w=500&auto=format&fit=crop&q=60',
    key: 'world-explorer-board-game',
    productName: 'World Explorer Board Game'
  },
  {
    brand: 'BuildTech',
    thumbnail: 'https://images.unsplash.com/photo-1653749576886-059215c7a777?w=500&auto=format&fit=crop&q=60',
    key: '3d-mechanical-wooden-models',
    productName: '3D Mechanical Wooden Models'
  },
  {
    brand: 'HomeTech',
    thumbnail: 'https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxlbmRlcnxlbnwwfHwwfHx8MA%3D%3D',
    key: 'blender',
    productName: 'Blender'
  },
  {
    brand: 'HomeTech',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1718559007272-26a72b83fdcc?w=500&auto=format&fit=crop&q=60',
    key: 'toaster',
    productName: 'Toaster'
  },
  {
    brand: 'HomeTech',
    thumbnail: 'https://images.unsplash.com/photo-1539021897569-06e9fa3c6bb9?w=500&auto=format&fit=crop&q=60',
    key: 'coffee-maker',
    productName: 'Coffee maker'
  },
  {
    brand: 'Ecovacs',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1729225213654-64b8dcde192c?w=500&auto=format&fit=crop&q=60',
    key: 'smart-robot-vacuum-cleaner',
    productName: 'Smart Robot Vacuum Cleaner'
  },
  {
    brand: 'Philips',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1676810460039-661fc847e395?w=500&auto=format&fit=crop&q=60',
    key: 'cordless-handheld-vacuum-cleaner',
    productName: 'Cordless Handheld Vacuum Cleaner'
  },
  {
    brand: 'Mi',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1721133277839-8aff26601b6b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    key: 'hepa-air-purifier-for-home',
    productName: 'HEPA Air Purifier for Home'
  },
  {
    brand: 'Havells',
    thumbnail: 'https://images.unsplash.com/photo-1581153691064-8d0ec09725b9?w=500&auto=format&fit=crop&q=60',
    key: 'energy-efficient-ceiling-fan',
    productName: 'Energy Efficient Ceiling Fan'
  },
  {
    brand: 'Bajaj',
    thumbnail: 'https://images.unsplash.com/photo-1669724290258-cbc731160fb3?w=500&auto=format&fit=crop&q=60',
    key: 'electric-room-heater',
    productName: 'Electric Room Heater'
  },
  {
    brand: 'FitPro',
    thumbnail: 'https://images.unsplash.com/photo-1637578600529-6fc14e74b96d?w=500&auto=format&fit=crop&q=60',
    key: 'electric-treadmill',
    productName: 'Electric Treadmill'
  },
  {
    brand: 'PowerFlex',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1723921356647-2a3c6b6016c9?w=500&auto=format&fit=crop&q=60',
    key: 'dumbbells-set',
    productName: 'Dumbbells Set'
  },
  {
    brand: 'CardioMax',
    thumbnail: 'https://images.unsplash.com/photo-1707985287164-c84627ad6eba?w=500&auto=format&fit=crop&q=60',
    key: 'magnetic-exercise-bike',
    productName: 'Magnetic Exercise Bike'
  },
  {
    brand: 'IronGrip',
    thumbnail: 'https://images.unsplash.com/photo-1632077804406-188472f1a810?w=500&auto=format&fit=crop&q=60',
    key: 'cast-iron-kettlebell',
    productName: 'Cast Iron Kettlebell'
  },
  {
    brand: 'GoalStrike',
    thumbnail: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=500&auto=format&fit=crop&q=60',
    key: 'match-pro-soccer-ball',
    productName: 'Match Pro Soccer Ball'
  },
  {
    brand: 'PowerFlex',
    thumbnail: 'https://images.unsplash.com/photo-1592494624782-b5bee232f156?w=500&auto=format&fit=crop&q=60',
    key: 'heavy-duty-adjustable-weight-bench',
    productName: 'Heavy-Duty Adjustable Weight Bench'
  },
  {
    brand: 'HoopMaster',
    thumbnail: 'https://images.unsplash.com/photo-1640576905072-8181534f83ae?w=500&auto=format&fit=crop&q=60',
    key: 'street-grip-basketball',
    productName: 'Street Grip Basketball'
  },
  {
    brand: 'Apex',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1684096758247-6f63d471b3f2?w=500&auto=format&fit=crop&q=60',
    key: 'apex-mountain-cycling-bike',
    productName: 'Apex Mountain Cycling Bike'
  }
]