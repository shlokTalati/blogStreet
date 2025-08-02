const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require('dotenv').config({path: './app/config/.env'});

const { User } = require("./app/model/userModel");
const { Category } = require("./app/model/categoryModel");
const { Post } = require("./app/model/postModel");

const MONGO_URI = process.env.MONGO_URI;

const usersData = [
    { name: "John Doe", email: "john@example.com", password: "DUMMY" },
    { name: "Jane Smith", email: "jane@example.com", password: "DUMMY" },
    { name: "Alex Brown", email: "alex@example.com", password: "DUMMY" },
];

const categoriesData = [
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
    { name: "Self Improvement", description: "Growth habits, routines, and personal development." },
];

const postsData = [
    {
        authorName: "John Doe",
        title: "The Rise of AI in Everyday Technology",
        content: "Artificial Intelligence is transforming our daily gadgets, from smart assistants to predictive algorithms. This post explores the impact of AI on consumer technology and what the future holds.",
        categories: ["Technology", "Science"],
        imageUrls: [],
    },
    {
        authorName: "Jane Smith",
        title: "Top Study Techniques That Actually Work",
        content: "Tired of ineffective study methods? This article highlights evidence-based techniques like spaced repetition and active recall that can boost your learning efficiency.",
        categories: ["Education", "Self Improvement"],
        imageUrls: [],
    },
    {
        authorName: "Alex Brown",
        title: "10 Healthy Lifestyle Habits to Start Today",
        content: "From mindful eating to daily exercise, adopting these habits can improve your productivity and overall well-being. Learn how to make lasting changes without overwhelming yourself.",
        categories: ["Lifestyle", "Self Improvement", "Mental Health"],
        imageUrls: [],
    },
    {
        authorName: "John Doe",
        title: "Exploring the Hidden Gems of Bali",
        content: "Beyond the crowded beaches, Bali offers serene temples, lush rice terraces, and unique cultural experiences. Here's a travel guide to some lesser-known spots for your next trip.",
        categories: ["Travel", "Lifestyle"],
        imageUrls: [],
    },
    {
        authorName: "Jane Smith",
        title: "5 Easy Recipes for Busy Weeknights",
        content: "Cooking doesn’t have to be complicated. These quick and delicious recipes are perfect for anyone with a hectic schedule looking to eat healthy.",
        categories: ["Food", "Lifestyle"],
        imageUrls: [],
    },
    {
        authorName: "Alex Brown",
        title: "Smart Investing Strategies for Beginners",
        content: "Investing can be intimidating, but starting with the right approach can secure your financial future. This post covers basics like diversification, risk management, and long-term planning.",
        categories: ["Finance", "Business"],
        imageUrls: [],
    },
    {
        authorName: "John Doe",
        title: "How to Nail Your Next Job Interview",
        content: "Preparation and confidence are key to interview success. Here are practical tips on answering common questions and making a great impression.",
        categories: ["Career", "Self Improvement"],
        imageUrls: [],
    },
    {
        authorName: "Jane Smith",
        title: "The Best TV Shows to Binge This Year",
        content: "From thrilling dramas to laugh-out-loud comedies, this list covers the must-watch shows that have captivated audiences worldwide.",
        categories: ["Entertainment"],
        imageUrls: [],
    },
    {
        authorName: "Alex Brown",
        title: "Understanding the Current Political Climate",
        content: "A balanced look at recent political developments and their implications on society and economy. Stay informed with this digest of the latest news.",
        categories: ["Politics"],
        imageUrls: [],
    },
    {
        authorName: "John Doe",
        title: "Startup Success Stories: Lessons from the Best",
        content: "Entrepreneurs share insights on how they built their startups from the ground up. Learn the strategies and mindsets that helped them thrive in competitive markets.",
        categories: ["Business", "Technology"],
        imageUrls: [],
    },
];

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");

        // Clear collections
        await User.deleteMany({});
        await Category.deleteMany({});
        await Post.deleteMany({});

        // Hash password once for all users
        const hashedPassword = await bcrypt.hash("DUMMY", 10);

        // Insert users
        const usersToInsert = usersData.map(user => ({
            name: user.name,
            email: user.email,
            password: hashedPassword,
        }));
        const insertedUsers = await User.insertMany(usersToInsert);
        const userMap = {};
        insertedUsers.forEach(user => {
            userMap[user.name] = user._id;
        });

        // Insert categories
        const insertedCategories = await Category.insertMany(categoriesData);
        const categoryMap = {};
        insertedCategories.forEach(category => {
            categoryMap[category.name] = category._id;
        });

        // Insert posts
        const postsToInsert = postsData.map(post => ({
            author: userMap[post.authorName],
            title: post.title,
            content: post.content,
            categories: post.categories.map(category => categoryMap[category]),
            imageUrls: post.imageUrls || [],
            createdAt: new Date(),
        }));

        await Post.insertMany(postsToInsert);

        console.log("Seeding complete!");
        process.exit(0);
    } catch (err) {
        console.error("Error during seeding:", err);
        process.exit(1);
    }
}

async function seedDatabase() {
    const existingUsers = await User.find({});
    if (existingUsers.length > 0) {
        console.log("Database already seeded. Skipping...");
        process.exit(0);
    }
}
seed();