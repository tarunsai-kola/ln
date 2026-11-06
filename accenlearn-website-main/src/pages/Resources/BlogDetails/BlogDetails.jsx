import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogs } from "../../../data";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaShareAlt } from "react-icons/fa";

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="py-20 px-4 text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-extrabold text-primary mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-8">The blog post you are looking for might have been moved or removed.</p>
        <Link
          to="/resources/blogs"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-lg hover:bg-primary/90 transition-all"
        >
          <FaArrowLeft /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-4 sm:pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-20">
      {/* Back Button */}
      <div className="mb-8 relative z-30">
        <Link
          to="/resources/blogs"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white hover:bg-primary text-sm font-bold text-gray-700 hover:text-white rounded-2xl border border-gray-200/80 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-secondary group-hover:text-white" />
          Back to All Articles
        </Link>
      </div>

      {/* Article Header */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-gray-100 mb-10">
        <span className="text-secondary font-bold text-xs tracking-wider uppercase bg-secondary/10 px-3 py-1.5 rounded-full inline-block mb-4">
          {blog.category}
        </span>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold text-primary leading-tight mb-6">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-100 text-sm text-gray-500">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium text-gray-700">
              <FaCalendarAlt className="text-secondary" />
              {blog.publishedDate}
            </span>
            <span className="flex items-center gap-1.5 font-medium text-gray-700">
              <FaClock className="text-secondary" />
              {blog.readTime}
            </span>
          </div>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: blog.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Article URL copied to clipboard!");
              }
            }}
            className="flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors cursor-pointer"
          >
            <FaShareAlt /> Share
          </button>
        </div>

        {/* Featured Image or Gradient Banner */}
        <div className="mt-8 rounded-3xl overflow-hidden shadow-md max-h-96 bg-gradient-to-r from-primary/15 via-secondary/10 to-primary/20 flex items-center justify-center relative min-h-[180px]">
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover max-h-96 relative z-10"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : null}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/15">
            <span className="text-4xl font-extrabold text-primary/30 tracking-tight uppercase">
              AccenLearn Library
            </span>
          </div>
        </div>

        {/* Article Body */}
        <div className="mt-8 max-w-none text-gray-700 leading-relaxed space-y-6">
          <p className="text-lg font-medium text-gray-800 border-l-4 border-secondary pl-4 py-2 italic bg-secondary/5 rounded-r-lg mb-8 shadow-sm">
            {blog.description}
          </p>
          
          <div className="space-y-6 text-gray-700 font-normal text-base sm:text-lg leading-relaxed text-left">
            {(() => {
              const formatInlineText = (text) => {
                const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\$.*?\$)/g);
                return parts.map((part, i) => {
                  if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
                    return (
                      <strong key={i} className="font-bold text-gray-900">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**") && part.length > 2) {
                    return (
                      <span key={i} className="italic font-semibold text-gray-800">
                        {part.slice(1, -1)}
                      </span>
                    );
                  }
                  if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
                    return (
                      <code key={i} className="bg-gray-100 text-secondary px-1.5 py-0.5 rounded text-sm font-mono font-semibold">
                        {part.slice(1, -1)}
                      </code>
                    );
                  }
                  if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
                    return (
                      <span key={i} className="font-mono text-primary font-semibold bg-primary/5 px-1 rounded">
                        {part.slice(1, -1)}
                      </span>
                    );
                  }
                  return part;
                });
              };

              const lines = blog.content.split("\n");
              const elements = [];
              let currentList = null; // { type: 'ul' | 'ol', items: [] }
              let currentParagraph = [];

              const flushParagraph = () => {
                if (currentParagraph.length > 0) {
                  const text = currentParagraph.join(" ").trim();
                  if (text) {
                    elements.push(
                      <p key={`p-${elements.length}`} className="text-gray-700 font-normal leading-relaxed my-4 text-left">
                        {formatInlineText(text)}
                      </p>
                    );
                  }
                  currentParagraph = [];
                }
              };

              const flushList = () => {
                if (currentList && currentList.items.length > 0) {
                  if (currentList.type === "ul") {
                    elements.push(
                      <ul key={`ul-${elements.length}`} className="space-y-2.5 my-4 pl-6 sm:pl-8 list-disc marker:text-secondary text-gray-700 font-normal text-left">
                        {currentList.items.map((item, idx) => (
                          <li key={idx} className="leading-relaxed pl-1 font-normal text-gray-700">
                            {formatInlineText(item)}
                          </li>
                        ))}
                      </ul>
                    );
                  } else {
                    elements.push(
                      <ol key={`ol-${elements.length}`} className="space-y-2.5 my-4 pl-6 sm:pl-8 list-decimal marker:text-primary marker:font-bold text-gray-700 font-normal text-left">
                        {currentList.items.map((item, idx) => (
                          <li key={idx} className="leading-relaxed pl-1 font-normal text-gray-700">
                            {formatInlineText(item)}
                          </li>
                        ))}
                      </ol>
                    );
                  }
                }
                currentList = null;
              };

              lines.forEach((line) => {
                const trimmed = line.trim();

                // Empty line
                if (!trimmed) {
                  flushParagraph();
                  flushList();
                  return;
                }

                // Level 3 Heading (### )
                if (trimmed.startsWith("### ")) {
                  flushParagraph();
                  flushList();
                  elements.push(
                    <h3
                      key={`h3-${elements.length}`}
                      className="text-2xl sm:text-3xl font-extrabold text-primary pt-6 pb-2 border-b border-gray-100 tracking-tight text-left block w-full"
                    >
                      {formatInlineText(trimmed.replace(/^###\s+/, ""))}
                    </h3>
                  );
                  return;
                }

                // Level 2 Heading (## )
                if (trimmed.startsWith("## ")) {
                  flushParagraph();
                  flushList();
                  elements.push(
                    <h2
                      key={`h2-${elements.length}`}
                      className="text-3xl sm:text-4xl font-extrabold text-primary pt-8 pb-3 border-b border-gray-200 tracking-tight text-left block w-full"
                    >
                      {formatInlineText(trimmed.replace(/^##\s+/, ""))}
                    </h2>
                  );
                  return;
                }

                // Bullet item (* or -)
                if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                  flushParagraph();
                  if (!currentList || currentList.type !== "ul") {
                    flushList();
                    currentList = { type: "ul", items: [] };
                  }
                  currentList.items.push(trimmed.replace(/^[\*\-]\s+/, ""));
                  return;
                }

                // Numbered item (1. , 2. , etc. right at the start of a line inside a list)
                // Note: we only trigger numbered list if it matches e.g. "1. " and not e.g. "2026." at end of line
                if (/^\d+\.\s+/.test(trimmed) && (currentList?.type === "ol" || /^[123]\.\s+/.test(trimmed))) {
                  flushParagraph();
                  if (!currentList || currentList.type !== "ol") {
                    flushList();
                    currentList = { type: "ol", items: [] };
                  }
                  currentList.items.push(trimmed.replace(/^\d+\.\s+/, ""));
                  return;
                }

                // Normal paragraph text line
                if (currentList) {
                  // If we are in a list and get a continued text line, append to last list item
                  const lastIndex = currentList.items.length - 1;
                  if (lastIndex >= 0) {
                    currentList.items[lastIndex] += " " + trimmed;
                  } else {
                    currentParagraph.push(trimmed);
                  }
                } else {
                  currentParagraph.push(trimmed);
                }
              });

              flushParagraph();
              flushList();

              return elements;
            })()}
          </div>
        </div>
      </div>

      {/* Bottom Back Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
        <Link
          to="/resources/blogs"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 font-bold rounded-2xl transition-all shadow-sm group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to All Articles
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;