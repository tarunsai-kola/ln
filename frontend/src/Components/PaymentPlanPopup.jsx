import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Layers, Percent, ShieldCheck, Zap, Clock, BadgeCheck } from 'lucide-react';

const fmt = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const PaymentPlanPopup = ({ isOpen, onClose, basePrice, courseName, durationMonths = 6, themeColor = '#6366f1' }) => {
  const [activeTab, setActiveTab] = useState('upfront');

  if (!isOpen) return null;

  const GST = 0.18;
  const bookingBase = 10000;
  const bookingTotal = bookingBase * (1 + GST);

  const totalBase = basePrice;
  const grandTotal = totalBase * (1 + GST);

  // Upfront
  const upfrontRegBase = totalBase - bookingBase;
  const upfrontRegTotal = upfrontRegBase * (1 + GST);

  // Installments
  const instBase = (totalBase - bookingBase) / (durationMonths + 1);
  const instTotal = instBase * (1 + GST);

  // Finance
  const financeRegBase = Math.max(0, totalBase * 0.05);
  const loanBase = totalBase - bookingBase - financeRegBase;
  const loanTotal = loanBase * (1 + GST);
  const financeRegTotal = financeRegBase * (1 + GST);

  const emiOptions = [6, 9, 12, 15, 18, 24].map((months) => ({
    months,
    amount: Math.round(loanTotal / months),
  }));

  const tabs = [
    { id: 'upfront', label: 'Full Payment', sub: 'Best value', icon: CreditCard, color: '#6366f1' },
    { id: 'installments', label: 'Installments', sub: 'Split across months', icon: Layers, color: '#10b981' },
    { id: 'finance', label: 'EMI / Finance', sub: '0% interest options', icon: Percent, color: '#f59e0b' },
  ];

  const activeTabData = tabs.find((t) => t.id === activeTab);

  // Build breakdown rows depending on active tab
  const breakdown =
    activeTab === 'upfront'
      ? [
          { step: '1', label: 'Booking Fee (Now)', amount: bookingTotal, base: bookingBase },
          { step: '2', label: 'Registration Fee (Within 7 days)', amount: upfrontRegTotal, base: upfrontRegBase },
        ]
      : activeTab === 'installments'
      ? [
          { step: '1', label: 'Booking Fee (Now)', amount: bookingTotal, base: bookingBase },
          { step: '2', label: `Monthly Instalment × ${durationMonths + 1}`, amount: instTotal, base: instBase, tag: `${durationMonths + 1} × months` },
        ]
      : [
          { step: '1', label: 'Booking Fee (Now)', amount: bookingTotal, base: bookingBase },
          { step: '2', label: 'Finance Registration Fee', amount: financeRegTotal, base: financeRegBase },
          { step: '3', label: 'Loan Amount (Bank / NBFC)', amount: loanTotal, base: loanBase },
        ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-6" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl relative flex flex-col md:flex-row overflow-hidden"
        style={{
          background: '#0f0f1a',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24,
          maxHeight: '92vh',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
        }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)` }} />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}
        >
          <X size={16} />
        </button>

        {/* ─── LEFT SIDEBAR ─── */}
        <div
          className="w-full md:w-[260px] flex flex-col shrink-0 p-6 md:p-8 gap-6"
          style={{ borderRight: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1" style={{ color: themeColor }}>
              Payment Options
            </p>
            <h2 className="text-xl font-black text-white leading-tight m-0">
              {courseName || 'Course'} Fees
            </h2>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-white">{fmt(grandTotal)}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">incl. 18% GST</p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-col gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200"
                  style={{
                    background: isActive ? `${tab.color}18` : 'transparent',
                    border: isActive ? `1px solid ${tab.color}44` : '1px solid transparent',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${tab.color}${isActive ? '22' : '12'}`, color: tab.color }}
                  >
                    <Icon size={17} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold m-0" style={{ color: isActive ? '#fff' : '#94a3b8' }}>
                      {tab.label}
                    </p>
                    <p className="text-[10px] m-0 mt-0.5 font-medium" style={{ color: isActive ? tab.color : '#4b5563' }}>
                      {tab.sub}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Secure badge */}
          <div className="mt-auto pt-4 flex items-start gap-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <ShieldCheck size={16} className="shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed m-0">
              Secured via Razorpay · UPI, Cards, Net Banking & Wallets accepted
            </p>
          </div>
        </div>

        {/* ─── RIGHT CONTENT ─── */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col gap-5"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${activeTabData.color}18`, color: activeTabData.color, border: `1px solid ${activeTabData.color}33` }}
                >
                  <activeTabData.icon size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white m-0">{activeTabData.label}</h3>
                  <p className="text-[12px] text-slate-500 m-0 mt-0.5 font-medium">{activeTabData.sub}</p>
                </div>
              </div>

              {/* Breakdown cards */}
              <div className="flex flex-col gap-3">
                {breakdown.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-black"
                      style={{ background: `${activeTabData.color}18`, color: activeTabData.color }}
                    >
                      {row.step}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-[12px] font-semibold text-slate-400 m-0 leading-tight">{row.label}</p>
                      {row.tag && (
                        <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${activeTabData.color}18`, color: activeTabData.color }}>
                          {row.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-black text-white m-0">{fmt(row.amount)}</p>
                      <p className="text-[10px] text-slate-500 m-0 mt-0.5 font-medium">{fmt(row.base)} + GST</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Banner */}
              <div
                className="rounded-2xl p-5 flex items-center justify-between relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${activeTabData.color}22, ${activeTabData.color}0d)`, border: `1px solid ${activeTabData.color}44` }}
              >
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] m-0 mb-1" style={{ color: activeTabData.color }}>
                    Total Programme Fee
                  </p>
                  <p className="text-[11px] text-slate-400 m-0 font-medium">Base {fmt(totalBase)} + 18% GST</p>
                </div>
                <p className="text-4xl font-black text-white m-0">{fmt(grandTotal)}</p>
              </div>

              {/* EMI Grid for Finance */}
              {activeTab === 'finance' && (
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-500 mb-3">
                    EMI Repayment Options
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {emiOptions.map((opt, i) => (
                      <div
                        key={i}
                        className="rounded-xl p-4 flex flex-col items-center gap-1.5 transition-all hover:-translate-y-0.5 cursor-pointer"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                      >
                        <div className="flex items-center gap-1">
                          <Clock size={12} style={{ color: activeTabData.color }} />
                          <span className="text-[11px] font-bold" style={{ color: activeTabData.color }}>{opt.months} mo</span>
                        </div>
                        <p className="text-lg font-black text-white m-0">{fmt(opt.amount)}</p>
                        <p className="text-[10px] text-slate-500 m-0 font-medium">per month</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment schedule note */}
              <div
                className="rounded-xl p-5 flex flex-col gap-3"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-500 m-0">Payment Schedule</p>
                <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                  {[
                    'Booking fee payable immediately upon selection confirmation.',
                    'Registration fee due within 7 days or 2 days before batch start.',
                    activeTab === 'installments' && `Balance split across ${durationMonths + 1} equal monthly installments.`,
                    activeTab === 'finance' && '0% interest EMI via partner banks & NBFCs.',
                    'Terms & Conditions apply.',
                  ]
                    .filter(Boolean)
                    .map((text, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <BadgeCheck size={13} className="shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <p className="text-[12px] text-slate-400 font-medium m-0 leading-relaxed">{text}</p>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Secure + Razorpay footer */}
              <div className="flex items-center justify-center gap-2 py-2">
                <ShieldCheck size={14} style={{ color: '#22c55e' }} />
                <p className="text-[11px] font-bold text-slate-600 m-0 uppercase tracking-widest">Secure Payment Gateway</p>
                <Zap size={12} style={{ color: '#fbbf24' }} />
                <p className="text-[11px] font-bold text-slate-600 m-0 uppercase tracking-widest">Powered by Razorpay</p>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPlanPopup;
