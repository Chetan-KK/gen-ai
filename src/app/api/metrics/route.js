// app/api/decisions/qa/route.js

export async function GET(request) {
    // Dummy data to be sent as response
    const dummyData = {
        "cards": {
            "Total Sales": "$5.2M",
            "Customer Retention": "85%",
            "Profit Margin": "22%"
        },
        "chartData": [
            {
                "x": ["Jan", "Feb", "Mar", "Apr", "May"],
                "y": [1000000, 1100000, 1300000, 1400000, 1500000],
                "type": "scatter",
                "mode": "lines+markers",
                "name": "Monthly Sales"
            },
            {
                "x": ["Jan", "Feb", "Mar", "Apr", "May"],
                "y": [82, 83, 84, 84, 85],
                "type": "scatter",
                "mode": "lines+markers",
                "name": "Customer Retention (%)"
            },
            {
                "x": ["Jan", "Feb", "Mar", "Apr", "May"],
                "y": [18, 19, 20, 21, 22],
                "type": "scatter",
                "mode": "lines+markers",
                "name": "Profit Margin (%)"
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
