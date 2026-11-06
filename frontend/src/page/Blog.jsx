import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Calendar, Search, Sparkles } from "lucide-react";
import { mockArticles } from "../data/blogArticles";

const blogCategories = [
  "All",
  "AI & GenAI",
  "Data Science",
  "Cybersecurity",
  "Digital Marketing",
  "Software Eng",
  "Career & Growth"
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredArticles = mockArticles.filter(article => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = mockArticles.find(a => a.featured);
  const gridArticles = filteredArticles.filter(a => !a.featured || activeCategory !== "All" || searchQuery !== "");

  return (
    <div className="bg-[#020408] min-h-screen text-white font-sans selection:bg-[#eab308]/30 overflow-hidden">
      
      {/* Absolute Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#2563eb]/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#eab308]/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Hero Header (pt-32 prevents overlap with global Header) */}
      <section className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-gray-300 mb-8 backdrop-blur-md"
          >
            <Sparkles size={14} className="text-[#eab308]" />
            Discover The Future
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 ag-font-outfit"
          >
            <span className="text-white drop-shadow-md">Accenlearn</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eab308] to-[#fef08a] drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">Insights</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Expert engineering perspectives, career advice, and deep dives into AI, Data, and Cybersecurity from industry leaders.
          </motion.p>
          
          {/* Ultra Premium Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-xl mx-auto relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#eab308] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative flex items-center bg-[#0a0a12]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden focus-within:border-white/30 transition-colors shadow-2xl">
              <div className="pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#eab308] transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search articles, tutorials, insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-6 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Sub-Navbar */}
      <section className={`sticky top-[72px] z-40 px-6 py-4 transition-all duration-300 ${isScrolled ? 'bg-[#020408]/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto relative">
          {/* Fading edges for scrollable container */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#020408] to-transparent z-10 pointer-events-none md:hidden"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#020408] to-transparent z-10 pointer-events-none md:hidden"></div>
          
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide no-scrollbar relative z-0 items-center md:justify-center">
            {blogCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full whitespace-nowrap text-[13px] uppercase tracking-wider font-bold transition-all duration-300 border ${
                  activeCategory === cat 
                    ? "bg-[#eab308]/10 text-[#eab308] border-[#eab308]/50 shadow-[0_0_20px_rgba(234,179,8,0.15)]" 
                    : "bg-white/[0.03] text-gray-400 border-white/5 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 relative z-10">
        
        {/* Cinematic Featured Article */}
        {activeCategory === "All" && searchQuery === "" && featuredArticle && (
          <motion.a 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            href={featuredArticle.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block mb-20 group cursor-pointer"
          >
            <div className="relative rounded-[32px] overflow-hidden border border-white/10 bg-[#05050A] flex flex-col lg:flex-row min-h-[480px] hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              {/* Image Half */}
              <div className="w-full lg:w-3/5 relative overflow-hidden bg-[#0a0a12]">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#05050A]"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-black/60 backdrop-blur-xl text-white text-[10px] uppercase font-black tracking-widest px-4 py-2 rounded-xl border border-white/10 shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#eab308] animate-pulse"></span> FEATURED
                  </span>
                </div>
              </div>
              
              {/* Content Half */}
              <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 lg:-ml-12 lg:bg-gradient-to-r lg:from-transparent lg:via-[#05050A]/90 lg:to-[#05050A]">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[#eab308] font-black text-[11px] tracking-[0.2em] uppercase bg-[#eab308]/10 px-3 py-1.5 rounded-lg border border-[#eab308]/20">{featuredArticle.category}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                  <span className="flex items-center gap-2 text-gray-400 text-sm font-medium"><Calendar size={14} /> {featuredArticle.date}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#eab308] transition-all duration-300 leading-[1.1] ag-font-outfit">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-400 text-lg mb-10 line-clamp-3 leading-relaxed font-light">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="flex items-center gap-2 text-gray-500 text-sm font-medium bg-white/5 px-4 py-2 rounded-lg border border-white/5"><Clock size={14} /> {featuredArticle.readTime}</span>
                  <span className="flex items-center gap-2 text-black bg-white hover:bg-[#eab308] font-bold text-sm px-6 py-3 rounded-xl transition-colors duration-300 shadow-lg">
                    Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </motion.a>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {gridArticles.map((article, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                key={article.id}
                className="group h-full"
              >
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="block bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-[24px] overflow-hidden hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 flex flex-col h-full shadow-lg hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1">
                  {/* Card Image */}
                  <div className="h-56 w-full relative overflow-hidden bg-[#0a0a12]">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-90 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent opacity-90"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/40 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-8 flex flex-col flex-grow relative z-10 -mt-2">
                    <div className="flex items-center gap-3 mb-4 text-gray-500 text-xs font-medium">
                      <span className="flex items-center gap-1.5"><Calendar size={13} className="text-[#eab308]" /> {article.date}</span>
                      <div className="w-1 h-1 rounded-full bg-gray-700"></div>
                      <span className="flex items-center gap-1.5"><Clock size={13} /> {article.readTime}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#eab308] transition-all duration-300 line-clamp-2 leading-tight">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-8 line-clamp-3 flex-grow leading-relaxed font-light">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm font-bold text-white group-hover:text-[#eab308] transition-colors mt-auto pt-5 border-t border-white/5">
                      Read Full Story <ArrowRight size={16} className="ml-2 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {gridArticles.length === 0 && (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Insights Found</h3>
              <p className="text-gray-400 max-w-md">We couldn't find any articles matching your search criteria. Try using different keywords or browsing all categories.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;
