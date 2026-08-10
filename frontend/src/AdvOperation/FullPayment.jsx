import axios from "axios";
import React, { useState, useEffect } from "react";
import API from "../API";

const DARK_STYLES = `
  html, body { background: #0F172A !important; color: #F1F5F9 !important; }

  #AdvFullPaymentPage {
    background: #0F172A;
    min-height: 100vh;
    margin-left: 260px;
    padding: 90px 28px 40px;
    font-family: 'Inter', sans-serif;
    color: #F1F5F9;
    box-sizing: border-box;
  }

  #AdvFullPaymentPage h1 {
    font-size: 28px;
    font-weight: 800;
    background: linear-gradient(90deg, #F8FAFC, #94A3B8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 20px;
  }

  #AdvFullPaymentPage .filters-bar {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    background: rgba(30,41,59,0.85);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 16px 20px;
    margin-bottom: 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }

  #AdvFullPaymentPage input[type="type"],
  #AdvFullPaymentPage input[type="text"] {
    flex: 1;
    min-width: 200px;
    background: rgba(15,23,42,0.8) !important;
    border: 1px solid rgba(255,255,255,0.08) !important;
    border-radius: 12px !important;
    padding: 10px 16px !important;
    color: #F1F5F9 !important;
    font-size: 14px !important;
    outline: none !important;
    font-family: 'Inter', sans-serif !important;
  }
  #AdvFullPaymentPage input::placeholder { color: #475569 !important; }
  #AdvFullPaymentPage input:focus {
    border-color: #3B82F6 !important;
    box-shadow: 0 0 0 3px rgba(59,130,246,0.1) !important;
  }

  #AdvFullPaymentPage select {
    background: rgba(15,23,42,0.8) !important;
    border: 1px solid rgba(255,255,255,0.08) !important;
    border-radius: 12px !important;
    padding: 10px 16px !important;
    color: #F1F5F9 !important;
    font-size: 14px !important;
    outline: none !important;
    font-family: 'Inter', sans-serif !important;
    cursor: pointer !important;
  }
  #AdvFullPaymentPage select option { background: #1E293B; color: #F1F5F9; }

  #AdvFullPaymentPage .count-badge {
    background: rgba(16,185,129,0.1);
    border: 1px solid rgba(16,185,129,0.2);
    border-radius: 10px;
    padding: 8px 18px;
    color: #10B981;
    font-weight: 700;
    font-size: 14px;
    white-space: nowrap;
  }

  #AdvFullPaymentPage .table-wrap {
    background: rgba(30,41,59,0.85);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }

  #AdvFullPaymentPage table {
    width: 100%;
    border-collapse: collapse;
  }

  #AdvFullPaymentPage th {
    background: rgba(15,23,42,0.9);
    color: #94A3B8;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    white-space: nowrap;
    text-align: left;
  }

  #AdvFullPaymentPage td {
    padding: 14px 16px;
    font-size: 13px;
    color: #CBD5E1;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    vertical-align: middle;
    white-space: nowrap;
  }

  #AdvFullPaymentPage tr:hover td { background: rgba(255,255,255,0.025); }

  #AdvFullPaymentPage .td-green { color: #10B981; font-weight: 700; }
  #AdvFullPaymentPage .td-blue  { color: #60A5FA; font-weight: 700; }
  #AdvFullPaymentPage .td-yellow { color: #F59E0B; font-weight: 700; }
  #AdvFullPaymentPage .td-name { text-transform: capitalize; font-weight: 600; color: #E2E8F0; }

  #AdvFullPaymentPage .badge-true {
    background: rgba(16,185,129,0.1); color: #10B981;
    border: 1px solid rgba(16,185,129,0.2);
    border-radius: 20px; padding: 3px 10px; font-size: 11px; font-weight: 700;
  }
  #AdvFullPaymentPage .badge-false {
    background: rgba(239,68,68,0.1); color: #EF4444;
    border: 1px solid rgba(239,68,68,0.2);
    border-radius: 20px; padding: 3px 10px; font-size: 11px; font-weight: 700;
  }

  #AdvFullPaymentPage .pagination {
    display: flex; justify-content: center; align-items: center;
    gap: 16px; padding: 20px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  #AdvFullPaymentPage .pagination button {
    border-radius: 10px; padding: 10px 20px;
    font-weight: 600; font-size: 14px;
    font-family: 'Inter', sans-serif;
    border: none; cursor: pointer; transition: all 0.2s;
  }
  #AdvFullPaymentPage .pagination .btn-active {
    background: linear-gradient(135deg, #3B82F6, #2563EB);
    color: #fff; box-shadow: 0 4px 12px rgba(59,130,246,0.3);
  }
  #AdvFullPaymentPage .pagination .btn-disabled {
    background: rgba(255,255,255,0.07); color: #475569; cursor: not-allowed;
  }
  #AdvFullPaymentPage .pagination span { color: #94A3B8; font-weight: 600; }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
`;

