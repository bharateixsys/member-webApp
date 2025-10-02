import ToastService from "@services/ToastService";
export const fetchMemberCard = async (memberId, token) => {
    const response = await fetch(
        `/api/membercard?memberId=${encodeURIComponent(memberId)}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    console.log(response);

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMsg = errorData?.error || "Failed to card request";
        ToastService.error(errorMsg);
        return;
    }
    return await response.json();
};
