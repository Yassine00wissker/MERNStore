import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

dotenv.config();
await connectDB();

// Sample products with real image URLs from Unsplash
const sampleProducts = [
  // Electronics
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life. Perfect for music lovers and professionals. Features active noise cancellation, crystal-clear sound quality, and comfortable over-ear design.",
    category: "Electronics",
    price: 199.99,
    quantity: 25,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
  },
  {
    name: "Smartphone Pro Max",
    description: "Latest generation smartphone with 6.7-inch OLED display, triple camera system, 5G connectivity, and all-day battery life. Includes 256GB storage and advanced AI features.",
    category: "Electronics",
    price: 899.99,
    quantity: 15,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop"
  },
  {
    name: "Smart Watch Series 8",
    description: "Advanced fitness tracking smartwatch with heart rate monitor, GPS, sleep tracking, and 50+ workout modes. Water-resistant and compatible with iOS and Android.",
    category: "Electronics",
    price: 349.99,
    quantity: 30,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Waterproof portable speaker with 360-degree sound, 20-hour battery, and built-in microphone. Perfect for outdoor adventures and parties.",
    category: "Electronics",
    price: 79.99,
    quantity: 35,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop"
  },
  {
    name: "Tablet Pro 12.9",
    description: "12.9-inch tablet with M2 chip, 256GB storage, and Apple Pencil support. Perfect for artists, students, and professionals on the go.",
    category: "Electronics",
    price: 1099.99,
    quantity: 10,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop"
  },
  {
    name: "Wireless Earbuds Pro",
    description: "Premium true wireless earbuds with active noise cancellation, spatial audio, and 8-hour battery life. Includes charging case with wireless charging.",
    category: "Electronics",
    price: 249.99,
    quantity: 28,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop"
  },
  {
    name: "Digital Camera 4K",
    description: "Professional 4K digital camera with 24MP sensor, 4K video recording, and interchangeable lens system. Perfect for photography enthusiasts.",
    category: "Electronics",
    price: 599.99,
    quantity: 12,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop"
  },
  {
    name: "Action Camera 4K",
    description: "Waterproof 4K action camera with image stabilization, 30m waterproof case, and 170-degree wide-angle lens. Perfect for adventure sports.",
    category: "Electronics",
    price: 199.99,
    quantity: 20,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop"
  },
  {
    name: "Smart TV 55 inch",
    description: "55-inch 4K Ultra HD Smart TV with HDR, voice control, and streaming apps. Crystal-clear picture quality and immersive sound.",
    category: "Electronics",
    price: 699.99,
    quantity: 8,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop"
  },
  {
    name: "VR Headset",
    description: "Immersive virtual reality headset with 4K display, motion tracking, and hand controllers. Experience gaming and entertainment like never before.",
    category: "Electronics",
    price: 399.99,
    quantity: 15,
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&h=500&fit=crop"
  },
  // Computers
  {
    name: "Gaming Laptop",
    description: "High-performance gaming laptop with RTX 4070 graphics card, 16GB RAM, 1TB SSD, and 15.6-inch 144Hz display. Perfect for gaming and content creation.",
    category: "Computers",
    price: 1499.99,
    quantity: 8,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop"
  },
  {
    name: "4K Ultra HD Monitor",
    description: "27-inch 4K UHD monitor with HDR support, 144Hz refresh rate, and color-accurate display. Perfect for gaming, design work, and content creation.",
    category: "Computers",
    price: 399.99,
    quantity: 12,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop"
  },
  {
    name: "Desktop PC Tower",
    description: "Powerful desktop PC with Intel i7 processor, 32GB RAM, 1TB SSD, and RTX 4060 graphics. Ready for gaming, video editing, and multitasking.",
    category: "Computers",
    price: 1299.99,
    quantity: 6,
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500&h=500&fit=crop"
  },
  {
    name: "All-in-One PC",
    description: "27-inch all-in-one desktop computer with touchscreen, Intel i5 processor, 16GB RAM, and 512GB SSD. Sleek design, powerful performance.",
    category: "Computers",
    price: 999.99,
    quantity: 10,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=500&fit=crop"
  },
  // Accessories
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with precision tracking, long battery life, and customizable buttons. Perfect for office work and gaming.",
    category: "Accessories",
    price: 49.99,
    quantity: 50,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop"
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with Cherry MX switches, customizable keys, and durable aluminum frame. Ideal for typing and gaming enthusiasts.",
    category: "Accessories",
    price: 129.99,
    quantity: 20,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop"
  },
  {
    name: "USB-C Hub",
    description: "Multi-port USB-C hub with HDMI, USB 3.0 ports, SD card reader, and power delivery. Compatible with MacBook, iPad, and Windows laptops.",
    category: "Accessories",
    price: 59.99,
    quantity: 40,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop"
  },
  {
    name: "Webcam HD 1080p",
    description: "Full HD 1080p webcam with auto-focus, built-in microphone, and privacy shutter. Ideal for video calls, streaming, and online meetings.",
    category: "Accessories",
    price: 89.99,
    quantity: 22,
    image: "https://images.unsplash.com/photo-1587825147138-346c006f3bcd?w=500&h=500&fit=crop"
  },
  {
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand with ergonomic design, improves posture and cooling. Fits laptops up to 17 inches.",
    category: "Accessories",
    price: 34.99,
    quantity: 30,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
  },
  {
    name: "Wireless Charger",
    description: "Fast wireless charging pad compatible with Qi-enabled devices. Sleek design with LED indicator and overcharge protection.",
    category: "Accessories",
    price: 24.99,
    quantity: 45,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop"
  },
  {
    name: "Laptop Backpack",
    description: "Durable laptop backpack with padded compartment for 15-inch laptops, multiple pockets, and USB charging port. Water-resistant material.",
    category: "Accessories",
    price: 69.99,
    quantity: 25,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop"
  },
  // Storage
  {
    name: "External SSD 1TB",
    description: "Fast external SSD with USB-C connectivity, read speeds up to 1050MB/s, and compact design. Perfect for backups, file transfers, and portable storage.",
    category: "Storage",
    price: 119.99,
    quantity: 18,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop"
  },
  {
    name: "External HDD 2TB",
    description: "Portable 2TB external hard drive with USB 3.0, plug-and-play functionality. Perfect for storing photos, videos, and documents.",
    category: "Storage",
    price: 79.99,
    quantity: 20,
    image: "https://images.unsplash.com/photo-1591488320449-11f0e6e944d6?w=500&h=500&fit=crop"
  },
  {
    name: "USB Flash Drive 256GB",
    description: "High-speed USB 3.0 flash drive with 256GB capacity, compact design, and keychain loop. Perfect for transferring files on the go.",
    category: "Storage",
    price: 29.99,
    quantity: 35,
    image: "https://images.unsplash.com/photo-1609250293831-c65e1379a7f4?w=500&h=500&fit=crop"
  },
  // Furniture
  {
    name: "Gaming Chair",
    description: "Ergonomic gaming chair with lumbar support, adjustable armrests, and 360-degree swivel. Comfortable for long gaming sessions and work.",
    category: "Furniture",
    price: 299.99,
    quantity: 15,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop"
  },
  {
    name: "LED Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness, color temperature control, and USB charging port. Touch control and memory function included.",
    category: "Furniture",
    price: 39.99,
    quantity: 45,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop"
  },
  {
    name: "Standing Desk",
    description: "Electric height-adjustable standing desk with memory presets, smooth motor, and spacious desktop. Promotes healthy work habits.",
    category: "Furniture",
    price: 449.99,
    quantity: 10,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop"
  },
  {
    name: "Office Chair",
    description: "Ergonomic office chair with mesh back, adjustable height, lumbar support, and 5-year warranty. Comfortable for 8+ hour workdays.",
    category: "Furniture",
    price: 199.99,
    quantity: 18,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=500&fit=crop"
  },
  // Clothing & Fashion
  {
    name: "Cotton T-Shirt",
    description: "Premium 100% organic cotton t-shirt, soft and breathable. Available in multiple colors. Perfect for casual wear.",
    category: "Clothing",
    price: 24.99,
    quantity: 60,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop"
  },
  {
    name: "Denim Jeans",
    description: "Classic fit denim jeans with stretch fabric for comfort. Durable construction and timeless style. Multiple sizes available.",
    category: "Clothing",
    price: 59.99,
    quantity: 40,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop"
  },
  {
    name: "Leather Jacket",
    description: "Genuine leather jacket with quilted lining, multiple pockets, and classic biker style. Perfect for cool weather.",
    category: "Clothing",
    price: 199.99,
    quantity: 15,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop"
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with cushioned sole, breathable mesh upper, and excellent traction. Perfect for jogging and workouts.",
    category: "Clothing",
    price: 89.99,
    quantity: 35,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"
  },
  {
    name: "Winter Coat",
    description: "Warm winter coat with down insulation, waterproof exterior, and adjustable hood. Keeps you warm in freezing temperatures.",
    category: "Clothing",
    price: 149.99,
    quantity: 20,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&h=500&fit=crop"
  },
  // Home & Kitchen
  {
    name: "Coffee Maker",
    description: "Programmable coffee maker with 12-cup capacity, auto-shutoff, and brew strength control. Start your day with perfect coffee.",
    category: "Home & Kitchen",
    price: 79.99,
    quantity: 25,
    image: "https://images.unsplash.com/photo-1517668808823-7113c1c0b0c5?w=500&h=500&fit=crop"
  },
  {
    name: "Air Fryer",
    description: "Large capacity air fryer with digital display, multiple cooking presets, and non-stick basket. Healthier cooking with less oil.",
    category: "Home & Kitchen",
    price: 129.99,
    quantity: 18,
    image: "https://images.unsplash.com/photo-1608039829573-803fb48872d6?w=500&h=500&fit=crop"
  },
  {
    name: "Blender Pro",
    description: "High-powered blender with 1500W motor, glass pitcher, and multiple speed settings. Perfect for smoothies, soups, and sauces.",
    category: "Home & Kitchen",
    price: 99.99,
    quantity: 22,
    image: "https://images.unsplash.com/photo-1574279606137-9a1c6104cecc?w=500&h=500&fit=crop"
  },
  {
    name: "Stainless Steel Cookware Set",
    description: "10-piece stainless steel cookware set with non-stick coating, heat-resistant handles, and dishwasher safe. Complete kitchen solution.",
    category: "Home & Kitchen",
    price: 149.99,
    quantity: 12,
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&h=500&fit=crop"
  },
  {
    name: "Smart Thermostat",
    description: "Wi-Fi enabled smart thermostat with app control, energy-saving features, and learning capabilities. Reduce energy costs.",
    category: "Home & Kitchen",
    price: 199.99,
    quantity: 15,
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=500&h=500&fit=crop"
  },
  // Sports & Outdoors
  {
    name: "Yoga Mat",
    description: "Premium non-slip yoga mat with extra cushioning, eco-friendly material, and carrying strap. Perfect for yoga and fitness.",
    category: "Sports & Outdoors",
    price: 34.99,
    quantity: 40,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop"
  },
  {
    name: "Dumbbell Set",
    description: "Adjustable dumbbell set with weight range 5-50 lbs per dumbbell, quick-change system, and compact storage. Home gym essential.",
    category: "Sports & Outdoors",
    price: 249.99,
    quantity: 10,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop"
  },
  {
    name: "Bicycle",
    description: "Mountain bike with 21-speed gears, front suspension, disc brakes, and aluminum frame. Perfect for trails and city riding.",
    category: "Sports & Outdoors",
    price: 399.99,
    quantity: 8,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
  },
  {
    name: "Tent 4-Person",
    description: "Weatherproof 4-person camping tent with easy setup, rainfly, and mesh windows. Perfect for family camping adventures.",
    category: "Sports & Outdoors",
    price: 149.99,
    quantity: 12,
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500&h=500&fit=crop"
  },
  // Books
  {
    name: "Programming Book: JavaScript",
    description: "Comprehensive guide to modern JavaScript programming. Covers ES6+, async programming, and best practices. 500+ pages.",
    category: "Books",
    price: 39.99,
    quantity: 30,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop"
  },
  {
    name: "Cookbook: Healthy Recipes",
    description: "Collection of 200+ healthy and delicious recipes with beautiful photography. Includes meal prep tips and nutritional information.",
    category: "Books",
    price: 24.99,
    quantity: 25,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=500&fit=crop"
  },
  {
    name: "Fiction Novel: Mystery",
    description: "Bestselling mystery novel with gripping plot and unforgettable characters. Perfect for weekend reading.",
    category: "Books",
    price: 14.99,
    quantity: 50,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop"
  },
  // Beauty & Personal Care
  {
    name: "Skincare Set",
    description: "Complete skincare set with cleanser, toner, serum, and moisturizer. Suitable for all skin types. Natural ingredients.",
    category: "Beauty & Personal Care",
    price: 79.99,
    quantity: 20,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop"
  },
  {
    name: "Electric Toothbrush",
    description: "Sonic electric toothbrush with 5 cleaning modes, 2-minute timer, and USB charging. Removes 3x more plaque than manual brushing.",
    category: "Beauty & Personal Care",
    price: 59.99,
    quantity: 30,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&h=500&fit=crop"
  },
  {
    name: "Hair Dryer",
    description: "Professional hair dryer with ionic technology, multiple heat settings, and concentrator nozzle. Fast drying with less damage.",
    category: "Beauty & Personal Care",
    price: 49.99,
    quantity: 25,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=500&fit=crop"
  },
  // Toys & Games
  {
    name: "Board Game Collection",
    description: "Set of 5 popular board games including strategy, party, and family games. Hours of entertainment for all ages.",
    category: "Toys & Games",
    price: 89.99,
    quantity: 15,
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&h=500&fit=crop"
  },
  {
    name: "LEGO Building Set",
    description: "1000+ piece LEGO building set with detailed instructions. Encourages creativity and problem-solving skills. Ages 8+.",
    category: "Toys & Games",
    price: 79.99,
    quantity: 18,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
  },
  {
    name: "Remote Control Drone",
    description: "4K camera drone with GPS, auto-return, and 30-minute flight time. Perfect for aerial photography and fun flying.",
    category: "Toys & Games",
    price: 199.99,
    quantity: 12,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop"
  },
  // Health & Fitness
  {
    name: "Fitness Tracker",
    description: "Advanced fitness tracker with heart rate monitor, sleep tracking, 20+ workout modes, and 7-day battery life.",
    category: "Health & Fitness",
    price: 99.99,
    quantity: 28,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40f17da?w=500&h=500&fit=crop"
  },
  {
    name: "Resistance Bands Set",
    description: "Set of 5 resistance bands with different resistance levels, door anchor, and exercise guide. Perfect for home workouts.",
    category: "Health & Fitness",
    price: 24.99,
    quantity: 35,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop"
  },
  {
    name: "Foam Roller",
    description: "High-density foam roller for muscle recovery and flexibility. 18 inches long, perfect for full-body massage.",
    category: "Health & Fitness",
    price: 19.99,
    quantity: 40,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop"
  }
];

async function importData() {
  try {
    // Find or create a test seller user
    let testSeller = await User.findOne({ email: "test-seller@example.com" });
    
    if (!testSeller) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      testSeller = await User.create({
        name: "Test Seller",
        email: "test-seller@example.com",
        password: hashedPassword,
        role: "seller"
      });
      console.log("✅ Created test seller user:", testSeller.email);
    } else {
      console.log("✅ Using existing test seller:", testSeller.email);
    }

    // Remove existing products (comment out if you don't want that)
    await Product.deleteMany();
    
    // Add owner to each product
    const productsWithOwner = sampleProducts.map(product => ({
      ...product,
      owner: testSeller._id
    }));
    
    const created = await Product.insertMany(productsWithOwner);
    console.log(`✅ Inserted ${created.length} products with images.`);
    console.log(`📦 Products belong to seller: ${testSeller.name} (${testSeller.email})`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error importing data:", err);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await Product.deleteMany();
    console.log("✅ All products removed.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error destroying data:", err);
    process.exit(1);
  }
}

// Command line: node seeder.js        -> imports sample data
//               node seeder.js -d     -> deletes all products
const arg = process.argv[2];
if (arg === "-d") {
  await destroyData();
} else {
  await importData();
}
