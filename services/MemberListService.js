export const fetchMembersWithUrls = async (username, memberId, token) => {
    if (!token) {
        ToastService.error("Session expired. Please login again.");
        window.location.href = "/login";
        return { members: [], plan: null };
    }

    let result = null;

    try {
        const response = await fetch(
            `/api/member/details?username=${encodeURIComponent(username)}&memberId=${encodeURIComponent(memberId)}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 401 || response.status === 403) {
            console.log("Session Expired to login");
            window.location.href = "/login";
            return { members: [], plan: null };
        }

        try {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                result = await response.json();
            } else {
                const text = await response.text();
                console.log("Non-JSON response from /api/member/details:", text);
            }
        } catch (err) {
            console.log("Failed to parse JSON from /api/member/details:", err.message);
        }

        if (!response.ok || !result?.Success) {
            ToastService.error(result?.Message || "Failed to Get Member Data");
            return { members: [], plan: null };
        }
    } catch (err) {
        console.error("API call to /api/member/details failed:", err.message);
        return { members: [], plan: null };
    }

    const members = result?.Data?.Members || [];
    const plans = result?.Data?.Plans?.[0] || null;

    const results = await Promise.all(
        members.map(async (m) => {
            try {
                const resp = await fetch(
                    `/api/Test/idcard-pdf?memberId=${encodeURIComponent(m.Member_ID)}`
                );
                const resps = await fetch(
                    `/api/Test/idcard-pdf?memberId=${encodeURIComponent(m.Member_ID)}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            //Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!resp.ok) return { ...m, fileUrl: "" };
                console.log(resp);
                console.log(resps);
                let data = null;
                try {
                    const contentType = resp.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        data = await resp.json();
                        console.log(data);
                    } else {
                        console.log("Invalid API response from /api/Test/idcard-pdf", await resp.text());
                    }
                } catch (err) {
                    console.log("Failed to parse JSON from /api/Test/idcard-pdf", err.message);
                }

                return { ...m, fileUrl: data?.url || "" };
            } catch (err) {
                console.error("Error fetching ID card for member:", m.Member_ID, err.message);
                return { ...m, fileUrl: "" };
            }
        })
    );

    return { members: results, plan: plans };
};
