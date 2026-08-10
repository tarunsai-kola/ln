const fs = require('fs');
const filePath = 'c:\\\\Users\\\\tarun\\\\OneDrive\\\\Desktop\\\\Aiiens Campus\\\\frontend\\\\src\\\\AdvTeam\\\\AdvTeamHeader.jsx';
let content = fs.readFileSync(filePath, 'utf-8');

const svgIcons = {
  dashboard: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"></rect><rect x="14" y="3" width="7" height="5" rx="1"></rect><rect x="14" y="12" width="7" height="9" rx="1"></rect><rect x="3" y="16" width="7" height="5" rx="1"></rect></svg>`,
  trophy: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`,
  bullseye: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
  list: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`,
  book: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
  tasks: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`,
  history: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  timesCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  signIn: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>`,
  userPlus: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>`,
  money: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
  logout: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`
};

const newSidebar = `      {/* Redesigned Premium Sidebar */}
      <style>{\`
        .premium-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 280px;
          background: #0f172a;
          color: #f8fafc;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          box-shadow: 4px 0 24px rgba(0,0,0,0.15);
          overflow-y: auto;
          transition: all 0.3s ease;
        }
        .premium-sidebar::-webkit-scrollbar {
          width: 6px;
        }
        .premium-sidebar::-webkit-scrollbar-thumb {
          background-color: #334155;
          border-radius: 4px;
        }
        .sidebar-profile {
          padding: 30px 20px;
          background: linear-gradient(180deg, rgba(30,41,59,1) 0%, rgba(15,23,42,1) 100%);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          text-align: center;
        }
        .sidebar-profile h2 {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 5px 0;
          text-transform: capitalize;
        }
        .sidebar-profile h3 {
          font-size: 13px;
          color: #94a3b8;
          margin: 0 0 12px 0;
          font-weight: 400;
        }
        .badge {
          display: inline-block;
          background: rgba(59,130,246,0.1);
          color: #3b82f6;
          border: 1px solid rgba(59,130,246,0.2);
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .badge.team-badge {
          background: rgba(16,185,129,0.1);
          color: #10b981;
          border-color: rgba(16,185,129,0.2);
        }
        .sidebar-nav {
          padding: 20px 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .sidebar-nav a, .sidebar-nav button {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: #cbd5e1;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.2s ease;
          background: transparent;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          font-family: inherit;
        }
        .sidebar-nav a:hover, .sidebar-nav button:hover {
          background: rgba(255,255,255,0.05);
          color: #ffffff;
          transform: translateX(4px);
        }
        .sidebar-nav a svg, .sidebar-nav button svg {
          color: #64748b;
          transition: color 0.2s ease;
        }
        .sidebar-nav a:hover svg, .sidebar-nav button:hover svg {
          color: #3b82f6;
        }
        .sidebar-nav button.logout-btn {
          margin-top: 20px;
          color: #ef4444;
        }
        .sidebar-nav button.logout-btn:hover {
          background: rgba(239,68,68,0.1);
          color: #f87171;
        }
        .sidebar-nav button.logout-btn:hover svg {
          color: #f87171;
        }
      \`}</style>

      {isMobileVisible && (
        <div className="premium-sidebar">
          <div className="sidebar-profile">
            {advTeamData ? (
              <>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%', background: '#3b82f6', 
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', fontWeight: 'bold', margin: '0 auto 15px',
                  boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
                }}>
                  {advTeamData.fullname.charAt(0).toUpperCase()}
                </div>
                <h2>{advTeamData.fullname}</h2>
                <h3>{advTeamData.email}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <span className="badge">{advTeamData.designation}</span>
                  <span className="badge team-badge">{advTeamData.team}</span>
                </div>
              </>
            ) : (
              <div style={{ color: '#94a3b8', padding: '20px' }}>Loading Profile...</div>
            )}
          </div>
          
          <div className="sidebar-nav">
            <Link to="/advteam/home">
              ${svgIcons.dashboard} Home
            </Link>
            <Link to="/advteam/leaderboard">
              ${svgIcons.trophy} LeaderBoard
            </Link>
            {["LEADER", "MANAGER"].includes(advTeamData?.designation) && (
              <Link to="/advteam/assigntarget">
                ${svgIcons.bullseye} Assign Target
              </Link>
            )}
            {(advTeamData?.designation === "ADV Manager" ||
              advTeamData?.designation === "MANAGER" ||
              advTeamData?.designation === "ADV Leader" ||
              advTeamData?.designation === "LEADER" ||
              advTeamData?.designation === "SR Inside Sales Specialist" ||
              advTeamData?.designation === "Inside Sales Specialist" ||
              advTeamData?.designation === "inside_sales_specialist") && (
                <Link to="/advteam/my-leads">
                  ${svgIcons.list} My Leads
                </Link>
              )}
            {(advTeamData?.designation === "ADV Manager" ||
              advTeamData?.designation === "MANAGER" ||
              advTeamData?.designation === "ADV Leader" ||
              advTeamData?.designation === "LEADER" ||
              advTeamData?.designation === "SR Inside Sales Specialist" ||
              advTeamData?.designation === "Inside Sales Specialist" ||
              advTeamData?.designation === "inside_sales_specialist") && (
                <Link to="/advteam/leads-book">
                  ${svgIcons.book} Leads Book
                </Link>
              )}
            {(advTeamData?.designation === "ADV Manager" ||
              advTeamData?.designation === "MANAGER" ||
              advTeamData?.designation === "ADV Leader" ||
              advTeamData?.designation === "LEADER") && (
                <Link to="/advteam/lead-management">
                  ${svgIcons.tasks} Lead Management
                </Link>
              )}
            {(advTeamData?.designation === "ADV Manager" ||
              advTeamData?.designation === "MANAGER" ||
              advTeamData?.designation === "ADV Leader" ||
              advTeamData?.designation === "LEADER") && (
                <Link to="/advteam/record">
                  ${svgIcons.history} Call Record
                </Link>
              )}
            <Link to="/advteam/booked">
              ${svgIcons.calendar} Booked Payment
            </Link>
            <Link to="/advteam/fullpaid">
              ${svgIcons.checkCircle} Full Payment
            </Link>
            <Link to="/advteam/default">
              ${svgIcons.timesCircle} Default Payment
            </Link>
            <Link to="/advteam/adduser">
              ${svgIcons.book} Add Name/Email
            </Link>
            {["LEADER", "MANAGER", "ADV Leader", "ADV Manager"].includes(advTeamData?.designation) && (
              <>
                <Link to="/advteam/teamdetail">
                  ${svgIcons.users} Team
                </Link>
                <Link to="/advteam/team-login">
                  ${svgIcons.signIn} Team Login
                </Link>
              </>
            )}
            {advTeamData?.designation === "MANAGER" &&
              advTeamData?.Access === true && (
                <Link to="/advteam/addteam">
                  ${svgIcons.userPlus} Add Team
                </Link>
              )}
            <Link to="/advteam/revenue">
              ${svgIcons.money} Revenue
            </Link>
            
            <button className="logout-btn" onClick={handleLogout}>
              ${svgIcons.logout} Logout
            </button>
          </div>
        </div>
      )}`;

const startIndex = content.indexOf('{isMobileVisible && (\\n        <div className="sidebar"');
if (startIndex !== -1) {
    const endIndex = content.indexOf('</div>\\n      )}', startIndex) + 16;
    if (endIndex > startIndex + 16) {
        const replacePortion = content.substring(startIndex, endIndex);
        content = content.replace(replacePortion, newSidebar.trim());
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Sidebar replaced successfully');
    } else {
        console.log('Could not find end of sidebar block');
    }
} else {
    console.log('Could not find start of sidebar block');
}
