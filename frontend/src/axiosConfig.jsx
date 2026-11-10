import axios from "axios";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    (config) => {
        const bdaToken = localStorage.getItem("bdaToken");
        const operationToken = localStorage.getItem("operationToken");
        const advOperationToken = localStorage.getItem("advOperationToken");
        const advTeamToken = localStorage.getItem("advTeamToken");
        const token = localStorage.getItem("token");
        const adminToken = localStorage.getItem("adminToken");
        const hrToken = localStorage.getItem("hrToken");

        const currentPath = window.location.pathname.toLowerCase();

        // Path groups based on App.jsx routes
        const bdaPaths = ["/home", "/fullpaid", "/default", "/booked", "/onboarding", "/adduser", "/teamdetail", "/bdarevenuesheet", "/reference", "/companyleads", "/addteam", "/assigntarget", "/leaderboard"];
        const opPaths = ["/operationdashboard", "/fullpayment", "/bookedpayment", "/defaultpayment", "/operationrevenuesheet", "/mentorcheckin"];
        const advOpPaths = ["/advoperationdashboard", "/advfullpayment", "/advbookedpayment", "/advdefaultpayment", "/advoperationrevenuesheet", "/advmentorcheckin", "/mentorcheckin"];
        const adminPaths = ["/admindashboard", "/addcourse", "/addadvcourse", "/addmodule", "/addadvmodule", "/pendingapplication", "/acceptedapplication", "/bookedlist", "/halfpayment", "/defaultlist", "/fullpaidlist", "/createoperation", "/createadvoperation", "/createbda", "/createadvteam", "/createmanager", "/mentorqueries", "/advancequeries", "/revenuesheet", "/advrevenuesheet", "/createplacementcoordinator", "/onboardingdetails", "/advonboardingdetails", "/advbooked", "/advfullpaid", "/advdefault", "/allteamdetail", "/advteamdetail", "/masterclasses", "/addevent", "/eventregistration", "/target", "/alumnidata", "/inactivebda", "/createmarketingteam", "/createinterviewer", "/createhr", "/createinterview", "/adminprojectpage", "/advprojectpage", "/advexercisepage", "/advleadmanagement", "/adminanalytics", "/advadmindashboard", "/admin/agents", "/admin/teams", "/admin/leadassignments", "/admin/agentactivity", "/admin/reports", "/bulkimport", "/admin/attendance", "/advusermanagement", "/admin/calllogs", "/advformleads", "/admin-career-assessment", "/advreferrals", "/assignmentorop", "/admin/absent-requests", "/absent-requests"];

        // Clear invalid authorization string if present
        if (config.headers.Authorization === "Bearer null" || config.headers.Authorization === "Bearer undefined") {
            delete config.headers.Authorization;
        }

        // Only apply default tokens if no Authorization header is already set
        if (!config.headers.Authorization) {
            if ((bdaPaths.includes(currentPath) || currentPath.includes("bda")) && bdaToken) {
                config.headers.Authorization = bdaToken.startsWith("Bearer ") ? bdaToken : `Bearer ${bdaToken}`;
            } else if (currentPath.includes("advteam") && advTeamToken) {
                config.headers.Authorization = advTeamToken.startsWith("Bearer ") ? advTeamToken : `Bearer ${advTeamToken}`;
            } else if ((advOpPaths.includes(currentPath) || currentPath.includes("advoperation")) && advOperationToken) {
                config.headers.Authorization = advOperationToken.startsWith("Bearer ") ? advOperationToken : `Bearer ${advOperationToken}`;
            } else if ((opPaths.includes(currentPath) || currentPath.includes("operation")) && operationToken) {
                config.headers.Authorization = operationToken.startsWith("Bearer ") ? operationToken : `Bearer ${operationToken}`;
            } else if ((currentPath.includes("hr") || currentPath.includes("absent-requests")) && (hrToken || adminToken)) {
                const activeToken = hrToken || adminToken;
                config.headers.Authorization = activeToken.startsWith("Bearer ") ? activeToken : `Bearer ${activeToken}`;
            } else if ((adminPaths.includes(currentPath) || currentPath.includes("admin")) && adminToken) {
                config.headers.Authorization = adminToken.startsWith("Bearer ") ? adminToken : `Bearer ${adminToken}`;
            } else if (token) {
                config.headers.Authorization = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
            }
        }



        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const currentPath = window.location.pathname.toLowerCase();
            if (!currentPath.includes("login") && !currentPath.includes("loginadmin") && !currentPath.includes("/marketing/login")) {
                // Clear ALL tokens
                const keysToRemove = [
                    "token", "userEmail", "userId", "adminToken",
                    "bdaToken", "operationToken", "advOperationToken",
                    "advTeamToken", "advTeamId", "advTeamName", "advTeamSessionStartTime",
                    "atdToken", "atdUser"
                ];
                keysToRemove.forEach(key => localStorage.removeItem(key));

                // Redirect based on path
                const adminPaths = ["/admindashboard", "/addcourse", "/addadvcourse", "/addmodule", "/addadvmodule", "/pendingapplication", "/acceptedapplication", "/bookedlist", "/halfpayment", "/defaultlist", "/fullpaidlist", "/createoperation", "/createadvoperation", "/createbda", "/createadvteam", "/createmanager", "/mentorqueries", "/advancequeries", "/revenuesheet", "/advrevenuesheet", "/createplacementcoordinator", "/onboardingdetails", "/advonboardingdetails", "/advbooked", "/advfullpaid", "/advdefault", "/allteamdetail", "/advteamdetail", "/masterclasses", "/addevent", "/eventregistration", "/target", "/alumnidata", "/inactivebda", "/createmarketingteam", "/createinterviewer", "/createhr", "/createinterview", "/adminprojectpage", "/advprojectpage", "/advexercisepage", "/advleadmanagement", "/adminanalytics", "/advadmindashboard", "/admin/agents", "/admin/teams", "/admin/leadassignments", "/admin/agentactivity", "/admin/reports", "/bulkimport", "/admin/attendance", "/advusermanagement", "/admin/calllogs", "/advformleads", "/admin-career-assessment", "/advreferrals", "/assignmentorop"];

                if (currentPath.includes("hr") || (currentPath.includes("absent-requests") && localStorage.getItem("hrToken") && !localStorage.getItem("adminToken"))) {
                    window.location.href = "/hrlogin";
                } else if (currentPath.includes("admin") || adminPaths.includes(currentPath)) {
                    window.location.href = "/AdminLogin";
                } else if (currentPath.includes("advteam")) {
                    window.location.href = "/employlogin";
                } else if (currentPath.includes("advoperation")) {
                    window.location.href = "/operationlogin";
                } else if (currentPath.includes("bda") || currentPath.startsWith("/home") || currentPath.startsWith("/booked")) {
                    window.location.href = "/TeamLogin";
                } else if (currentPath.includes("operation")) {
                    window.location.href = "/OperationLogin";
                } else if (currentPath.includes("attendance")) {
                    window.location.href = "/attendance";
                } else {
                    window.location.href = "/login";
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axios;
