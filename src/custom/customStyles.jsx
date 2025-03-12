/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import tw from "tailwind-styled-components";
export const Heading = tw.h1`
  text-4xl text-white sm:text-[30px] lg:text-[40px] tracking-wide
`;

export const SubHeading = tw.h2`
  text-primary-100 text-[1.75rem] sm:text-[3rem] lg:text-[3.75rem] mt-5 lg:mt-10 tracking-wide 
`;

export const SubGradientText = tw.span`
  bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text
`;

export const SubHeading2 = tw.h2`
  text-primary-100 text-[32px] sm:text-[34px] lg:text-[44px]  tracking-wide
`;

export const Para = tw.p`
 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[20px]
font-normal
text-[#1F1F21]
leading-[28px] sm:leading-[30px] md:leading-[31px] lg:leading-[34px]
tracking-[-0.002px]
`;

export const FullWidth = tw.div`
  w-full
`;

export const Container = tw.div`
  max-w-7xl mx-auto pt-20 px-6
`;

export const Label = tw.label`
  text-[#FAFAFB] text-[16px] font-normal tracking-[-0.24px]
`;
