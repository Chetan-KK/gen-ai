// app/api/decisions/chart js/route.js

export async function GET(request) {
    // Dummy data to be sent as response
    const dummyData = {
        "labels": ["Q1", "Q2", "Q3", "Q4"],
        "values": [1000000, 1200000, 1500000, 1800000],
        "x": [1, 2, 3, 4, 5],
        "y": [2, 4, 1, 5, 3]
    };

    // Send the dummy data as JSON response
    return new Response(JSON.stringify(dummyData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
