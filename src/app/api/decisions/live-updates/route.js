// app/api/decisions/qa/route.js

export async function GET(request) {
    // Dummy data to be sent as response
    const dummyData = {
        "timestamps": ["2023-06-01T10:00:00Z", "2023-06-01T10:05:00Z", "2023-06-01T10:10:00Z", "2023-06-01T10:15:00Z", "2023-06-01T10:20:00Z"],
        "values": [100, 105, 103, 110, 112]
    };

    // Send the dummy data as JSON response
    return new Response(JSON.stringify(dummyData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
