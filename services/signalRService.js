import * as signalR from "@microsoft/signalr";

//const HUB_URL = "https://localhost:7012/NotificationHub";
const HUB_URL = "https://ride-sen-qa-lx-e0ageve6gmf3gtdj.canadacentral-01.azurewebsites.net/NotificationHub";

export const createSignalRConnection = async (userId, onReceive) => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${HUB_URL}?userId=${userId}`)
        .withAutomaticReconnect([0, 2000, 5000, 10000]) 
        .build();

    connection.on("ReceiveNotification", (rUserId, rmemberId, fileUrl) => {
        if (rUserId === userId) {
            onReceive(rmemberId, fileUrl);
        }
    });

    connection.onreconnecting((err) => {
        console.log("SignalR reconnecting...", err?.message);
        onReceive("SYSTEM", "Reconnecting...");
    });

    connection.onreconnected((connectionId) => {
        console.log("SignalR reconnected with ID:", connectionId);
        onReceive("SYSTEM", "Reconnected");
    });

    connection.onclose((err) => {
        console.log("SignalR closed.", err?.message);
        onReceive("SYSTEM", "Disconnected");
    });

    try {
        await connection.start();
        console.log("SignalR connected!");
    } catch (err) {
        console.log("SignalR connection failed:", err.message);
        return null;
    }

    return connection;
};

export const stopConnection = async (connection) => {
    if (connection) {
        try {
            await connection.stop();
            console.log("SignalR disconnected.");
        } catch (err) {
            console.log("Error while stopping SignalR:", err.message);
        }
    }
};
