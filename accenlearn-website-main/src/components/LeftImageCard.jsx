import React from 'react'

const LeftImageCard = ({ res }) => {
  let Icon = res?.icon;

  return (
    <div
      className="w-full h-full rounded-xl sm:rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer p-4 sm:p-6 border border-gray-100/80"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
        {/* Icon/Image Section */}
        <div className="flex-shrink-0">
          {Icon ? (
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center">
              <Icon className="text-secondary w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />
            </div>
          ) : res.pic ? (
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
                <img
                  src={res.pic}
                  alt={res.title || 'Avatar'}
                  className="w-full h-full object-cover"
              />
            </div>
          ) : null}
        </div>

        {/* Content Section */}
        <div className="flex-1 text-center sm:text-left w-full">
          <h1 className="global_text text-primary font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">
            {res.title}
          </h1>
          <div className="global_text text-gray-700 text-sm sm:text-base min-h-[80px] sm:min-h-[100px]">
            <p className="text-gray-600 leading-relaxed">
              {res.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftImageCard
