import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import API from "../API";
import { 
  GraduationCap, 
  CreditCard, 
  Users, 
  Search, 
  Calendar, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Layers,
  Building2,
  Phone,
  MessageSquare,
  Copy,
  Check,
  Eye,
  X,
  Clock,
  BookOpen,
  DollarSign,
  UserCheck,
  Share2,
  ExternalLink,
  ShieldCheck,
  Mail
} from "lucide-react";

const DARK_STYLES = `
  #AdvFullPaymentPage {
    background: #0F172A;
    min-height: 100vh;
    margin-left: 260px;
    padding: 90px 28px 40px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #F1F5F9;
    box-sizing: border-box;
  }

  @media (max-width: 900px) {
    #AdvFullPaymentPage {
      margin-left: 0;
      padding: 85px 16px 30px;
    }
  }

  #AdvFullPaymentPage .page-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 24px;
  }

  #AdvFullPaymentPage h1 {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.5px;
    margin: 0 0 6px 0;
    background: linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  #AdvFullPaymentPage .page-sub {
    font-size: 13px;
    color: #64748B;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* Metric Stat Cards */
  #AdvFullPaymentPage .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
    margin-bottom: 26px;
  }

  #AdvFullPaymentPage .stat-card {
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(12px);
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  #AdvFullPaymentPage .stat-card:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.16);
  }

  #AdvFullPaymentPage .stat-icon-wrap {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  #AdvFullPaymentPage .stat-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  #AdvFullPaymentPage .stat-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #94A3B8;
    margin-bottom: 4px;
  }

  #AdvFullPaymentPage .stat-value {
    font-size: 22px;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.1;
  }

  #AdvFullPaymentPage .stat-sub {
    font-size: 12px;
    font-weight: 600;
    color: #10B981;
    margin-top: 4px;
  }

  /* Section Tabs */
  #AdvFullPaymentPage .view-tabs {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 6px;
    margin-bottom: 24px;
    overflow-x: auto;
    width: fit-content;
  }

  #AdvFullPaymentPage .tab-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 18px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    background: transparent;
    color: #94A3B8;
    transition: all 0.2s ease;
    white-space: nowrap;
    font-family: inherit;
  }

  #AdvFullPaymentPage .tab-btn:hover {
    color: #F1F5F9;
    background: rgba(255, 255, 255, 0.04);
  }

  #AdvFullPaymentPage .tab-btn.active {
    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
    color: #FFFFFF;
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
  }

  #AdvFullPaymentPage .tab-btn.active.opted {
    background: linear-gradient(135deg, #6366F1 0%, #4338CA 100%);
    box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
  }

  #AdvFullPaymentPage .tab-badge {
    background: rgba(255, 255, 255, 0.18);
    padding: 2px 7px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 800;
  }

  /* Section Box */
  #AdvFullPaymentPage .section-box {
    background: rgba(30, 41, 59, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 30px;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.28);
    backdrop-filter: blur(12px);
  }

  #AdvFullPaymentPage .section-box.opted-theme {
    border-color: rgba(99, 102, 241, 0.25);
  }

  #AdvFullPaymentPage .section-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  #AdvFullPaymentPage .section-title-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  #AdvFullPaymentPage .section-title {
    font-size: 19px;
    font-weight: 800;
    color: #F8FAFC;
    margin: 0;
  }

  /* Filters Bar */
  #AdvFullPaymentPage .filters-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 16px;
    padding: 14px 18px;
    margin-bottom: 20px;
  }

  #AdvFullPaymentPage .search-input-wrap {
    flex: 1;
    min-width: 260px;
    position: relative;
    display: flex;
    align-items: center;
  }

  #AdvFullPaymentPage .search-input-wrap svg {
    position: absolute;
    left: 14px;
    color: #64748B;
    pointer-events: none;
  }

  #AdvFullPaymentPage input[type="text"] {
    width: 100%;
    background: rgba(30, 41, 59, 0.7) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-radius: 12px !important;
    padding: 10px 14px 10px 40px !important;
    color: #F1F5F9 !important;
    font-size: 13px !important;
    outline: none !important;
    font-family: inherit !important;
    transition: all 0.2s ease;
  }

  #AdvFullPaymentPage input::placeholder { color: #64748B !important; }
  #AdvFullPaymentPage input:focus {
    border-color: #6366F1 !important;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important;
  }

  #AdvFullPaymentPage select {
    background: rgba(30, 41, 59, 0.7) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-radius: 12px !important;
    padding: 10px 16px !important;
    color: #F1F5F9 !important;
    font-size: 13px !important;
    outline: none !important;
    font-family: inherit !important;
    cursor: pointer !important;
    transition: all 0.2s ease;
  }

  #AdvFullPaymentPage select:focus {
    border-color: #6366F1 !important;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important;
  }

  #AdvFullPaymentPage select option { 
    background: #1E293B; 
    color: #F1F5F9; 
  }

  #AdvFullPaymentPage .count-badge {
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.25);
    border-radius: 10px;
    padding: 8px 16px;
    color: #10B981;
    font-weight: 700;
    font-size: 13px;
    white-space: nowrap;
  }

  #AdvFullPaymentPage .count-badge.opted {
    background: rgba(99, 102, 241, 0.12);
    border-color: rgba(99, 102, 241, 0.25);
    color: #818CF8;
  }

  /* Quick chips */
  #AdvFullPaymentPage .quick-chips {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  #AdvFullPaymentPage .chip-btn {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 5px 13px;
    font-size: 11px;
    font-weight: 700;
    color: #94A3B8;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  #AdvFullPaymentPage .chip-btn:hover {
    color: #FFFFFF;
    border-color: rgba(255, 255, 255, 0.2);
  }

  #AdvFullPaymentPage .chip-btn.selected {
    background: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.4);
    color: #A5B4FC;
  }

  /* Table */
  #AdvFullPaymentPage .table-wrap {
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }

  #AdvFullPaymentPage table {
    width: 100%;
    border-collapse: collapse;
  }

  #AdvFullPaymentPage th {
    background: rgba(15, 23, 42, 0.95);
    color: #94A3B8;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 14px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    white-space: nowrap;
    text-align: left;
  }

  #AdvFullPaymentPage td {
    padding: 14px 14px;
    font-size: 13px;
    color: #CBD5E1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    vertical-align: middle;
  }

  #AdvFullPaymentPage tr:hover td { 
    background: rgba(255, 255, 255, 0.02); 
  }

  #AdvFullPaymentPage .td-green  { color: #10B981; font-weight: 700; }
  #AdvFullPaymentPage .td-blue   { color: #60A5FA; font-weight: 700; }
  #AdvFullPaymentPage .td-yellow { color: #F59E0B; font-weight: 700; }
  #AdvFullPaymentPage .td-name   { text-transform: capitalize; font-weight: 700; color: #F8FAFC; }

  /* Academic cell styles */
  #AdvFullPaymentPage .academic-cell {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 190px;
    max-width: 250px;
  }
  #AdvFullPaymentPage .college-name {
    font-weight: 700;
    color: #F8FAFC;
    font-size: 13px;
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    gap: 6px;
    word-break: break-word;
  }
  #AdvFullPaymentPage .college-sub {
    font-size: 11px;
    color: #94A3B8;
    line-height: 1.25;
    word-break: break-word;
  }

  /* Contact cell styles */
  #AdvFullPaymentPage .contact-cell {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 135px;
  }
  #AdvFullPaymentPage .contact-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #CBD5E1;
  }
  #AdvFullPaymentPage .whatsapp-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(37, 211, 102, 0.12);
    border: 1px solid rgba(37, 211, 102, 0.3);
    color: #25D366;
    padding: 2px 7px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    width: fit-content;
  }
  #AdvFullPaymentPage .whatsapp-badge:hover {
    background: rgba(37, 211, 102, 0.25);
    color: #ffffff;
  }

  /* Txn badge */
  #AdvFullPaymentPage .txn-badge {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 3px 8px;
    font-family: monospace;
    font-size: 11px;
    color: #CBD5E1;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all 0.2s ease;
  }
  #AdvFullPaymentPage .txn-badge:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #FFFFFF;
    border-color: rgba(255, 255, 255, 0.2);
  }

  /* Actions column buttons */
  #AdvFullPaymentPage .action-btn-details {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
    white-space: nowrap;
    font-family: inherit;
  }
  #AdvFullPaymentPage .action-btn-details:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.45);
  }
  #AdvFullPaymentPage .action-btn-wa {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(37, 211, 102, 0.15);
    color: #25D366;
    border: 1px solid rgba(37, 211, 102, 0.3);
    border-radius: 8px;
    padding: 6px 9px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
  }
  #AdvFullPaymentPage .action-btn-wa:hover {
    background: #25D366;
    color: #FFFFFF;
  }

  #AdvFullPaymentPage .badge-opted {
    background: rgba(99, 102, 241, 0.16);
    color: #A5B4FC;
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 20px;
    padding: 3px 11px;
    font-size: 11px;
    font-weight: 800;
    text-transform: capitalize;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
  }

  #AdvFullPaymentPage .badge-true {
    background: rgba(16, 185, 129, 0.12);
    color: #10B981;
    border: 1px solid rgba(16, 185, 129, 0.25);
    border-radius: 20px;
    padding: 3px 10px;
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
  }

  #AdvFullPaymentPage .badge-false {
    background: rgba(239, 68, 68, 0.12);
    color: #EF4444;
    border: 1px solid rgba(239, 68, 68, 0.25);
    border-radius: 20px;
    padding: 3px 10px;
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
  }

  /* Pagination */
  #AdvFullPaymentPage .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 18px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  #AdvFullPaymentPage .pagination button {
    border-radius: 10px;
    padding: 8px 18px;
    font-weight: 700;
    font-size: 13px;
    font-family: inherit;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  #AdvFullPaymentPage .pagination .btn-active {
    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
    color: #FFFFFF;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  #AdvFullPaymentPage .pagination .btn-active.opted {
    background: linear-gradient(135deg, #6366F1 0%, #4338CA 100%);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  #AdvFullPaymentPage .pagination .btn-disabled {
    background: rgba(255, 255, 255, 0.05);
    color: #475569;
    cursor: not-allowed;
  }

  #AdvFullPaymentPage .pagination span {
    color: #94A3B8;
    font-weight: 600;
    font-size: 13px;
  }

  /* Full Student Details Modal */
  .fullpay-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    overflow-y: auto;
  }

  .fullpay-modal-card {
    background: #1E293B;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 24px;
    width: 100%;
    max-width: 950px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7);
    color: #F1F5F9;
    overflow: hidden;
    animation: fullpayModalFadeIn 0.22s ease-out;
  }

  @keyframes fullpayModalFadeIn {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }

  .fullpay-modal-header {
    padding: 22px 28px;
    background: rgba(15, 23, 42, 0.75);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .fullpay-modal-title {
    font-size: 20px;
    font-weight: 800;
    color: #FFFFFF;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .fullpay-modal-close-btn {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #94A3B8;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .fullpay-modal-close-btn:hover {
    background: rgba(239, 68, 68, 0.2);
    color: #EF4444;
    border-color: rgba(239, 68, 68, 0.3);
  }

  .fullpay-modal-body {
    padding: 24px 28px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Quick Stats Strip in Modal */
  .modal-quick-strip {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 16px;
  }

  .modal-quick-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .modal-quick-label {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    color: #94A3B8;
  }

  .modal-quick-val {
    font-size: 17px;
    font-weight: 800;
    color: #FFFFFF;
  }

  .modal-section {
    background: rgba(15, 23, 42, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    padding: 18px 20px;
  }

  .modal-section-title {
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #818CF8;
    margin: 0 0 14px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .modal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 12px;
  }

  .modal-field {
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .modal-field-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #94A3B8;
  }

  .modal-field-value {
    font-size: 13px;
    font-weight: 600;
    color: #F8FAFC;
    word-break: break-word;
  }

  .fullpay-modal-footer {
    padding: 16px 28px;
    background: rgba(15, 23, 42, 0.75);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 99px; }
`;

