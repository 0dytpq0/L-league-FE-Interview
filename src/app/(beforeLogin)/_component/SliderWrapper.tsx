import React, { PropsWithChildren } from "react";
import "swiper/css";
import "swiper/css/pagination";

import { Swiper } from "swiper/react";

function SliderWrapper({ children }: PropsWithChildren) {
  return (
    <Swiper slidesPerView={3} spaceBetween={14} className="w-full h-full">
      {children}
    </Swiper>
  );
}

export default SliderWrapper;
