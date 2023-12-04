import { motion } from "framer-motion";
import tw from "tailwind-styled-components";

export const Container = tw.section`
  bg-black
  h-screen
  flex
  flex-col
  justify-center
  items-center
  gap-3
  overflow-hidden
`;

export const Loading = tw(motion.div)`
  w-36
  h-36
  bg-gradient-to-r
  from-sky-500 to-cyan-500
  rounded-full
  grid
  place-items-center
  relative
  animate-bounce
`;

export const Border = tw.span`
  absolute
  inset-0
  bg-[#2F2F2F]
  rounded-full
  grid
  place-items-center
  m-1
  animate-pulse
`;

export const Logo = tw.img`
  w-20
  h-20
`;

export const Text = tw.p`
  text-[#E5E5E5]
  font-semibold
  animate-pulse
`;

export const TextSuccess = tw.p`
  text-sky-500
  font-semibold
  animate-pulse
`;