import React, { useState } from "react";
import { CONTACT_INFO, NAV_ITEMS, PROGRAMS_DATA, SOCIAL_ITEMS } from "../shared/data";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const workshopsItem = NAV_ITEMS.find(item => item.name === "Programs");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#020817] text-white relative overflow-hidden font-sans">

      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Top CTA Banner */}
      <div className="relative border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full mb-4">
              Start Your Journey
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white mb-4">
              Take the First Step<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Towards Mastery!
              </span>
            </h2>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-md mb-8">
              Join thousands of learners gaining in-demand skills through expert-led courses.
              Grow at your own pace, earn certificates, and level up your future.
            </p>
            <button
              onClick={() => navigate("/internship")}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-[0_8px_30px_rgba(79,70,229,0.35)] hover:shadow-[0_12px_35px_rgba(79,70,229,0.5)] hover:-translate-y-0.5 transition-all duration-200 text-sm"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Enquire Now
            </button>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-8 lg:items-end">
            {/* Contact Info */}
            <div>
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 mb-3">Contact Us</h3>
              <div className="flex flex-col gap-2.5">
                {CONTACT_INFO.map((res) => (
                  <div key={res.id} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all">
                      <res.icon size={14} className="text-white/60 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">{res.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="w-full lg:max-w-xs">
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 mb-3">Stay Updated</h3>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1.5 focus-within:border-blue-500/50 transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none px-3 py-1.5"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shrink-0">
                  Subscribe
                </button>
              </form>

              {/* Social Links */}
              <div className="flex items-center gap-2 mt-4">
                {SOCIAL_ITEMS.map((social) => (
                  <a
                    key={social.id}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Programs */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 mb-4">Programs</h3>
            <div className="flex flex-col gap-2">
              {PROGRAMS_DATA.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-blue-500/0 group-hover:bg-blue-500 transition-all shrink-0" />
                  {item.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.filter(item => !item.children).map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-blue-500/0 group-hover:bg-blue-500 transition-all shrink-0" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Tech/IT Programs */}
          {workshopsItem?.children && (
            <div>
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 mb-4">Tech/IT Programs</h3>
              <div className="flex flex-col gap-2">
                {workshopsItem.children[0]?.children?.map((subItem) => (
                  <Link
                    key={subItem.id}
                    to={subItem.link}
                    className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500/0 group-hover:bg-blue-500 transition-all shrink-0" />
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Other Programs */}
          {workshopsItem?.children && (
            <div>
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 mb-4">Other Programs</h3>
              <div className="flex flex-col gap-4">
                {workshopsItem.children.slice(1).map((category) => (
                  <div key={category.id}>
                    <p className="text-xs font-bold text-white/80 mb-1.5">{category.name}</p>
                    <div className="flex flex-col gap-1.5 pl-2">
                      {category.children?.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.link}
                          className="text-xs text-white/50 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-indigo-500/0 group-hover:bg-indigo-400 transition-all shrink-0" />
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Accenlearn" className="h-7 object-contain opacity-70" />
            <span className="text-white/20 text-lg">|</span>
            <p className="text-white/30 text-xs">© {new Date().getFullYear()} Accenlearn. All rights reserved.</p>
          </div>
          <p className="text-white/20 text-xs">Empowering Learning Worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
