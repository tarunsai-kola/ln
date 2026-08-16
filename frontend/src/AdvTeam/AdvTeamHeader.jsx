import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/accenlearn-logo.png";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import UserActivityTracker from "../Components/UserActivityTracker";

const MAIN_WEBSITE_URL = import.meta.env.VITE_MAIN_WEBSITE_URL || "https://www.accenlearn.in";

const AdvTeamHeader = () => {
  const [isMobileVisible, setisMobileVisible] = useState(true);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const advTeamName = localStorage.getItem("advTeamName");
  const advTeamId = localStorage.getItem("advTeamId");
  const [advTeamData, setAdvTeamData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(true);
  const [activeReminder, setActiveReminder] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyStats, setDailyStats] = useState({ 
    callCount: 0, 
    talkTime: 0, 
    targets: { callTarget: 0, talkTimeTarget: 0 },
    leaderboard: { leadingCaller: null, leadingSpeaker: null }
  });
  const dropdownRef = useRef(null);

  const toggleVisibility = () => {
    setisMobileVisible((prevState) => !prevState);
  };

  const handleLogout = () => {
    toast.success("Logged Out", {
      style: {
        border: "1px solid #f15b29",
        padding: "16px",
        color: "#ffffff",
        background: "#1d1e20",
      },
      iconTheme: {
        primary: "#f15b29",
        secondary: "#ffffff",
      },
    });
    setTimeout(() => {
      localStorage.removeItem("advTeamId");
      localStorage.removeItem("advTeamName");
      localStorage.removeItem("advTeamToken");
      localStorage.removeItem("advTeamSessionStartTime");

      navigate("/employlogin");
    }, 1500);
  };

  const checkSession = () => {
    const sessionStartTime = localStorage.getItem("advTeamSessionStartTime");
    if (sessionStartTime) {
      const currentTime = new Date().getTime();
      const expirationTime = 10 * 60 * 60 * 1000; // 10 hours
      if (currentTime - sessionStartTime > expirationTime) {
        toast.error("Session Time Out");
        localStorage.removeItem("advTeamId");
        localStorage.removeItem("advTeamName");
        localStorage.removeItem("advTeamToken");
        localStorage.removeItem("advTeamSessionStartTime");

        navigate("/employlogin");
      }
    } else {
      navigate("/employlogin");
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const fetchAdvTeamData = async () => {
    if (!advTeamId) {
      console.log("Advance Team user not logged in");
      return;
    }
    try {
      const response = await axios.get(`${API}/getadvteam`, { params: { advTeamId } });
      setAdvTeamData(response.data);
    } catch (err) {
      console.log("Failed to fetch advance team data");
    }
  };

  const fetchNotifications = async () => {
    if (!advTeamId) return;
    try {
      const res = await axios.get(`${API}/api/adv-leads/get-my-notifications`, { params: { userId: advTeamId } });
      if (res.data.success) {
        setNotifications(res.data.notifications);
        setUnreadCount(res.data.notifications.length);
        
        // Find the most recent demo reminder
        const demoReminder = res.data.notifications.find(n => n.type === "demo_reminder");
        if (demoReminder) {
          setActiveReminder(demoReminder);
        }
      }
    } catch (err) {
      console.error("Failed to fetch notifications");
    }
  };

  const markNotificationRead = async (id) => {
    try {
      await axios.post(`${API}/api/adv-leads/mark-notification-read`, { notificationId: id });
      setNotifications(prev => prev.filter(n => n._id !== id));
      setUnreadCount(prev => Math.max(0, prev - 1));
      if (activeReminder?._id === id) setActiveReminder(null);
    } catch (err) {
      console.error("Failed to mark notification read");
    }
  };

  const fetchDailyStats = async () => {
    if (!advTeamId) return;
    try {
      const res = await axios.get(`${API}/api/adv-reports/daily-targets/${advTeamId}`, {
        params: { date: selectedDate }
      });
      setDailyStats(res.data);
    } catch (err) {
      console.error("Failed to fetch daily stats");
    }
  };

  const formatTalkTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotificationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchAdvTeamData();
    fetchNotifications();
    fetchDailyStats();
    const interval = setInterval(() => {
      fetchNotifications();
      fetchDailyStats();
    }, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [advTeamId, selectedDate]);

  return (
    <div id="TeamHeader">
      <UserActivityTracker userId={advTeamId} />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', width: '100%', height: '70px', position: 'fixed', top: 0, left: 0, zIndex: 1100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href={MAIN_WEBSITE_URL} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: '35px', objectFit: 'contain' }} />
          </a>
          <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.1)' }}></div>
          <span style={{ color: 'rgba(129, 140, 248, 0.8)', fontSize: '12px', fontWeight: '900', letterSpacing: '0.2em', textTransform: 'uppercase', background: 'rgba(99, 102, 241, 0.1)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>Team Portal</span>
        </div>
        {/* Futuristic Ultra-Premium Stats Section */}
        {dailyStats.targets.callTarget > 0 && (
          <>
            <style>{`
              @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
              }
              .glass-card-futuristic {
                background: rgba(15, 23, 42, 0.9) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1) !important;
              }
              .glow-orange { filter: drop-shadow(0 0 8px rgba(241, 91, 41, 0.4)); }
              .glow-green { filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.4)); }
              .stat-value-neon {
                background: linear-gradient(90deg, #fff, #94a3b8, #fff);
                background-size: 200% auto;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: shimmer 4s linear infinite;
              }
            `}</style>

            <div className="daily-stats-glass glass-card-futuristic" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              padding: '6px 24px',
              borderRadius: '24px',
              margin: '0 20px',
              position: 'relative',
              overflow: 'visible',
              backdropFilter: 'blur(20px)',
            }}>
              {/* Top Highlight line */}
              <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(241, 91, 41, 0.3), transparent)'
              }}></div>

              <div className="date-picker-wrapper" style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', 
                paddingRight: '20px', borderRight: '1px solid rgba(255,255,255,0.1)',
              }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: 'rgba(241, 91, 41, 0.1)',
                  border: '1px solid rgba(241, 91, 41, 0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <i className="fa fa-calendar-o" style={{ color: '#F15B29', fontSize: '14px' }}></i>
                </div>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  style={{
                    border: 'none', background: 'transparent', fontSize: '13px',
                    fontWeight: '700', color: '#CBD5E1', outline: 'none', cursor: 'pointer',
                    letterSpacing: '0.5px'
                  }}
                />
              </div>

              {/* Circular Call Stats */}
              <div className="stat-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ position: 'relative', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg style={{ position: 'absolute', transform: 'rotate(-90deg)', width: '42px', height: '42px' }}>
                    <circle cx="21" cy="21" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    <circle cx="21" cy="21" r="18" fill="none" stroke="#F15B29" strokeWidth="3" 
                      strokeDasharray={2 * Math.PI * 18}
                      strokeDashoffset={2 * Math.PI * 18 * (1 - Math.min(dailyStats.callCount / dailyStats.targets.callTarget, 1))}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                      className="glow-orange"
                    />
                  </svg>
                  <i className="fa fa-phone" style={{ color: '#F15B29', fontSize: '13px', zIndex: 1 }}></i>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1px' }}>Call Vol</div>
                    <div style={{ fontSize: '15px', fontWeight: '900', color: '#fff' }} className="stat-value-neon">
                      {dailyStats.callCount}<span style={{ color: '#475569', fontSize: '10px', marginLeft: '3px' }}>/ {dailyStats.targets.callTarget}</span>
                    </div>
                  </div>
                  {dailyStats.leaderboard?.leadingCaller && (
                    <div style={{ 
                      padding: '4px 10px', borderRadius: '12px', background: 'rgba(241, 91, 41, 0.1)',
                      border: '1px solid rgba(241, 91, 41, 0.2)', display: 'flex', alignItems: 'center', gap: '6px'
                    }}>
                      <i className="fa fa-trophy" style={{ color: '#F15B29', fontSize: '11px' }}></i>
                      <div style={{ fontSize: '10px', fontWeight: '800', color: '#F15B29', textTransform: 'capitalize' }}>
                        {dailyStats.leaderboard.leadingCaller.name.split(' ')[0]} <span style={{ opacity: 0.7 }}>({dailyStats.leaderboard.leadingCaller.count})</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }}></div>

              {/* Circular Talk Time Stats */}
              <div className="stat-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ position: 'relative', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg style={{ position: 'absolute', transform: 'rotate(-90deg)', width: '42px', height: '42px' }}>
                    <circle cx="21" cy="21" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    <circle cx="21" cy="21" r="18" fill="none" stroke="#10B981" strokeWidth="3" 
                      strokeDasharray={2 * Math.PI * 18}
                      strokeDashoffset={2 * Math.PI * 18 * (1 - Math.min(dailyStats.talkTime / dailyStats.targets.talkTimeTarget, 1))}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 1.2s ease-in-out' }}
                      className="glow-green"
                    />
                  </svg>
                  <i className="fa fa-microphone" style={{ color: '#10B981', fontSize: '13px', zIndex: 1 }}></i>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1px' }}>Active Talk</div>
                    <div style={{ fontSize: '15px', fontWeight: '900', color: '#fff' }} className="stat-value-neon">
                      {formatTalkTime(dailyStats.talkTime)}<span style={{ color: '#475569', fontSize: '10px', marginLeft: '3px' }}>/ {dailyStats.targets.talkTimeTarget / 3600}h</span>
                    </div>
                  </div>
                  {dailyStats.leaderboard?.leadingSpeaker && (
                    <div style={{ 
                      padding: '4px 10px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', gap: '6px'
                    }}>
                      <i className="fa fa-bolt" style={{ color: '#10B981', fontSize: '11px' }}></i>
                      <div style={{ fontSize: '10px', fontWeight: '800', color: '#10B981', textTransform: 'capitalize' }}>
                        {dailyStats.leaderboard.leadingSpeaker.name.split(' ')[0]} <span style={{ opacity: 0.7 }}>({formatTalkTime(dailyStats.leaderboard.leadingSpeaker.talkTime)})</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginRight: '20px' }}>
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button 
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              style={{ 
                background: 'none', border: 'none', cursor: 'pointer', position: 'relative',
                padding: '8px', borderRadius: '50%', backgroundColor: '#f3f4f6', transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            >
              <i className="fa fa-bell" style={{ fontSize: '20px', color: '#374151' }}></i>
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-2px', right: '-2px',
                  backgroundColor: '#f15b29', color: 'white', borderRadius: '50%',
                  width: '18px', height: '18px', fontSize: '11px', fontWeight: 'bold',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid white'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotificationDropdown && (
              <div style={{
                position: 'absolute', top: '45px', right: '0', width: '320px',
                backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                zIndex: 1000, border: '1px solid #e5e7eb', overflow: 'hidden',
                animation: 'slideDown 0.2s ease-out'
              }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#111827' }}>Notifications</h4>
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>{unreadCount} Unread</span>
                  <button 
                    onClick={() => setShowNotificationDropdown(false)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#6b7280',
                      padding: '4px 8px', borderRadius: '50%', transition: 'all 0.2s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    &times;
                  </button>
                </div>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div 
                        key={n._id}
                        onClick={() => markNotificationRead(n._id)}
                        style={{ 
                          padding: '14px 16px', borderBottom: '1px solid #f9fafb', cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <div style={{ 
                            width: '40px', height: '40px', borderRadius: '50%', 
                            backgroundColor: n.type === 'lead_assigned' ? '#ecfdf5' : '#fff7ed',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            <i className={`fa ${n.type === 'lead_assigned' ? 'fa-user-plus' : 'fa-info-circle'}`} 
                               style={{ color: n.type === 'lead_assigned' ? '#059669' : '#f15b29', fontSize: '16px' }}></i>
                          </div>
                          <div>
                            <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#111827' }}>{n.title}</p>
                            <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', lineHeight: '1.4' }}>{n.message}</p>
                            <p style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#9ca3af' }}>{new Date(n.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                      <i className="fa fa-bell-slash" style={{ fontSize: '24px', color: '#d1d5db', marginBottom: '12px' }}></i>
                      <p style={{ margin: 0, fontSize: '14px', color: '#9ca3af' }}>No new notifications</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div ref={mobileMenuRef}>
            {/* <span onClick={toggleVisibility}>☰</span> */}
          </div>
          
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(244, 63, 94, 0.1)', color: 'rgba(251, 113, 133, 1)', border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: '12px', transition: 'all 0.2s ease', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }} onMouseOver={(e) => { e.currentTarget.style.background = '#f43f5e'; e.currentTarget.style.color = '#fff'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)'; e.currentTarget.style.color = 'rgba(251, 113, 133, 1)'; }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> 
            Logout
          </button>
        </div>

        <style>{`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
      {/* Ultra-Premium Sidebar Redesign */}
      <style>{`
        .premium-sidebar {
          position: fixed;
          top: 70px;
          left: 0;
          height: calc(100vh - 70px);
          width: 280px;
          background: #0B0F19;
          background-image: radial-gradient(circle at top left, rgba(99, 102, 241, 0.05), transparent 40%),
                            radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.03), transparent 40%);
          color: #f8fafc;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          border-right: 1px solid rgba(255,255,255,0.03);
          overflow-y: auto;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Inter', system-ui, sans-serif;
        }
        .premium-sidebar::-webkit-scrollbar { width: 4px; }
        .premium-sidebar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        
        .sidebar-profile {
          padding: 40px 24px 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .sidebar-profile::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 24px;
          right: 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        }
        
        .avatar-ring {
          position: relative;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, #6366f1, #3b82f6, #10b981);
          margin-bottom: 16px;
          box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
        }
        .avatar-inner {
          width: 100%;
          height: 100%;
          background: #0B0F19;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          border: 2px solid #0B0F19;
        }
        
        .profile-name {
          font-size: 19px;
          font-weight: 800;
          color: #fff;
          margin: 0 0 4px 0;
          letter-spacing: -0.3px;
        }
        .profile-email {
          font-size: 13px;
          color: #94a3b8;
          margin: 0 0 16px 0;
          font-weight: 500;
        }
        
        .badge-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }
        .premium-badge {
          background: rgba(99, 102, 241, 0.1);
          color: #818cf8;
          border: 1px solid rgba(99, 102, 241, 0.2);
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .premium-badge.team {
          background: rgba(16, 185, 129, 0.1);
          color: #34d399;
          border-color: rgba(16, 185, 129, 0.2);
        }

        .sidebar-nav {
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
          border: 1px solid transparent;
          position: relative;
          overflow: hidden;
        }
        .nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #6366f1;
          border-radius: 0 4px 4px 0;
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }
        .nav-item:hover {
          color: #fff;
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%);
          border-color: rgba(99, 102, 241, 0.1);
          transform: translateX(4px);
        }
        .nav-item:hover::before {
          transform: scaleY(1);
        }
        .nav-item svg {
          color: #64748b;
          transition: all 0.3s ease;
          width: 20px;
          height: 20px;
        }
        .nav-item:hover svg {
          color: #818cf8;
          transform: scale(1.1);
        }
      `}</style>

      {isMobileVisible && (
        <div className="premium-sidebar">
          <div className="sidebar-profile">
            {advTeamData ? (
              <>
                <div className="avatar-ring">
                  <div className="avatar-inner">
                    {advTeamData.fullname ? advTeamData.fullname.charAt(0).toUpperCase() : 'A'}
                  </div>
                </div>
                <h2 className="profile-name">{advTeamData.fullname}</h2>
                <h3 className="profile-email">{advTeamData.email}</h3>
                <div className="badge-container">
                  <span className="premium-badge">{advTeamData.designation}</span>
                  <span className="premium-badge team">{advTeamData.team}</span>
                </div>
              </>
            ) : (
              <div style={{ color: '#94a3b8', padding: '20px' }}>Loading Profile...</div>
            )}
          </div>
          
          <div className="sidebar-nav">
            <Link to="/advteam/home" className="nav-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"></rect><rect x="14" y="3" width="7" height="5" rx="1"></rect><rect x="14" y="12" width="7" height="9" rx="1"></rect><rect x="3" y="16" width="7" height="5" rx="1"></rect></svg> 
              Home
            </Link>
            
            {["LEADER", "MANAGER"].includes(advTeamData?.designation) && (
              <Link to="/advteam/assigntarget" className="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg> 
                Assign Target
              </Link>
            )}

            <Link to="/advteam/booked" className="nav-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> 
              Booked Payment
            </Link>

            <Link to="/advteam/fullpaid" className="nav-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> 
              Full Payment
            </Link>

            <Link to="/advteam/default" className="nav-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg> 
              Default Payment
            </Link>

            <Link to="/advteam/adduser" className="nav-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg> 
              Add Name/Email
            </Link>

            {["LEADER", "MANAGER", "ADV LEADER", "ADV MANAGER"].includes(advTeamData?.designation?.toUpperCase()) && (
              <Link to="/advteam/team-login" className="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg> 
                Team Login
              </Link>
            )}

            {advTeamData?.designation === "MANAGER" && advTeamData?.Access === true && (
              <Link to="/advteam/addteam" className="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg> 
                Add Team
              </Link>
            )}

            <Link to="/advteam/revenue" className="nav-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> 
              Revenue
            </Link>
          </div>
        </div>
      )}

      {/* Demo Reminder Popup */}
      {activeReminder && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '100%',
            textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', border: '4px solid #F15B29',
            animation: 'pulser 2s infinite'
          }}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F15B29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1E293B', marginBottom: '12px' }}>{activeReminder.title}</h2>
            <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '1.6', marginBottom: '24px' }}>{activeReminder.message}</p>
            <button
              onClick={() => markNotificationRead(activeReminder._id)}
              style={{
                width: '100%', padding: '14px', background: '#F15B29', color: '#fff',
                border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '16px',
                cursor: 'pointer', transition: 'all 0.2s ease'
              }}
            >
              Acknowledged
            </button>
          </div>
          <style>{`
            @keyframes pulser {
              0% { transform: scale(1); }
              50% { transform: scale(1.02); }
              100% { transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default AdvTeamHeader;
