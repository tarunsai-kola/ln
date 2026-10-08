import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import API from "../API";
import Confetti from "react-confetti";
import toast, { Toaster } from "react-hot-toast";
import {
  Trophy,
  Crown,
  Medal,
  Calendar,
  Search,
  ArrowUpDown,
  RefreshCw,
  ShieldAlert
} from "lucide-react";

// Currency Formatter
const formatINR = (val) => {
  const num = Number(val) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(num);
};

const AdvLeaderBoard = () => {
  const [data, setData] = useState([]);

  // Generate recent 6 months for quick-switch tabs
  const monthOptions = useMemo(() => {
    const options = [];
    const now = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const key = `${yyyy}-${mm}`;
      const label = d.toLocaleString("default", { month: "long", year: "numeric" });
      const shortLabel = d.toLocaleString("default", { month: "short", year: "numeric" });
      options.push({
        key,
        month: d.getMonth() + 1,
        year: yyyy,
        label,
        shortLabel,
        isCurrent: i === 0
      });
    }
    return options;
  }, []);

  // Currently selected month (YYYY-MM format)
  const [selectedMonthKey, setSelectedMonthKey] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  // Current month label info
  const currentMonthInfo = useMemo(() => {
    const matched = monthOptions.find((m) => m.key === selectedMonthKey);
    if (matched) return matched;
    const [yyyy, mm] = selectedMonthKey.split("-").map(Number);
    const d = new Date(yyyy, mm - 1, 1);
    return {
      key: selectedMonthKey,
      month: mm,
      year: yyyy,
      label: d.toLocaleString("default", { month: "long", year: "numeric" }),
      shortLabel: d.toLocaleString("default", { month: "short", year: "numeric" }),
      isCurrent: false
    };
  }, [monthOptions, selectedMonthKey]);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("revenue");
  const [sortDirection, setSortDirection] = useState("desc");

  // Loading & Confetti
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800
  });

  // Track window size for Confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trigger celebration confetti on month change
  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [selectedMonthKey]);

  // Fetch Leaderboard for the selected Month
  const fetchMonthLeaderboard = useCallback(async (monthKey) => {
    try {
      setLoading(true);
      const [year, month] = monthKey.split("-").map(Number);
      const response = await axios.get(`${API}/api/adv-reports/adv-leaderboard`, {
        params: { month, year }
      });
      const rawData = response.data || [];
      const sorted = [...rawData].sort(
        (a, b) => (Number(b.revenue) || 0) - (Number(a.revenue) || 0)
      );
      setData(sorted);
    } catch (error) {
      console.error("Error fetching monthly leaderboard:", error);
      toast.error("Failed to load monthly leaderboard rankings");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMonthLeaderboard(selectedMonthKey);
  }, [fetchMonthLeaderboard, selectedMonthKey]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchMonthLeaderboard(selectedMonthKey);
    toast.success("Leaderboard rankings synchronized!");
  };

  // Filtered & Sorted dataset - STRICTLY TOP 5 ONLY
  const validRankedData = useMemo(() => {
    let list = data.filter(
      (u) => u.revenue > 0 || u.paymentCount > 0
    );

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (u) =>
          (u.name || "").toLowerCase().includes(q) ||
          (u.team || "").toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === "string") {
        return sortDirection === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        valA = Number(valA) || 0;
        valB = Number(valB) || 0;
        return sortDirection === "asc" ? valA - valB : valB - valA;
      }
    });

    // ONLY SHOW TOP 5 PERFORMERS
    return list.slice(0, 5);
  }, [data, searchQuery, sortField, sortDirection]);

  // Top 3 Podium Winners (from full month dataset sorted strictly by revenue descending)
  const podiumWinners = useMemo(() => {
    const list = [...data].filter((u) => (Number(u.revenue) || 0) > 0);
    list.sort((a, b) => (Number(b.revenue) || 0) - (Number(a.revenue) || 0));
    return {
      first: list[0] || null,
      second: list[1] || null,
      third: list[2] || null
    };
  }, [data]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection(field === "name" || field === "team" ? "asc" : "desc");
    }
  };

  const maxRevenue = podiumWinners.first ? podiumWinners.first.revenue : 1;

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 font-sans ml-[280px] mt-[70px] p-4 sm:p-8 relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Confetti Celebration Particle Layer */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={350}
            gravity={0.18}
            colors={["#F59E0B", "#FCD34D", "#6366F1", "#10B981", "#EC4899", "#3B82F6"]}
          />
        </div>
      )}

      {/* Ambient Lighting Background Accents */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-emerald-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-indigo-500/10 blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1500px] mx-auto space-y-8 relative z-10">
        
        {/* ========================================================= */}
        {/* COMPACT TOP BAR & MONTH-ONLY CONTROLS */}
        {/* ========================================================= */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-3.5 bg-[#0D1322] border border-slate-800/80 rounded-2xl shadow-xl">
          {/* Left: Title + Month Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5 pr-3 border-r border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
                <Crown className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-base font-black text-white tracking-tight block">
                  Sales Champions Arena
                </span>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Monthly Leaderboard
                </span>
              </div>
            </div>

            {/* Quick Month Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {monthOptions.map((m) => {
                const isActive = selectedMonthKey === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => setSelectedMonthKey(m.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20"
                        : "bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <span>{m.shortLabel}</span>
                    {m.isCurrent && (
                      <span
                        className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-extrabold ${
                          isActive
                            ? "bg-slate-950 text-amber-300"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        Current
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Sync & Custom Month Picker */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-slate-400 uppercase text-[10px]">Month:</span>
              <input
                type="month"
                value={selectedMonthKey}
                onChange={(e) => {
                  if (e.target.value) {
                    setSelectedMonthKey(e.target.value);
                  }
                }}
                max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`}
                className="bg-transparent text-white font-semibold text-xs outline-none cursor-pointer [color-scheme:dark]"
              />
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 shadow-sm transition-all disabled:opacity-50"
              title="Sync Leaderboard"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-slate-400 ${
                  isRefreshing ? "animate-spin text-amber-400" : ""
                }`}
              />
              <span>Sync</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* THE GRAND CELEBRATION PODIUM (1ST, 2ND, 3RD POSITION) */}
        {/* ========================================================= */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0F172A]/90 via-[#0C1222]/90 to-[#070A12] border border-amber-500/20 shadow-2xl relative">
          
          {/* Subtle Golden Glow for Podium */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/10 blur-[100px] pointer-events-none"></div>

          <div className="text-center mb-8">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-4 py-1 rounded-full inline-block mb-2">
              Monthly Champions • {currentMonthInfo.label}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Honoring Our Top Sales Achievers
            </h2>
          </div>

          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin text-amber-400" />
              <p className="text-sm font-semibold tracking-wide">Assembling the Champions Podium...</p>
            </div>
          ) : podiumWinners.first ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto pt-6 pb-2">
              
              {/* ================= 2ND PLACE (SILVER) ================= */}
              <div className="order-2 md:order-1 flex flex-col items-center">
                {podiumWinners.second ? (
                  <div className="w-full flex flex-col items-center group">
                    {/* Badge Header */}
                    <div className="relative mb-3 flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-400 p-[3px] shadow-lg shadow-slate-400/20 group-hover:scale-105 transition-transform">
                        <div className="w-full h-full rounded-full bg-[#0F172A] flex items-center justify-center text-slate-100 text-2xl font-black uppercase">
                          {podiumWinners.second.name ? podiumWinners.second.name.charAt(0) : "2"}
                        </div>
                      </div>
                      <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-slate-300 text-slate-950 font-black text-xs shadow-md border border-white flex items-center gap-1">
                        <Medal className="w-3.5 h-3.5" />
                        <span>#2 SILVER</span>
                      </div>
                    </div>

                    {/* Performer Details Card */}
                    <div className="w-full text-center mt-3 p-5 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/80 shadow-lg">
                      <h3 className="text-lg font-black text-white capitalize truncate" title={podiumWinners.second.name}>
                        {podiumWinners.second.name}
                      </h3>
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md mt-1 border border-slate-700">
                        {podiumWinners.second.team || "Advance Team"}
                      </span>

                      <div className="mt-4 pt-3 border-t border-slate-800">
                        <div className="text-xl sm:text-2xl font-black text-slate-100 font-mono">
                          {formatINR(podiumWinners.second.revenue)}
                        </div>
                        <div className="text-xs font-semibold text-slate-400 mt-1">
                          <span className="text-emerald-400 font-bold">{podiumWinners.second.paymentCount || 0} Deals Closed</span>
                        </div>
                      </div>
                    </div>

                    {/* Pedestal Block 2 */}
                    <div className="w-full h-24 rounded-b-2xl bg-gradient-to-b from-slate-700/60 to-slate-800/60 border-x border-b border-slate-600/50 flex items-center justify-center shadow-inner">
                      <span className="text-4xl font-black text-slate-400/40">2</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                    <p className="text-xs">No silver qualifier yet</p>
                  </div>
                )}
              </div>

              {/* ================= 1ST PLACE (GOLD 👑) ================= */}
              <div className="order-1 md:order-2 flex flex-col items-center">
                <div className="w-full flex flex-col items-center group relative -mt-4">
                  
                  {/* Grand Crown Accent */}
                  <div className="animate-bounce mb-1">
                    <Crown className="w-10 h-10 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] fill-amber-400" />
                  </div>

                  {/* Badge Header with Ring Glow */}
                  <div className="relative mb-3 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 p-1 shadow-2xl shadow-amber-500/40 group-hover:scale-105 transition-transform">
                      <div className="w-full h-full rounded-full bg-[#0F172A] flex items-center justify-center text-amber-300 text-3xl font-black uppercase ring-2 ring-amber-400/30">
                        {podiumWinners.first.name ? podiumWinners.first.name.charAt(0) : "1"}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs shadow-xl border border-yellow-200 flex items-center gap-1.5 uppercase tracking-wider">
                      <Trophy className="w-3.5 h-3.5 fill-slate-950" />
                      <span>#1 CHAMPION</span>
                    </div>
                  </div>

                  {/* Performer Details Card */}
                  <div className="w-full text-center mt-3 p-6 rounded-2xl bg-gradient-to-b from-amber-950/40 via-[#131D36] to-[#0E1527] border-2 border-amber-500/60 shadow-2xl shadow-amber-500/10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3 py-0.5 rounded-full border border-amber-500/30">
                      ★ Top Revenue Leader ★
                    </span>
                    <h3 className="text-xl font-black text-white capitalize mt-2 truncate" title={podiumWinners.first.name}>
                      {podiumWinners.first.name}
                    </h3>
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-300/80 bg-amber-950/60 px-3 py-0.5 rounded-md mt-1 border border-amber-800/50">
                      {podiumWinners.first.team || "Advance Team"}
                    </span>

                    <div className="mt-5 pt-4 border-t border-amber-500/20">
                      <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono tracking-tight">
                        {formatINR(podiumWinners.first.revenue)}
                      </div>
                      <div className="text-xs font-bold text-slate-300 mt-1">
                        <span className="text-emerald-400 font-extrabold">{podiumWinners.first.paymentCount || 0} Deals Closed</span>
                      </div>
                    </div>
                  </div>

                  {/* Pedestal Block 1 */}
                  <div className="w-full h-32 rounded-b-2xl bg-gradient-to-b from-amber-600/30 to-amber-950/40 border-x border-b border-amber-500/50 flex flex-col items-center justify-center shadow-inner">
                    <Crown className="w-6 h-6 text-amber-400/40 mb-1" />
                    <span className="text-5xl font-black text-amber-400/40">1</span>
                  </div>
                </div>
              </div>

              {/* ================= 3RD PLACE (BRONZE) ================= */}
              <div className="order-3 md:order-3 flex flex-col items-center">
                {podiumWinners.third ? (
                  <div className="w-full flex flex-col items-center group">
                    {/* Badge Header */}
                    <div className="relative mb-3 flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-800 p-[3px] shadow-lg shadow-amber-800/20 group-hover:scale-105 transition-transform">
                        <div className="w-full h-full rounded-full bg-[#0F172A] flex items-center justify-center text-amber-600 text-2xl font-black uppercase">
                          {podiumWinners.third.name ? podiumWinners.third.name.charAt(0) : "3"}
                        </div>
                      </div>
                      <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-amber-800 text-amber-100 font-black text-xs shadow-md border border-amber-600 flex items-center gap-1">
                        <Medal className="w-3.5 h-3.5" />
                        <span>#3 BRONZE</span>
                      </div>
                    </div>

                    {/* Performer Details Card */}
                    <div className="w-full text-center mt-3 p-5 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/80 shadow-lg">
                      <h3 className="text-lg font-black text-white capitalize truncate" title={podiumWinners.third.name}>
                        {podiumWinners.third.name}
                      </h3>
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md mt-1 border border-slate-700">
                        {podiumWinners.third.team || "Advance Team"}
                      </span>

                      <div className="mt-4 pt-3 border-t border-slate-800">
                        <div className="text-xl sm:text-2xl font-black text-slate-100 font-mono">
                          {formatINR(podiumWinners.third.revenue)}
                        </div>
                        <div className="text-xs font-semibold text-slate-400 mt-1">
                          <span className="text-emerald-400 font-bold">{podiumWinners.third.paymentCount || 0} Deals Closed</span>
                        </div>
                      </div>
                    </div>

                    {/* Pedestal Block 3 */}
                    <div className="w-full h-16 rounded-b-2xl bg-gradient-to-b from-amber-900/20 to-slate-900/60 border-x border-b border-amber-800/30 flex items-center justify-center shadow-inner">
                      <span className="text-4xl font-black text-amber-700/40">3</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                    <p className="text-xs">No bronze qualifier yet</p>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 space-y-2">
              <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No sales recorded for this month yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Select a different month from the tabs above to view past champions.
              </p>
            </div>
          )}

        </div>

        {/* ========================================================= */}
        {/* TOP 5 LEADERBOARD TABLE (MAX 5 PERFORMERS, NO TOTALS) */}
        {/* ========================================================= */}
        <div className="bg-[#0D1322] rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
          
          {/* Table Header Controls */}
          <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-wider">
                  Top 5 Performers
                </span>
              </div>
              <h3 className="text-lg font-black text-white flex items-center gap-2.5 mt-1">
                <Trophy className="w-5 h-5 text-amber-400" />
                Monthly Champions Roster (Top 5)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Displaying the top 5 sales performers for {currentMonthInfo.label} sorted by production
              </p>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <input
                type="text"
                placeholder="Search top 5 performers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#131B2E] text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-700/80 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Table Element */}
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap text-xs">
              <thead className="bg-[#0B0F19] border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold select-none">
                <tr>
                  <th className="px-6 py-4 w-20 text-center">Rank</th>
                  <th
                    onClick={() => handleSort("name")}
                    className="px-6 py-4 cursor-pointer hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Sales Counselor</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("team")}
                    className="px-6 py-4 cursor-pointer hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Team Division</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("revenue")}
                    className="px-6 py-4 cursor-pointer hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-amber-300">
                      <span>Gross Revenue</span>
                      <ArrowUpDown className="w-3 h-3 text-amber-400" />
                    </div>
                  </th>
                  <th className="px-6 py-4">
                    <span>Performance Share</span>
                  </th>
                  <th
                    onClick={() => handleSort("paymentCount")}
                    className="px-6 py-4 text-center cursor-pointer hover:text-white transition-colors"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>Deals Closed</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <RefreshCw className="w-6 h-6 animate-spin text-amber-400" />
                        <span className="text-xs font-semibold">Calculating rankings...</span>
                      </div>
                    </td>
                  </tr>
                ) : validRankedData.length > 0 ? (
                  validRankedData.map((user, idx) => {
                    const ratio =
                      maxRevenue > 0 ? Math.round((user.revenue / maxRevenue) * 100) : 0;
                    const isRank1 = idx === 0 && user.revenue > 0;
                    const isRank2 = idx === 1 && user.revenue > 0;
                    const isRank3 = idx === 2 && user.revenue > 0;

                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          isRank1
                            ? "bg-amber-500/5 hover:bg-amber-500/10"
                            : isRank2
                            ? "bg-slate-400/5 hover:bg-slate-400/10"
                            : isRank3
                            ? "bg-orange-500/5 hover:bg-orange-500/10"
                            : "hover:bg-slate-800/40"
                        }`}
                      >
                        {/* Rank Badge */}
                        <td className="px-6 py-4 text-center">
                          {isRank1 ? (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black text-xs shadow-md">
                              1 👑
                            </span>
                          ) : isRank2 ? (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-950 font-black text-xs shadow-md">
                              2 🥈
                            </span>
                          ) : isRank3 ? (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-700 text-white font-black text-xs shadow-md">
                              3 🥉
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-800 text-slate-400 font-bold text-xs border border-slate-700">
                              #{idx + 1}
                            </span>
                          )}
                        </td>

                        {/* Name with Avatar */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#18233C] text-slate-200 flex items-center justify-center font-bold text-xs border border-slate-700">
                              {user.name ? user.name.charAt(0).toUpperCase() : "A"}
                            </div>
                            <span className="font-bold text-white capitalize text-sm">
                              {user.name}
                            </span>
                          </div>
                        </td>

                        {/* Team */}
                        <td className="px-6 py-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-800/80 text-slate-300 border border-slate-700">
                            {user.team || "N/A"}
                          </span>
                        </td>

                        {/* Gross Revenue */}
                        <td className="px-6 py-4">
                          <span className="font-mono font-black text-amber-300 text-sm">
                            {formatINR(user.revenue)}
                          </span>
                        </td>

                        {/* Visual Progress relative to leader */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-1.5 rounded-full"
                                style={{ width: `${Math.min(ratio, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">{ratio}%</span>
                          </div>
                        </td>

                        {/* Deals Closed */}
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center min-w-[32px] h-7 px-2.5 rounded-lg font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                            {user.paymentCount || 0}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      No sales records found for this month.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdvLeaderBoard;
