// app/api/decisions/qa/route.js

export async function GET(request) {
    // Dummy data to be sent as response
    const dummyData = {
        "question": "What is our current customer retention rate?",
        "answer": "Based on the latest data, our current customer retention rate is 85%. This is a 5% improvement from the previous quarter, likely due to the implementation of our new loyalty program and improved customer support response times."
    };

    // Send the dummy data as JSON response
    return new Response(JSON.stringify(dummyData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