const FullPayment = () => {
  const [newStudent, setNewStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [months, setMonths] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const getCurrentMonth = () => {
    const m = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date();
    return `${m[d.getMonth()]} ${d.getFullYear()}`;
  };

  const getPastMonths = () => {
    const m = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date();
    return Array.from({length:4}, (_,i) => {
      const t = new Date(d.getFullYear(), d.getMonth()-i, 1);
      return `${m[t.getMonth()]} ${t.getFullYear()}`;
    });
  };

  const getMonthFromDate = (date) => {
    const m = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date(date);
    return `${m[d.getMonth()]} ${d.getFullYear()}`;
  };

  const fetchNewStudent = async () => {
    const operationName = localStorage.getItem("advOperationName");
    try {
      const response = await axios.get(`${API}/getadvenrolls?all=true`);
      const students = response.data.filter(i => i.status === "fullPaid" && i.operationName === operationName);
      setNewStudent(students);
      const current = getCurrentMonth();
      setSelectedMonth(current);
      setFilteredStudents(students.filter(s => getMonthFromDate(s.createdAt) === current));
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => { fetchNewStudent(); setMonths(getPastMonths()); }, []);
  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedMonth, newStudent]);

  const handleSearchChange = (e) => {
    const v = e.target.value; setSearchQuery(v);
    setFilteredStudents(newStudent.filter(s =>
      (s.email && s.email.toLowerCase().includes(v.toLowerCase())) ||
      (s.phone && s.phone.toLowerCase().includes(v.toLowerCase())) ||
      (s.fullname && s.fullname.toLowerCase().includes(v.toLowerCase())) ||
      (s.counselor && s.counselor.toLowerCase().includes(v.toLowerCase())) ||
      (s.operationName && s.operationName.toLowerCase().includes(v.toLowerCase())) ||
      (s.collegeName && s.collegeName.toLowerCase().includes(v.toLowerCase())) ||
      (s.branch && s.branch.toLowerCase().includes(v.toLowerCase()))
    ));
  };

  const handleMonthChange = (e) => {
    const m = e.target.value; setSelectedMonth(m);
    setFilteredStudents(newStudent.filter(s => getMonthFromDate(s.createdAt) === m));
  };

  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfLast - itemsPerPage, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  return (
    <div id="AdvFullPaymentPage">
      <style>{DARK_STYLES}</style>

      <h1>Full Payments</h1>

      {/* Filters */}
      <div className="filters-bar">
        <input
          type="type"
          placeholder="Search by name, email, phone…"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={selectedMonth} onChange={handleMonthChange}>
          {months.map((m,i) => <option key={i} value={m}>{m}</option>)}
        </select>
        <div className="count-badge">{filteredStudents.length} Records</div>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <div style={{overflowX:"auto"}}>
          <table>
            <thead>
              <tr>
                {["Sl","Name","Email","Contact","Mode","Counselor","Date","Domain","Program Price","Paid","Pending","Month Opted","A/c Created"].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(currentItems) && currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td className="td-name">{item.fullname}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td style={{textTransform:"capitalize"}}>{item.program}</td>
                    <td>{item.counselor}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString("en-GB")}</td>
                    <td style={{textTransform:"capitalize"}}>{item.domain}</td>
                    <td className="td-green">₹{Number(item.programPrice).toLocaleString()}</td>
                    <td className="td-blue">₹{Number(item.paidAmount).toLocaleString()}</td>
                    <td className="td-yellow">₹{(item.programPrice - item.paidAmount).toLocaleString()}</td>
                    <td style={{textTransform:"capitalize"}}>{item.monthOpted}</td>
                    <td>
                      <span className={item.mailSended ? "badge-true" : "badge-false"}>
                        {item.mailSended ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="13" style={{textAlign:"center",padding:"60px",color:"#475569"}}>No records found for this month.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredStudents.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
              className={currentPage === 1 ? "btn-disabled" : "btn-active"}
            >Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
              className={currentPage === totalPages ? "btn-disabled" : "btn-active"}
            >Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullPayment;
