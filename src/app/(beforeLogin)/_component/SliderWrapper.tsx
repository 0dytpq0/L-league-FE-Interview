import React, { PropsWithChildren } from "react";
import "swiper/css";
import "swiper/css/pagination";

import { Swiper } from "swiper/react";

export default function SliderWrapper({ children }: PropsWithChildren) {
  return (
    <Swiper spaceBetween={14} wrapperClass="h-full mx-4 ">
      {children}
    </Swiper>
  );
}
