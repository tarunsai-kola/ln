import React from "react";
import {
  FaEye,
  FaShieldAlt,
  FaMagic
} from "react-icons/fa";

const TemplateCard = ({ template, onPreview, onCustomize }) => {
  const {
    name,
    category = [],
    atsScore = "99% ATS Pass",
    pages = "1 Page",
    previewColor = "#3d9aa3",
    layoutPreview = {}
  } = template;

  const mainCategory = Array.isArray(category)
    ? category.find((c) => c !== "All") || "General"
    : "General";

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-primary/50 transition-all duration-200 ease-out flex flex-col h-[330px] sm:h-[340px] overflow-hidden hover:-translate-y-1.5">
      <div
        className="relative h-[215px] sm:h-[225px] bg-gradient-to-br from-gray-50 via-gray-100/70 to-gray-50 border-b border-gray-100 p-3 flex items-center justify-center overflow-hidden cursor-pointer shrink-0"
        onClick={() => onPreview(template)}
      >
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white font-extrabold text-[10px] tracking-wide shadow-xs">
            <FaShieldAlt className="text-[10px] shrink-0" /> {atsScore}
          </span>
          {pages && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-900/80 backdrop-blur-md text-white font-bold text-[10px] tracking-wide shadow-xs">
              {pages}
            </span>
          )}
        </div>

        <div className="w-[155px] sm:w-[165px] h-[195px] sm:h-[205px] bg-white rounded-xl shadow-md border border-gray-200/90 p-3.5 flex flex-col justify-start transition-transform duration-200 ease-out group-hover:scale-105 origin-center mt-5 pointer-events-none">
          <div className={`w-full pb-1.5 mb-2 border-b ${layoutPreview.headerStyle === "split-serif" ? "border-gray-800" : "border-gray-200"}`}>
            <div
              className={`h-2.5 rounded-xs w-3/4 mb-1 ${layoutPreview.headerStyle === "centered-bold" ? "mx-auto" : ""}`}
              style={{ backgroundColor: previewColor }}
            />
            <div className={`h-1 bg-gray-300 rounded-xs w-1/2 ${layoutPreview.headerStyle === "centered-bold" ? "mx-auto" : ""}`} />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between gap-1">
              <div className="h-1.5 bg-gray-700 rounded-xs w-1/3" />
              <div className="h-1 bg-gray-300 rounded-xs w-1/4" />
            </div>
            <div className="space-y-1 pl-1">
              <div className="h-1 bg-gray-200 rounded-xs w-full" />
              <div className="h-1 bg-gray-200 rounded-xs w-5/6" />
              <div className="h-1 bg-gray-200 rounded-xs w-4/5" />
            </div>

            <div className="flex items-center justify-between gap-1 pt-1">
              <div className="h-1.5 bg-gray-700 rounded-xs w-2/5" />
              <div className="h-1 bg-gray-300 rounded-xs w-1/4" />
            </div>
            <div className="space-y-1 pl-1">
              <div className="h-1 bg-gray-200 rounded-xs w-full" />
              <div className="h-1 bg-gray-200 rounded-xs w-3/4" />
            </div>
          </div>

          <div className="pt-1 mt-auto border-t border-gray-100 flex justify-between items-center text-[7px] text-gray-400 font-mono font-bold">
            <span className="text-emerald-700">✔ ATS PASS</span>
            <span className="text-amber-500 font-sans font-black text-[8px]">★ 4.9</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="flex items-center justify-between gap-2">
          <h3
            className="text-sm sm:text-base font-black text-gray-900 group-hover:text-primary transition-colors tracking-tight truncate cursor-pointer"
            onClick={() => onPreview(template)}
            title={name}
          >
            {name}
          </h3>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md shrink-0">
            {mainCategory}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-0.5 mt-auto">
          <button
            type="button"
            onClick={() => onPreview(template)}
            className="w-full py-2 px-2.5 rounded-xl bg-gray-50 hover:bg-gray-100/90 text-gray-700 font-bold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 border border-gray-200/90 hover:border-gray-300 shadow-2xs hover:shadow-xs active:scale-98 cursor-pointer"
          >
            <FaEye className="text-gray-500 text-xs shrink-0" /> Live Preview
          </button>

          <button
            type="button"
            onClick={() => onCustomize(template)}
            className="w-full py-2 px-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md active:scale-98 cursor-pointer group/btn"
          >
            <FaMagic className="text-secondary text-xs shrink-0 transition-transform group-hover/btn:rotate-12" /> Customize
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
