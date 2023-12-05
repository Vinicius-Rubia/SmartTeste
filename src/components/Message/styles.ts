import tw from "tailwind-styled-components";

export const Message = tw.p`
  flex
  items-center
  bg-gradient-to-b
  text-[#E5E5E5]
  py-2
  px-3
  rounded-b-md
  text-start
  text-sm
  max-w-[90%]
  sm:max-w-[60%]
  sm:text-base
`;

export const Hour = tw.span`
  text-xs
  block
  text-white/50
`;
