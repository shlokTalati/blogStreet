// seed.js

const mongoose = require('mongoose');
const { Category } = require('app/model/categoryModel'); // Adjust the path if needed

// MongoDB URI (Change this to your local or remote DB)
const MONGO_URI = 'mongodb://localhost:27017/blogstreet';

// Categories to insert
const categories = [
    { name: "Technology", description: "Posts about the latest in tech, gadgets, and software." },
    { name: "Education", description: "Learning resources, study techniques, and student experiences." },
    { name: "Lifestyle", description: "Tips and blogs on health, productivity, and daily habits." },
    { name: "Travel", description: "Stories and tips from travelers around the world." },
    { name: "Food", description: "Recipes, restaurant reviews, and food photography." },
    { name: "Finance", description: "Insights on budgeting, investing, and financial independence." },
    { name: "Career", description: "Job hunting, resumes, work culture, and interviews." },
    { name: "Entertainment", description: "Movies, TV shows, books, and celebrity news." },
    { name: "Politics", description: "Political opinions, current events, and government policies." },
    { name: "Business", description: "Startups, entrepreneurship, and business strategies." },
    { name: "Gaming", description: "Game reviews, esports, and gaming culture." },
    { name: "Art & Design", description: "Visual design, digital art, and creative inspiration." },
    { name: "Science", description: "Scientific discoveries, research, and innovation." },
    { name: "Mental Health", description: "Awareness, stories, and tips around mental well-being." },
    { name: "Self Improvement", description: "Growth habits, routines, and personal development." }
];

async function seedCategories() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');

        // Clear existing categories
        await Category.deleteMany({});
        console.log('Old categories deleted');

        // Insert new categories
        const inserted = await Category.insertMany(categories);
        console.log(`${inserted.length} categories inserted`);

        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    } catch (error) {
        console.error('Error seeding categories:', error);
        process.exit(1);
    }
}

await seedCategories();