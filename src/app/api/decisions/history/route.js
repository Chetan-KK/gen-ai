// app/api/decisions/qa/route.js

export async function GET(request) {
    // Dummy data to be sent as response
    const dummyData = [
        {
            "id": 1,
            "date": "2023-05-15",
            "description": "Launched new product line",
            "outcome": "Successful",
            "impact": "15% increase in revenue",
            "impactValue": 15
        },
        {
            "id": 2,
            "date": "2023-04-01",
            "description": "Implemented cost-cutting measures",
            "outcome": "Partially successful",
            "impact": "10% reduction in operational costs",
            "impactValue": 10
        },
        {
            "id": 3,
            "date": "2023-03-10",
            "description": "Expanded into European market",
            "outcome": "Ongoing",
            "impact": "5% increase in global market share",
            "impactValue": 5
        }
    ];

    // Send the dummy data as JSON response
    return new Response(JSON.stringify(dummyData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
