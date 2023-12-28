const cartData = [
    {
        "_id": "1",
        "userId": "user_123",
        "courses": [
            {
                "_id": "101",
                "category_id": "cat_1",
                "title": "Introduction to Programming",
                "duration": 30,
                "description": "Learn the basics of programming.",
                "price": 49.99
            },
            {
                "_id": "102",
                "category_id": "cat_2",
                "title": "Data Science Fundamentals",
                "duration": 45,
                "description": "Explore the foundations of data science.",
                "price": 59.99
            }
        ]
    },
    {
        "_id": "2",
        "userId": "user_456",
        "courses": [
            {
                "_id": "103",
                "category_id": "cat_3",
                "title": "Advanced JavaScript",
                "duration": 60,
                "description": "Master advanced concepts in JavaScript.",
                "price": 79.99
            },
            {
                "_id": "104",
                "category_id": "cat_2",
                "title": "Machine Learning Basics",
                "duration": 50,
                "description": "An introduction to machine learning principles.",
                "price": 69.99
            }
        ]
    },
]

module.exports = cartData