const FullPayment = () => {
  const [newStudent, setNewStudent] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active view tab: "optedMonth" | "paymentMonth" | "both"
  const [activeTab, setActiveTab] = useState("optedMonth");

  // Opted Month Section State
  const [selectedOptedMonth, setSelectedOptedMonth] = useState("");
  const [optedMonthsList, setOptedMonthsList] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [searchOptedQuery, setSearchOptedQuery] = useState("");
  const [currentOptedPage, setCurrentOptedPage] = useState(1);

  // Payment Received Month Section State
  const [selectedPaymentMonth, setSelectedPaymentMonth] = useState("");
  const [paymentMonthsList, setPaymentMonthsList] = useState([]);
  const [searchPaymentQuery, setSearchPaymentQuery] = useState("");
  const [currentPaymentPage, setCurrentPaymentPage] = useState(1);

  // Modal State for Viewing Full Student Details
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [copiedTxn, setCopiedTxn] = useState(false);

  const itemsPerPage = 25;

  /* ── Date Helpers ── */
  const getCurrentMonthName = () => {
    const m = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date();
    return `${m[d.getMonth()]} ${d.getFullYear()}`;
  };

  const getMonthFromDate = (date) => {
    if (!date) return "";
    const m = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return `${m[d.getMonth()]} ${d.getFullYear()}`;
  };

  const getPastMonthsList = () => {
    const m = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const t = new Date(d.getFullYear(), d.getMonth() - i, 1);
      return `${m[t.getMonth()]} ${t.getFullYear()}`;
    });
  };

  const getOptedMonthValue = (student) => {
    return (
      student.internshipstartsmonth ||
      student.internshipstartdate ||
      student.internshipstartsdate ||
      student.offerStart ||
      student.monthOpted ||
      student.optedMonth ||
      ""
    ).trim();
  };

  const buildSubmissionMonthsList = (students) => {
    const set = new Set();
    const mNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const now = new Date();

    // 1. Add current & past 6 months
    for (let i = 0; i < 6; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      set.add(`${mNames[d.getMonth()]} ${d.getFullYear()}`);
    }

    // 2. Add all unique submission months from student.createdAt (Dashboard Access Form submission)
    students.forEach((s) => {
      const m = getMonthFromDate(s.createdAt);
      if (m) set.add(m);
    });

    return Array.from(set);
  };

  const getCleanPhone = (phoneStr) => {
    if (!phoneStr) return "";
    const digits = String(phoneStr).replace(/\D/g, "");
    if (digits.length === 10) return `91${digits}`;
    return digits;
  };

  const handleCopyTxn = (txnId) => {
    if (!txnId) return;
    navigator.clipboard.writeText(txnId);
    setCopiedTxn(true);
    setTimeout(() => setCopiedTxn(false), 2000);
  };

  const openStudentDetails = (student) => {
    setSelectedStudent(student);
    setIsDetailModalOpen(true);
  };

  const closeStudentDetails = () => {
    setIsDetailModalOpen(false);
    setSelectedStudent(null);
  };

  /* ── Fetch Data ── */
  const fetchStudents = async () => {
    const operationName = localStorage.getItem("advOperationName");
    try {
      setLoading(true);
      const response = await axios.get(`${API}/getadvenrolls?all=true`);
      const rawData = response.data;
      const dataArray = Array.isArray(rawData) ? rawData : (rawData?.data || []);

      const fullPaid = dataArray.filter(
        (i) => i.status === "fullPaid" && (!operationName || i.operationName === operationName)
      );

      setNewStudent(fullPaid);

      // Populate month options based on Dashboard Access Form submission date (createdAt)
      const current = getCurrentMonthName();
      setSelectedPaymentMonth(current);
      setPaymentMonthsList(getPastMonthsList());

      const dynamicSubmissionMonths = buildSubmissionMonthsList(fullPaid);
      setOptedMonthsList(dynamicSubmissionMonths);
      
      // Default to current month if present, else first available, else "all"
      if (dynamicSubmissionMonths.includes(current)) {
        setSelectedOptedMonth(current);
      } else if (dynamicSubmissionMonths.length > 0) {
        setSelectedOptedMonth(dynamicSubmissionMonths[0]);
      } else {
        setSelectedOptedMonth("all");
      }
    } catch (error) {
      console.error("Error fetching advance enrolls:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ── Reset page on filter changes ── */
  useEffect(() => {
    setCurrentOptedPage(1);
  }, [searchOptedQuery, selectedOptedMonth, selectedDomain]);

  useEffect(() => {
    setCurrentPaymentPage(1);
  }, [searchPaymentQuery, selectedPaymentMonth]);

  /* ── Dynamic Domain Options ── */
  const domainOptions = useMemo(() => {
    const set = new Set();
    newStudent.forEach((s) => {
      if (s.domain && s.domain.trim()) set.add(s.domain.trim());
    });
    return Array.from(set);
  }, [newStudent]);

  /* ── Match Form Submission Month (when person filled Dashboard Access Form) ── */
  const matchesSubmissionMonth = (student, target) => {
    if (!target || target === "all") return true;
    const submissionMonth = getMonthFromDate(student.createdAt);
    if (!submissionMonth) return false;
    return submissionMonth.toLowerCase().trim() === target.toLowerCase().trim();
  };

  /* ── Comprehensive search matcher including College, Branch, WhatsApp, Txn, etc. ── */
  const matchesFullStudentQuery = (student, q) => {
    if (!q) return true;
    const startMonth = getOptedMonthValue(student).toLowerCase();
    const submissionDate = student.createdAt ? new Date(student.createdAt).toLocaleDateString("en-GB") : "";
    return (
      (student.fullname && student.fullname.toLowerCase().includes(q)) ||
      (student.email && student.email.toLowerCase().includes(q)) ||
      (student.alternativeEmail && student.alternativeEmail.toLowerCase().includes(q)) ||
      (student.phone && student.phone.toLowerCase().includes(q)) ||
      (student.whatsAppNumber && student.whatsAppNumber.toLowerCase().includes(q)) ||
      (student.collegeName && student.collegeName.toLowerCase().includes(q)) ||
      (student.branch && student.branch.toLowerCase().includes(q)) ||
      (student.yearOfStudy && String(student.yearOfStudy).toLowerCase().includes(q)) ||
      (student.yearOfPassingOut && String(student.yearOfPassingOut).toLowerCase().includes(q)) ||
      (student.counselor && student.counselor.toLowerCase().includes(q)) ||
      (student.domain && student.domain.toLowerCase().includes(q)) ||
      (student.program && student.program.toLowerCase().includes(q)) ||
      (student.transactionId && student.transactionId.toLowerCase().includes(q)) ||
      (student.modeofpayment && student.modeofpayment.toLowerCase().includes(q)) ||
      (student.referFriend && student.referFriend.toLowerCase().includes(q)) ||
      (student.lead && student.lead.toLowerCase().includes(q)) ||
      (student.batchTiming && student.batchTiming.toLowerCase().includes(q)) ||
      (student.modeofclasses && student.modeofclasses.toLowerCase().includes(q)) ||
      (student.internshipendsmonth && student.internshipendsmonth.toLowerCase().includes(q)) ||
      startMonth.includes(q) ||
      submissionDate.includes(q)
    );
  };

  /* ── Filtered Datasets ── */
  // 1. Form Submission Month Candidates (filtered by createdAt when Dashboard Access Form was filled)
  const filteredOptedStudents = useMemo(() => {
    return newStudent.filter((student) => {
      if (!matchesSubmissionMonth(student, selectedOptedMonth)) return false;
      if (selectedDomain !== "all" && student.domain !== selectedDomain) return false;

      if (searchOptedQuery.trim()) {
        const q = searchOptedQuery.toLowerCase().trim();
        if (!matchesFullStudentQuery(student, q)) return false;
      }
      return true;
    });
  }, [newStudent, selectedOptedMonth, selectedDomain, searchOptedQuery]);

  // 2. Payment Month Candidates (by createdAt)
  const filteredPaymentStudents = useMemo(() => {
    return newStudent.filter((student) => {
      if (selectedPaymentMonth && selectedPaymentMonth !== "all") {
        if (getMonthFromDate(student.createdAt) !== selectedPaymentMonth) return false;
      }

      if (searchPaymentQuery.trim()) {
        const q = searchPaymentQuery.toLowerCase().trim();
        if (!matchesFullStudentQuery(student, q)) return false;
      }
      return true;
    });
  }, [newStudent, selectedPaymentMonth, searchPaymentQuery]);

  /* ── Metrics ── */
  const optedMonthRevenue = useMemo(() => {
    return filteredOptedStudents.reduce((acc, s) => acc + (Number(s.paidAmount) || 0), 0);
  }, [filteredOptedStudents]);

  const paymentMonthRevenue = useMemo(() => {
    return filteredPaymentStudents.reduce((acc, s) => acc + (Number(s.paidAmount) || 0), 0);
  }, [filteredPaymentStudents]);

  const totalLifetimeRevenue = useMemo(() => {
    return newStudent.reduce((acc, s) => acc + (Number(s.paidAmount) || 0), 0);
  }, [newStudent]);

  /* ── Pagination calculations ── */
  const indexOfLastOpted = currentOptedPage * itemsPerPage;
  const currentOptedItems = filteredOptedStudents.slice(indexOfLastOpted - itemsPerPage, indexOfLastOpted);
  const totalOptedPages = Math.ceil(filteredOptedStudents.length / itemsPerPage) || 1;

  const indexOfLastPayment = currentPaymentPage * itemsPerPage;
  const currentPaymentItems = filteredPaymentStudents.slice(indexOfLastPayment - itemsPerPage, indexOfLastPayment);
  const totalPaymentPages = Math.ceil(filteredPaymentStudents.length / itemsPerPage) || 1;

  // Quick suggestion chips for recent & past submission months
  const quickCohortChips = useMemo(() => {
    const mNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const now = new Date();
    const prev1 = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prev2 = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    return [
      { label: "All Months", value: "all" },
      { label: `Current (${mNames[now.getMonth()]})`, value: `${mNames[now.getMonth()]} ${now.getFullYear()}` },
      { label: `Last Month (${mNames[prev1.getMonth()]})`, value: `${mNames[prev1.getMonth()]} ${prev1.getFullYear()}` },
      { label: `${mNames[prev2.getMonth()]}`, value: `${mNames[prev2.getMonth()]} ${prev2.getFullYear()}` }
    ];
  }, []);

  return (
    <div id="AdvFullPaymentPage">
      <style>{DARK_STYLES}</style>

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Full Payments & Program Cohorts</h1>
          <p className="page-sub">
            <Sparkles size={14} color="#60A5FA" />
            Complete candidate details submitted in the Dashboard Access Form &amp; Payment Records
          </p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="stat-grid">
        {/* Form Submission Month Card */}
        <div className="stat-card" style={{ borderColor: "rgba(99, 102, 241, 0.3)" }}>
          <div className="stat-icon-wrap" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#818CF8" }}>
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">
              Form Filled: {selectedOptedMonth === "all" ? "All Time" : selectedOptedMonth}
            </span>
            <span className="stat-value">{filteredOptedStudents.length} Candidates</span>
            <span className="stat-sub" style={{ color: "#A5B4FC" }}>
              ₹{optedMonthRevenue.toLocaleString()} Collected
            </span>
          </div>
        </div>

        {/* Payment Month Card */}
        <div className="stat-card" style={{ borderColor: "rgba(16, 185, 129, 0.3)" }}>
          <div className="stat-icon-wrap" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10B981" }}>
            <CreditCard size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">
              Paid: {selectedPaymentMonth === "all" ? "All Time" : selectedPaymentMonth}
            </span>
            <span className="stat-value">{filteredPaymentStudents.length} Candidates</span>
            <span className="stat-sub">
              ₹{paymentMonthRevenue.toLocaleString()} Inflow
            </span>
          </div>
        </div>

        {/* Total Full Paid Candidates Card */}
        <div className="stat-card" style={{ borderColor: "rgba(59, 130, 246, 0.3)" }}>
          <div className="stat-icon-wrap" style={{ background: "rgba(59, 130, 246, 0.15)", color: "#60A5FA" }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">All-Time Full Paid</span>
            <span className="stat-value">{newStudent.length} Total</span>
            <span className="stat-sub" style={{ color: "#93C5FD" }}>
              ₹{totalLifetimeRevenue.toLocaleString()} Lifetime
            </span>
          </div>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="view-tabs">
        <button
          className={`tab-btn opted ${activeTab === "optedMonth" ? "active opted" : ""}`}
          onClick={() => setActiveTab("optedMonth")}
        >
          <Calendar size={16} />
          Form Submission Month
          <span className="tab-badge">{filteredOptedStudents.length}</span>
        </button>

        <button
          className={`tab-btn ${activeTab === "paymentMonth" ? "active" : ""}`}
          onClick={() => setActiveTab("paymentMonth")}
        >
          <CreditCard size={16} />
          Payment Received Month Data
          <span className="tab-badge">{filteredPaymentStudents.length}</span>
        </button>

        <button
          className={`tab-btn ${activeTab === "both" ? "active" : ""}`}
          onClick={() => setActiveTab("both")}
        >
          <Layers size={16} />
          View Both Sections
        </button>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: FORM SUBMISSION MONTH (When person filled Dashboard Access Form) */}
      {/* ═════════════════════════════════════════════════════════════════════════ */}
      {(activeTab === "optedMonth" || activeTab === "both") && (
        <div className="section-box opted-theme">
          <div className="section-header">
            <div className="section-title-wrap">
              <div 
                style={{ 
                  background: "rgba(99, 102, 241, 0.2)", 
                  color: "#818CF8", 
                  padding: "8px", 
                  borderRadius: "10px" 
                }}
              >
                <Calendar size={22} />
              </div>
              <div>
                <h2 className="section-title">
                  Form Submission Month:{" "}
                  <span style={{ color: "#A5B4FC" }}>
                    {selectedOptedMonth === "all" ? "All Submission Months" : selectedOptedMonth}
                  </span>
                </h2>
                <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#64748B" }}>
                  Students filtered by the month they submitted the Dashboard Access Form
                </p>
              </div>
            </div>

            <div className="count-badge opted">
              {filteredOptedStudents.length} Forms Submitted
            </div>
          </div>

          {/* Quick Cohort Filter Chips */}
          <div className="quick-chips">
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>
              Quick Switch:
            </span>
            {quickCohortChips.map((chip) => (
              <button
                key={chip.value}
                onClick={() => setSelectedOptedMonth(chip.value)}
                className={`chip-btn ${selectedOptedMonth === chip.value ? "selected" : ""}`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Filters Bar for Opted Month */}
          <div className="filters-bar">
            {/* Search Input */}
            <div className="search-input-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search candidates by name, college, branch, email, phone, WhatsApp, Txn ID…"
                value={searchOptedQuery}
                onChange={(e) => setSearchOptedQuery(e.target.value)}
              />
            </div>

            {/* Opted Month Dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={16} color="#818CF8" />
              <select
                value={selectedOptedMonth}
                onChange={(e) => setSelectedOptedMonth(e.target.value)}
              >
                <option value="all">All Submission Months</option>
                {optedMonthsList.map((m, idx) => (
                  <option key={idx} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Domain Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Filter size={16} color="#94A3B8" />
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
              >
                <option value="all">All Domains</option>
                {domainOptions.map((dom, idx) => (
                  <option key={idx} value={dom}>
                    {dom}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrap">
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    {[
                      "Sl",
                      "Student Name & Contact",
                      "College & Branch",
                      "Domain & Track",
                      "Cohort & Timeline",
                      "Txn ID & Mode",
                      "Counselor",
                      "Financials",
                      "Submitted On",
                      "A/c Created",
                      "Actions"
                    ].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="11" style={{ textAlign: "center", padding: "60px", color: "#94A3B8" }}>
                        Loading candidate records…
                      </td>
                    </tr>
                  ) : Array.isArray(currentOptedItems) && currentOptedItems.length > 0 ? (
                    currentOptedItems.map((item, index) => {
                      const itemOpted = getOptedMonthValue(item) || "N/A";
                      const itemRemaining = Number(item.programPrice || 0) - Number(item.paidAmount || 0);

                      return (
                        <tr key={item._id}>
                          <td>{indexOfLastOpted - itemsPerPage + index + 1}</td>
                          
                          {/* Student Name & Contact */}
                          <td style={{ minWidth: "190px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                              <span className="td-name">{item.fullname || "N/A"}</span>
                              <span style={{ fontSize: "11px", color: "#94A3B8" }}>{item.email}</span>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                                <span style={{ fontSize: "11px", color: "#CBD5E1", display: "flex", alignItems: "center", gap: "4px" }}>
                                  <Phone size={10} color="#94A3B8" />
                                  {item.phone || "N/A"}
                                </span>
                                {(item.whatsAppNumber || item.phone) && (
                                  <a
                                    href={`https://wa.me/${getCleanPhone(item.whatsAppNumber || item.phone)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="whatsapp-badge"
                                    title="Open WhatsApp Chat"
                                  >
                                    <MessageSquare size={10} />
                                    WA
                                  </a>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* College & Academics */}
                          <td>
                            <div className="academic-cell">
                              <div className="college-name">
                                <Building2 size={14} color="#818CF8" style={{ flexShrink: 0, marginTop: "2px" }} />
                                <span>{item.collegeName || "N/A"}</span>
                              </div>
                              <div className="college-sub">
                                {item.branch ? (
                                  <span style={{ color: "#CBD5E1" }}>{item.branch}</span>
                                ) : (
                                  <span style={{ color: "#64748B", fontStyle: "italic" }}>No Branch</span>
                                )}
                                {(item.yearOfStudy || item.yearOfPassingOut) && (
                                  <span style={{ color: "#94A3B8" }}> • {item.yearOfStudy || item.yearOfPassingOut}</span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Domain & Track */}
                          <td style={{ minWidth: "150px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                              <span style={{ fontWeight: 700, color: "#F8FAFC", textTransform: "capitalize" }}>
                                {item.domain || "N/A"}
                              </span>
                              {item.program && (
                                <span style={{ fontSize: "11px", color: "#818CF8", textTransform: "capitalize" }}>
                                  {item.program}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Cohort & Timeline */}
                          <td style={{ minWidth: "160px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                              <span className="badge-opted">
                                <GraduationCap size={12} />
                                {itemOpted}
                                {item.internshipendsmonth && ` → ${item.internshipendsmonth}`}
                              </span>
                              {(item.batchTiming || item.modeofclasses) && (
                                <span style={{ fontSize: "11px", color: "#94A3B8", display: "flex", alignItems: "center", gap: "4px" }}>
                                  <Clock size={11} />
                                  {item.batchTiming || item.modeofclasses}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Txn ID & Payment Mode */}
                          <td style={{ minWidth: "140px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                              {item.transactionId ? (
                                <span 
                                  className="txn-badge" 
                                  title="Click to copy Transaction ID"
                                  onClick={() => handleCopyTxn(item.transactionId)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <Copy size={11} />
                                  {item.transactionId}
                                </span>
                              ) : (
                                <span style={{ fontSize: "11px", color: "#64748B" }}>No Txn ID</span>
                              )}
                              {item.modeofpayment && (
                                <span style={{ fontSize: "10px", color: "#60A5FA", textTransform: "uppercase", fontWeight: 700 }}>
                                  {item.modeofpayment}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Counselor */}
                          <td>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                              <span style={{ fontWeight: 600, color: "#F1F5F9" }}>{item.counselor || "N/A"}</span>
                              {item.lead && (
                                <span style={{ fontSize: "10px", color: "#A78BFA" }}>Lead: {item.lead}</span>
                              )}
                            </div>
                          </td>

                          {/* Financials */}
                          <td>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                              <span className="td-green">₹{Number(item.programPrice || 0).toLocaleString()}</span>
                              <span style={{ fontSize: "11px", color: "#94A3B8" }}>
                                Paid: <strong className="td-blue">₹{Number(item.paidAmount || 0).toLocaleString()}</strong>
                              </span>
                              {itemRemaining > 0 && (
                                <span style={{ fontSize: "10px", color: "#F59E0B" }}>
                                  Due: ₹{itemRemaining.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Form Submitted Date */}
                          <td>
                            <span style={{ fontSize: "12px", color: "#CBD5E1" }}>
                              {item.createdAt 
                                ? new Date(item.createdAt).toLocaleDateString("en-GB") 
                                : "N/A"}
                            </span>
                          </td>

                          {/* LMS Account Created */}
                          <td>
                            <span className={item.mailSended || item.userCreated ? "badge-true" : "badge-false"}>
                              {item.mailSended || item.userCreated ? "Yes" : "No"}
                            </span>
                          </td>

                          {/* Actions */}
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <button
                                className="action-btn-details"
                                onClick={() => openStudentDetails(item)}
                                title="View All Candidate Details"
                              >
                                <Eye size={13} />
                                <span>Details</span>
                              </button>
                              <a
                                href={`https://wa.me/${getCleanPhone(item.whatsAppNumber || item.phone)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="action-btn-wa"
                                title="Direct WhatsApp Chat"
                              >
                                <MessageSquare size={13} />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="11" style={{ textAlign: "center", padding: "60px", color: "#64748B" }}>
                        No full paid candidate records found for opted cohort{" "}
                        <strong style={{ color: "#F1F5F9" }}>{selectedOptedMonth}</strong>.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredOptedStudents.length > itemsPerPage && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentOptedPage((p) => Math.max(p - 1, 1))}
                  disabled={currentOptedPage === 1}
                  className={currentOptedPage === 1 ? "btn-disabled" : "btn-active opted"}
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span>
                  Page {currentOptedPage} of {totalOptedPages}
                </span>
                <button
                  onClick={() => setCurrentOptedPage((p) => Math.min(p + 1, totalOptedPages))}
                  disabled={currentOptedPage === totalOptedPages}
                  className={currentOptedPage === totalOptedPages ? "btn-disabled" : "btn-active opted"}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: PAYMENT RECEIVED MONTH DATA (By Got Payment On / createdAt)  */}
      {/* ═════════════════════════════════════════════════════════════════════════ */}
      {(activeTab === "paymentMonth" || activeTab === "both") && (
        <div className="section-box">
          <div className="section-header">
            <div className="section-title-wrap">
              <div 
                style={{ 
                  background: "rgba(16, 185, 129, 0.18)", 
                  color: "#10B981", 
                  padding: "8px", 
                  borderRadius: "10px" 
                }}
              >
                <CreditCard size={22} />
              </div>
              <div>
                <h2 className="section-title">
                  Payment Received Month Data:{" "}
                  <span style={{ color: "#34D399" }}>
                    {selectedPaymentMonth === "all" ? "All Records" : selectedPaymentMonth}
                  </span>
                </h2>
                <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#64748B" }}>
                  Students whose full payment was recorded in this calendar billing cycle
                </p>
              </div>
            </div>

            <div className="count-badge">
              {filteredPaymentStudents.length} Payments Received
            </div>
          </div>

          {/* Filters Bar for Payment Month */}
          <div className="filters-bar">
            {/* Search Input */}
            <div className="search-input-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search payments by name, college, branch, email, phone, Txn ID…"
                value={searchPaymentQuery}
                onChange={(e) => setSearchPaymentQuery(e.target.value)}
              />
            </div>

            {/* Payment Month Dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={16} color="#10B981" />
              <select
                value={selectedPaymentMonth}
                onChange={(e) => setSelectedPaymentMonth(e.target.value)}
              >
                <option value="all">All Payment Months</option>
                {paymentMonthsList.map((m, idx) => (
                  <option key={idx} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrap">
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    {[
                      "Sl",
                      "Student Name & Contact",
                      "College & Branch",
                      "Domain & Track",
                      "Txn ID & Mode",
                      "Counselor",
                      "Financials",
                      "Payment Received On",
                      "Cohort Start Month",
                      "A/c Created",
                      "Actions"
                    ].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="11" style={{ textAlign: "center", padding: "60px", color: "#94A3B8" }}>
                        Loading payment records…
                      </td>
                    </tr>
                  ) : Array.isArray(currentPaymentItems) && currentPaymentItems.length > 0 ? (
                    currentPaymentItems.map((item, index) => {
                      const itemRemaining = Number(item.programPrice || 0) - Number(item.paidAmount || 0);
                      const itemOpted = getOptedMonthValue(item) || "N/A";

                      return (
                        <tr key={item._id}>
                          <td>{indexOfLastPayment - itemsPerPage + index + 1}</td>
                          
                          {/* Student Name & Contact */}
                          <td style={{ minWidth: "190px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                              <span className="td-name">{item.fullname || "N/A"}</span>
                              <span style={{ fontSize: "11px", color: "#94A3B8" }}>{item.email}</span>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                                <span style={{ fontSize: "11px", color: "#CBD5E1", display: "flex", alignItems: "center", gap: "4px" }}>
                                  <Phone size={10} color="#94A3B8" />
                                  {item.phone || "N/A"}
                                </span>
                                {(item.whatsAppNumber || item.phone) && (
                                  <a
                                    href={`https://wa.me/${getCleanPhone(item.whatsAppNumber || item.phone)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="whatsapp-badge"
                                    title="Open WhatsApp Chat"
                                  >
                                    <MessageSquare size={10} />
                                    WA
                                  </a>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* College & Academics */}
                          <td>
                            <div className="academic-cell">
                              <div className="college-name">
                                <Building2 size={14} color="#10B981" style={{ flexShrink: 0, marginTop: "2px" }} />
                                <span>{item.collegeName || "N/A"}</span>
                              </div>
                              <div className="college-sub">
                                {item.branch ? (
                                  <span style={{ color: "#CBD5E1" }}>{item.branch}</span>
                                ) : (
                                  <span style={{ color: "#64748B", fontStyle: "italic" }}>No Branch</span>
                                )}
                                {(item.yearOfStudy || item.yearOfPassingOut) && (
                                  <span style={{ color: "#94A3B8" }}> • {item.yearOfStudy || item.yearOfPassingOut}</span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Domain & Track */}
                          <td style={{ minWidth: "150px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                              <span style={{ fontWeight: 700, color: "#F8FAFC", textTransform: "capitalize" }}>
                                {item.domain || "N/A"}
                              </span>
                              {item.program && (
                                <span style={{ fontSize: "11px", color: "#60A5FA", textTransform: "capitalize" }}>
                                  {item.program}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Txn ID & Payment Mode */}
                          <td style={{ minWidth: "140px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                              {item.transactionId ? (
                                <span 
                                  className="txn-badge" 
                                  title="Click to copy Transaction ID"
                                  onClick={() => handleCopyTxn(item.transactionId)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <Copy size={11} />
                                  {item.transactionId}
                                </span>
                              ) : (
                                <span style={{ fontSize: "11px", color: "#64748B" }}>No Txn ID</span>
                              )}
                              {item.modeofpayment && (
                                <span style={{ fontSize: "10px", color: "#34D399", textTransform: "uppercase", fontWeight: 700 }}>
                                  {item.modeofpayment}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Counselor */}
                          <td>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                              <span style={{ fontWeight: 600, color: "#F1F5F9" }}>{item.counselor || "N/A"}</span>
                              {item.lead && (
                                <span style={{ fontSize: "10px", color: "#A78BFA" }}>Lead: {item.lead}</span>
                              )}
                            </div>
                          </td>

                          {/* Financials */}
                          <td>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                              <span className="td-green">₹{Number(item.programPrice || 0).toLocaleString()}</span>
                              <span style={{ fontSize: "11px", color: "#94A3B8" }}>
                                Paid: <strong className="td-blue">₹{Number(item.paidAmount || 0).toLocaleString()}</strong>
                              </span>
                              {itemRemaining > 0 && (
                                <span style={{ fontSize: "10px", color: "#F59E0B" }}>
                                  Due: ₹{itemRemaining.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Got Payment On */}
                          <td>
                            <span style={{ fontSize: "12px", color: "#CBD5E1" }}>
                              {item.createdAt 
                                ? new Date(item.createdAt).toLocaleDateString("en-GB") 
                                : "N/A"}
                            </span>
                          </td>

                          {/* Cohort Start Month */}
                          <td>
                            <span className="badge-opted">
                              <GraduationCap size={12} />
                              {itemOpted}
                            </span>
                          </td>

                          {/* LMS A/c Created */}
                          <td>
                            <span className={item.mailSended || item.userCreated ? "badge-true" : "badge-false"}>
                              {item.mailSended || item.userCreated ? "Yes" : "No"}
                            </span>
                          </td>

                          {/* Actions */}
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <button
                                className="action-btn-details"
                                onClick={() => openStudentDetails(item)}
                                title="View All Candidate Details"
                              >
                                <Eye size={13} />
                                <span>Details</span>
                              </button>
                              <a
                                href={`https://wa.me/${getCleanPhone(item.whatsAppNumber || item.phone)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="action-btn-wa"
                                title="Direct WhatsApp Chat"
                              >
                                <MessageSquare size={13} />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="11" style={{ textAlign: "center", padding: "60px", color: "#64748B" }}>
                        No records found for payment month{" "}
                        <strong style={{ color: "#F1F5F9" }}>{selectedPaymentMonth}</strong>.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredPaymentStudents.length > itemsPerPage && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPaymentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPaymentPage === 1}
                  className={currentPaymentPage === 1 ? "btn-disabled" : "btn-active"}
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span>
                  Page {currentPaymentPage} of {totalPaymentPages}
                </span>
                <button
                  onClick={() => setCurrentPaymentPage((p) => Math.min(p + 1, totalPaymentPages))}
                  disabled={currentPaymentPage === totalPaymentPages}
                  className={currentPaymentPage === totalPaymentPages ? "btn-disabled" : "btn-active"}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════ */}
      {/* CANDIDATE FULL DETAILS MODAL                                             */}
      {/* ═════════════════════════════════════════════════════════════════════════ */}
      {isDetailModalOpen && selectedStudent && (
        <div className="fullpay-modal-overlay" onClick={closeStudentDetails}>
          <div className="fullpay-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="fullpay-modal-header">
              <div>
                <h3 className="fullpay-modal-title">
                  <span>{selectedStudent.fullname || "Student Details"}</span>
                  <span className="badge-true" style={{ fontSize: "12px", padding: "4px 12px" }}>
                    FULL PAID
                  </span>
                  {selectedStudent.domain && (
                    <span className="badge-opted" style={{ fontSize: "12px", padding: "4px 12px" }}>
                      {selectedStudent.domain}
                    </span>
                  )}
                </h3>
                <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#94A3B8" }}>
                  Candidate details submitted via Dashboard Access Form &amp; Registration
                </p>
              </div>

              <button 
                className="fullpay-modal-close-btn"
                onClick={closeStudentDetails}
                title="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="fullpay-modal-body">
              {/* Quick Financial & Transaction Summary Strip */}
              <div className="modal-quick-strip">
                <div className="modal-quick-item">
                  <span className="modal-quick-label">Program Fee</span>
                  <span className="modal-quick-val" style={{ color: "#10B981" }}>
                    ₹{Number(selectedStudent.programPrice || 0).toLocaleString()}
                  </span>
                </div>
                <div className="modal-quick-item">
                  <span className="modal-quick-label">Paid Amount</span>
                  <span className="modal-quick-val" style={{ color: "#60A5FA" }}>
                    ₹{Number(selectedStudent.paidAmount || 0).toLocaleString()}
                  </span>
                </div>
                <div className="modal-quick-item">
                  <span className="modal-quick-label">Remaining Balance</span>
                  <span className="modal-quick-val" style={{ color: "#34D399" }}>
                    ₹{(Number(selectedStudent.programPrice || 0) - Number(selectedStudent.paidAmount || 0)) <= 0 ? "0 (Cleared)" : (Number(selectedStudent.programPrice || 0) - Number(selectedStudent.paidAmount || 0)).toLocaleString()}
                  </span>
                </div>
                <div className="modal-quick-item">
                  <span className="modal-quick-label">Transaction ID</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span className="modal-quick-val" style={{ fontSize: "14px", fontFamily: "monospace", color: "#F1F5F9" }}>
                      {selectedStudent.transactionId || "N/A"}
                    </span>
                    {selectedStudent.transactionId && (
                      <button
                        onClick={() => handleCopyTxn(selectedStudent.transactionId)}
                        style={{
                          background: "rgba(255, 255, 255, 0.08)",
                          border: "none",
                          color: copiedTxn ? "#10B981" : "#94A3B8",
                          borderRadius: "6px",
                          padding: "4px 7px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "11px"
                        }}
                        title="Copy Txn ID"
                      >
                        {copiedTxn ? <Check size={12} /> : <Copy size={12} />}
                        {copiedTxn ? "Copied" : "Copy"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 1: PERSONAL & CONTACT INFORMATION */}
              <div className="modal-section">
                <h4 className="modal-section-title">
                  <Users size={16} />
                  Personal &amp; Contact Details
                </h4>
                <div className="modal-grid">
                  <div className="modal-field">
                    <span className="modal-field-label">Full Name</span>
                    <span className="modal-field-value">{selectedStudent.fullname || "N/A"}</span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Primary Email</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span className="modal-field-value">{selectedStudent.email || "N/A"}</span>
                      {selectedStudent.email && (
                        <a 
                          href={`mailto:${selectedStudent.email}`} 
                          style={{ color: "#60A5FA" }}
                          title="Send Email"
                        >
                          <Mail size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Alternative Email</span>
                    <span className="modal-field-value">
                      {selectedStudent.alternativeEmail || "None provided"}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Contact Phone</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className="modal-field-value">{selectedStudent.phone || "N/A"}</span>
                      {selectedStudent.phone && (
                        <a href={`tel:${selectedStudent.phone}`} style={{ color: "#10B981" }} title="Call">
                          <Phone size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">WhatsApp Number</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className="modal-field-value">
                        {selectedStudent.whatsAppNumber || selectedStudent.phone || "N/A"}
                      </span>
                      {(selectedStudent.whatsAppNumber || selectedStudent.phone) && (
                        <a
                          href={`https://wa.me/${getCleanPhone(selectedStudent.whatsAppNumber || selectedStudent.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whatsapp-badge"
                        >
                          <MessageSquare size={12} /> Chat
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: ACADEMIC & PROFESSIONAL DETAILS */}
              <div className="modal-section">
                <h4 className="modal-section-title">
                  <Building2 size={16} />
                  College &amp; Academic Background
                </h4>
                <div className="modal-grid">
                  <div className="modal-field" style={{ gridColumn: "span 2" }}>
                    <span className="modal-field-label">College / Institute / University</span>
                    <span className="modal-field-value" style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 700 }}>
                      {selectedStudent.collegeName || "Not provided by student"}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Branch / Stream / Department</span>
                    <span className="modal-field-value">
                      {selectedStudent.branch || "Not provided"}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Year of Study / Passing Year</span>
                    <span className="modal-field-value">
                      {selectedStudent.yearOfStudy || selectedStudent.yearOfPassingOut || "Not provided"}
                    </span>
                  </div>

                  {(selectedStudent.companyName || selectedStudent.role || selectedStudent.experience) && (
                    <>
                      <div className="modal-field">
                        <span className="modal-field-label">Company Name</span>
                        <span className="modal-field-value">{selectedStudent.companyName || "N/A"}</span>
                      </div>
                      <div className="modal-field">
                        <span className="modal-field-label">Job Role</span>
                        <span className="modal-field-value">{selectedStudent.role || "N/A"}</span>
                      </div>
                      <div className="modal-field">
                        <span className="modal-field-label">Experience</span>
                        <span className="modal-field-value">{selectedStudent.experience || "N/A"}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* SECTION 3: COURSE & COHORT TIMELINE */}
              <div className="modal-section">
                <h4 className="modal-section-title">
                  <GraduationCap size={16} />
                  Program, Cohort &amp; Timings
                </h4>
                <div className="modal-grid">
                  <div className="modal-field">
                    <span className="modal-field-label">Opted Domain / Course</span>
                    <span className="modal-field-value" style={{ color: "#A5B4FC", fontWeight: 700 }}>
                      {selectedStudent.domain || "N/A"}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Program Track</span>
                    <span className="modal-field-value" style={{ textTransform: "capitalize" }}>
                      {selectedStudent.program || "Advance Program"}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Cohort Month Opted</span>
                    <span className="modal-field-value">
                      {selectedStudent.monthOpted || getOptedMonthValue(selectedStudent) || "N/A"}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Internship Start Month</span>
                    <span className="modal-field-value">
                      {selectedStudent.internshipstartsmonth || getOptedMonthValue(selectedStudent) || "N/A"}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Internship End Month</span>
                    <span className="modal-field-value">
                      {selectedStudent.internshipendsmonth || "Not specified"}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Batch Timing / Mode of Classes</span>
                    <span className="modal-field-value">
                      {selectedStudent.batchTiming || selectedStudent.modeofclasses || "Weekdays / Standard"}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Preferred Language</span>
                    <span className="modal-field-value">
                      {Array.isArray(selectedStudent.languages) 
                        ? selectedStudent.languages.join(", ") 
                        : (selectedStudent.languages || "English")}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 4: PAYMENT & FINANCIALS */}
              <div className="modal-section">
                <h4 className="modal-section-title">
                  <CreditCard size={16} />
                  Financial Clearance &amp; Verification
                </h4>
                <div className="modal-grid">
                  <div className="modal-field">
                    <span className="modal-field-label">Total Program Fee</span>
                    <span className="modal-field-value td-green">
                      ₹{Number(selectedStudent.programPrice || 0).toLocaleString()}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Total Amount Paid</span>
                    <span className="modal-field-value td-blue">
                      ₹{Number(selectedStudent.paidAmount || 0).toLocaleString()}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Remaining Balance</span>
                    <span className="modal-field-value">
                      ₹{(Number(selectedStudent.programPrice || 0) - Number(selectedStudent.paidAmount || 0)) <= 0 ? "0" : (Number(selectedStudent.programPrice || 0) - Number(selectedStudent.paidAmount || 0)).toLocaleString()}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Payment Mode</span>
                    <span className="modal-field-value" style={{ textTransform: "uppercase" }}>
                      {selectedStudent.modeofpayment || "UPI"}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Transaction ID / Reference</span>
                    <span className="modal-field-value" style={{ fontFamily: "monospace" }}>
                      {selectedStudent.transactionId || "N/A"}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Payment Due / Clearance Date</span>
                    <span className="modal-field-value">
                      {selectedStudent.clearPaymentMonth 
                        ? new Date(selectedStudent.clearPaymentMonth).toLocaleDateString("en-GB") 
                        : "Cleared"}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 5: COUNSELOR, REFERRAL & STATUS */}
              <div className="modal-section">
                <h4 className="modal-section-title">
                  <UserCheck size={16} />
                  Counselor, Attribution &amp; System Status
                </h4>
                <div className="modal-grid">
                  <div className="modal-field">
                    <span className="modal-field-label">Admissions Counselor / BDA</span>
                    <span className="modal-field-value">{selectedStudent.counselor || "N/A"}</span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Lead Source</span>
                    <span className="modal-field-value">{selectedStudent.lead || "Direct"}</span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Operations Executive Assigned</span>
                    <span className="modal-field-value">
                      {selectedStudent.operationName || selectedStudent.executive || "Not Assigned"}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Refer a Friend</span>
                    <span className="modal-field-value">
                      {selectedStudent.referFriend || "None"}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Dashboard Form Submitted At</span>
                    <span className="modal-field-value">
                      {selectedStudent.createdAt 
                        ? new Date(selectedStudent.createdAt).toLocaleString("en-GB") 
                        : "N/A"}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">LMS Account Status</span>
                    <span className="modal-field-value">
                      <span className={selectedStudent.mailSended || selectedStudent.userCreated ? "badge-true" : "badge-false"}>
                        {selectedStudent.mailSended || selectedStudent.userCreated ? "Account Created" : "Pending Creation"}
                      </span>
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Offer Letter Status</span>
                    <span className="modal-field-value">
                      <span className={selectedStudent.offerlettersended ? "badge-true" : "badge-false"}>
                        {selectedStudent.offerlettersended ? "Dispatched" : "Pending Dispatch"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="fullpay-modal-footer">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "12px", color: "#94A3B8" }}>
                  Record ID: <code style={{ color: "#CBD5E1" }}>{selectedStudent._id}</code>
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <a
                  href={`https://wa.me/${getCleanPhone(selectedStudent.whatsAppNumber || selectedStudent.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn-wa"
                  style={{ padding: "8px 14px" }}
                >
                  <MessageSquare size={14} style={{ marginRight: "6px" }} />
                  Chat on WhatsApp
                </a>
                <button
                  onClick={closeStudentDetails}
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#F1F5F9",
                    borderRadius: "10px",
                    padding: "8px 18px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit"
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullPayment;
