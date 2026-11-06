import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import API from '../API';
import { UploadCloud, FileSpreadsheet, Info, Target, Download, CheckCircle, AlertCircle, X, ChevronRight, Sparkles } from 'lucide-react';

const BulkImport = () => {
    const [file, setFile] = useState(null);
    const [importStats, setImportStats] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [selectedSource, setSelectedSource] = useState("Bulk CSV Import");
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setImportStats(null);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const selected = e.dataTransfer.files?.[0];
        if (selected) {
            setFile(selected);
            setImportStats(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a CSV or Excel file first", {
                style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("source", selectedSource);

        setUploading(true);
        try {
            const response = await axios.post(`${API}/api/adv-leads/bulk-import`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success("Import Complete!", {
                icon: '🎉',
                style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
            });
            setImportStats(response.data);
        } catch (err) {
            toast.error(err.response?.data?.message || "Import failed. Check file format.", {
                style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="admin-content-wrap min-h-screen bg-[#f8fafc] text-slate-800 font-sans p-6 sm:p-10 ml-[270px] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

            <Toaster position="top-center" toastOptions={{ className: 'font-semibold tracking-wide shadow-xl' }} />
            
            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/50 text-indigo-700 text-sm font-bold tracking-wide mb-4 border border-indigo-200/50">
                        <Sparkles size={16} className="text-indigo-500" /> Advanced Tools
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight flex items-center gap-4 mb-3">
                        Bulk Lead Import
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl">
                        Seamlessly import multiple leads from CSV or Excel files. Assign sources and track performance with precision.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                    {/* Left Column: Guidelines & Source */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Formatting Guide Card */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-indigo-200/80 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FileSpreadsheet size={80} className="text-indigo-600" />
                            </div>
                            
                            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
                                <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                                    <Info size={20} />
                                </div>
                                Formatting Guide
                            </h2>
                            <p className="text-slate-600 text-sm mb-5 leading-relaxed font-medium">
                                Your <strong>CSV or Excel (.xlsx)</strong> file must contain exactly these headers in the first row:
                            </p>
                            
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 font-mono text-indigo-700 text-[13px] font-semibold mb-6 overflow-x-auto whitespace-nowrap shadow-inner flex gap-2">
                                <span className="bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">full_name</span>
                                <span className="bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">email</span>
                                <span className="bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">phone_number</span>
                                <span className="bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">opted_domain</span>
                                <span className="bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">year_of_passing</span>
                                <span className="bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">company_name</span>
                            </div>
                            
                            <a href="/sample_leads.xlsx" download className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors group/link text-sm">
                                <div className="p-1.5 rounded-lg bg-indigo-50 group-hover/link:bg-indigo-100 transition-colors">
                                    <Download size={16} />
                                </div>
                                Download Sample File
                                <ChevronRight size={16} className="opacity-0 -ml-2 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                            </a>
                        </div>

                        {/* Source Selection Card */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
                                <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                                    <Target size={20} />
                                </div>
                                Lead Source
                            </h2>
                            <p className="text-slate-600 text-sm mb-5 font-medium">Assign an origin tag to these leads to track campaign performance.</p>
                            
                            <div className="relative">
                                <select 
                                    value={selectedSource}
                                    onChange={(e) => setSelectedSource(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200/80 text-slate-800 font-bold px-5 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 appearance-none transition-all cursor-pointer"
                                >
                                    <option value="Bulk CSV Import">Bulk CSV Import (Default)</option>
                                    <option value="Meta Ads">Meta Ads</option>
                                    <option value="Website Leads">Website Leads</option>
                                    <option value="Email Marketing">Email Marketing</option>
                                    <option value="Organic Leads">Organic Leads</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ChevronRight size={20} className="rotate-90" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Upload Area */}
                    <div className="lg:col-span-7 flex flex-col h-full">
                        <div 
                            className={`flex-1 relative bg-white/50 backdrop-blur-sm rounded-[2rem] p-10 border-2 transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden
                                ${isDragging ? 'border-indigo-500 bg-indigo-50/50 scale-[1.02] shadow-2xl shadow-indigo-500/10' : 
                                file ? 'border-emerald-400/50 bg-emerald-50/30' : 
                                'border-dashed border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}
                            `}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {/* Decorative Grid Background for Dropzone */}
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50 pointer-events-none"></div>

                            <div className="relative z-10 w-full flex flex-col items-center">
                                {!file ? (
                                    <>
                                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-transform duration-500 ${isDragging ? 'scale-110 bg-indigo-100 text-indigo-600 shadow-xl shadow-indigo-500/20' : 'bg-white text-slate-400 shadow-md border border-slate-100'}`}>
                                            <UploadCloud size={40} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Upload your file</h3>
                                        <p className="text-slate-500 font-medium mb-8 max-w-sm">
                                            Drag and drop your spreadsheet here, or click to browse your computer
                                        </p>
                                        
                                        <label className="relative cursor-pointer overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                                            <div className="bg-white border border-slate-200 text-slate-800 font-bold py-3.5 px-8 rounded-2xl transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:border-indigo-300 flex items-center gap-2">
                                                <Sparkles size={18} className="text-indigo-500" />
                                                <span>Browse Files</span>
                                            </div>
                                            <input
                                                type="file"
                                                accept=".csv, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </label>
                                    </>
                                ) : (
                                    <div className="w-full max-w-md animate-in zoom-in-95 duration-300">
                                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                                            <FileSpreadsheet size={36} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-2">{file.name}</h3>
                                        <p className="text-slate-500 font-medium mb-8">{(file.size / 1024).toFixed(1)} KB • Ready to upload</p>
                                        
                                        <div className="flex items-center justify-center gap-4">
                                            <button 
                                                onClick={() => setFile(null)} 
                                                className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-rose-600 transition-colors shadow-sm"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleUpload}
                                                disabled={uploading}
                                                className="px-8 py-3 rounded-2xl font-bold text-white bg-slate-900 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                                            >
                                                {uploading ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <UploadCloud size={18} className="group-hover:-translate-y-1 transition-transform" />
                                                        Import Leads
                                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success/Result Stats Panel */}
                {importStats && (
                    <div className="mt-8 bg-white rounded-3xl p-8 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
                        {/* Success Background Glow */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shadow-inner">
                                        <CheckCircle size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Import Summary</h3>
                                </div>
                                <p className="text-slate-500 font-medium">Your data has been processed successfully.</p>
                            </div>
                            
                            <div className="flex gap-4 w-full sm:w-auto">
                                <div className="flex-1 sm:flex-none bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col items-center justify-center min-w-[140px]">
                                    <span className="text-slate-400 text-[11px] font-black uppercase tracking-widest mb-1">Imported</span>
                                    <span className="text-4xl font-black text-emerald-500">{importStats.successCount}</span>
                                </div>
                                <div className="flex-1 sm:flex-none bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col items-center justify-center min-w-[140px]">
                                    <span className="text-slate-400 text-[11px] font-black uppercase tracking-widest mb-1">Skipped</span>
                                    <span className="text-4xl font-black text-rose-500">{importStats.failCount}</span>
                                </div>
                            </div>
                        </div>
                        
                        {(importStats.failCount > 0) && (
                            <div className="mt-6 flex items-start gap-3 bg-amber-50/50 border border-amber-100 rounded-2xl p-4 relative z-10">
                                <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-amber-700/80 text-sm font-medium m-0">
                                    <strong>Note:</strong> Skipped leads usually indicate that the record already exists in the database (duplicate email/phone) or contains invalid data formatting.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BulkImport;
