import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../API";
import axios from "axios";
import logo from "../assets/accenlearn-logo.png";
import toast, { Toaster } from 'react-hot-toast';

// --- Premium SVG Icons ---
const Icons = {
  Home: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  CalendarCheck: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M9 16l2 2 4-4"></path></svg>,
  CheckCircle: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  AlertCircle: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
  TrendingUp: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
  LogOut: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
};

const OperationHeader = () => {
  const [isMobileVisible, setisMobileVisible] = useState(true);
  const mobileMenuRef = useRef(null);
  const [operationData, setOperationData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchOperationData = async () => {
    const operationId = localStorage.getItem("advOperationId");
    if (!operationId) return;
    try {
      const response = await axios.get(`${API}/getadvoperation`, { params: { operationId }, });
      setOperationData(response.data);
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    fetchOperationData();
  }, []);

  const handleLogout = () => {
    toast.success('Logout successful!!!');
    setTimeout(() => {
      localStorage.removeItem("advOperationId");
      localStorage.removeItem("advOperationName");
      localStorage.removeItem("advOperationToken");
      localStorage.removeItem("sessionStartTime");
      navigate("/AdvOperationLogin");
    }, 1500);
  };

  const checkSession = () => {
    const sessionStartTime = localStorage.getItem("sessionStartTime");
    if (sessionStartTime) {
      const currentTime = new Date().getTime();
      const expirationTime = 3 * 60 * 60 * 1000;
      if (currentTime - sessionStartTime > expirationTime) {
        toast.error("Session Time Out");
        localStorage.removeItem("advOperationId");
        localStorage.removeItem("advOperationName");
        localStorage.removeItem("advOperationToken");
        localStorage.removeItem("sessionStartTime");
        navigate("/AdvOperationLogin");
      }
    } else {
      navigate("/AdvOperationLogin");
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // Helper to determine if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div id="OperationHeader">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Premium Navbar */}
      <div className="navbar premium-navbar" style={{
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 4px 20px -10px rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        height: '70px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50
      }}>
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" style={{ height: '40px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }} />
          </Link>
        </div>
        <div ref={mobileMenuRef}>
        </div>
      </div>

      {isMobileVisible && (
        <div className="sidebar premium-sidebar" style={{
          background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '90px',
          fontFamily: "'Inter', sans-serif"
        }}>
          
          {/* User Profile Area */}
          <div style={{ padding: '0 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px' }}>
             <p style={{ color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: '600' }}>ADV Operation Panel</p>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)' }}>
                  {operationData ? operationData.fullname.charAt(0).toUpperCase() : "A"}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ margin: 0, color: '#F8FAFC', fontWeight: '600', fontSize: '15px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {operationData ? operationData.fullname : "Login First"}
                  </p>
                  <p style={{ margin: 0, color: '#10B981', fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span> Active
                  </p>
                </div>
             </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 12px' }}>
            <NavLinkItem to="/AdvOperationDashboard" icon={Icons.Home} label="Dashboard" active={isActive("/AdvOperationDashboard")} />
            <NavLinkItem to="/AdvBookedPayment" icon={Icons.CalendarCheck} label="Booked Payment" active={isActive("/AdvBookedPayment")} />
            <NavLinkItem to="/AdvFullPayment" icon={Icons.CheckCircle} label="Full Payment" active={isActive("/AdvFullPayment")} />
            <NavLinkItem to="/AdvDefaultPayment" icon={Icons.AlertCircle} label="Default Payment" active={isActive("/AdvDefaultPayment")} />
            <NavLinkItem to="/AdvOperationRevenueSheet" icon={Icons.TrendingUp} label="Revenue Sheet" active={isActive("/AdvOperationRevenueSheet")} />
          </div>

          <div style={{ position: 'absolute', bottom: '24px', left: '12px', right: '12px' }}>
            <button onClick={handleLogout} className="logout-btn" style={{
              width: '100%',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#EF4444',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              padding: '12px 16px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              {Icons.LogOut} Logout
            </button>
          </div>
        </div>
      )}

      {/* Global overrides for sidebar */}
      <style>{`
        .premium-sidebar {
          width: 260px !important;
          box-shadow: 4px 0 24px rgba(0,0,0,0.2);
        }
        .premium-sidebar a {
          text-decoration: none !important;
        }
        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.2) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
        }
      `}</style>
    </div>
  );
};

// Custom NavLink Component for beautiful hover/active states
const NavLinkItem = ({ to, icon, label, active }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Link 
      to={to} 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 16px',
        borderRadius: '12px',
        color: active ? '#fff' : (hovered ? '#F8FAFC' : '#94A3B8'),
        background: active ? 'linear-gradient(90deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0) 100%)' : (hovered ? 'rgba(255,255,255,0.03)' : 'transparent'),
        borderLeft: active ? '3px solid #10B981' : '3px solid transparent',
        transition: 'all 0.2s ease',
        fontWeight: active ? '600' : '500',
        fontSize: '15px'
      }}
    >
      <div style={{ 
        color: active ? '#10B981' : (hovered ? '#CBD5E1' : '#64748B'),
        transition: 'color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
      {label}
    </Link>
  );
};

export default OperationHeader;
