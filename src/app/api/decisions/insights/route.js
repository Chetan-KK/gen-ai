// app/api/decisions/insights/route.js

export async function GET(request) {
    // Dummy data to be sent as response
    const dummyData = {
        "financial": [
            {
                "id": 1,
                "text": "Revenue has shown a consistent 10% month-over-month growth over the past 5 months."
            },
            {
                "id": 2,
                "text": "Profit margins have improved from 20% to 25% due to better cost management."
            }
        ],
        "operational": [
            {
                "id": 3,
                "text": "Customer support response times have decreased by 15%, improving overall satisfaction."
            },
            {
                "id": 4,
                "text": "Inventory turnover has increased by 8%, indicating better stock management."
            }
        ],
        "strategic": [
            {
                "id": 5,
                "text": "Expanding into the Asian market could potentially increase revenue by 30% within the next year."
            },
            {
                "id": 6,
                "text": "Investing in AI-driven customer service could reduce operational costs by 20% in the long term."
            }
        ]
    };

    // Send the dummy data as JSON response
    return new Response(JSON.stringify(dummyData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
