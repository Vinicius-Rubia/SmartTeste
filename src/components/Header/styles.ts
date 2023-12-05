import tw from "tailwind-styled-components";

export const Header = tw.header`
  flex
  items-center
  bg-white/5
  backdrop-blur-lg]
  border
  border-white/5
  md:px-9
  px-3
  py-7
`;

export const Head = tw.div`
  flex
  items-center
  gap-2.5
`;

export const ImgLogo = tw.img`
  w-10
  h-10
`;

export const TitleChat = tw.h2`
  text-start
  font-medium
`;

export const Status = tw.p`
  text-xs
  text-start
  text-sw-blue
  font-medium
`;
