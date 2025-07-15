import { motion, MotionProps } from "framer-motion";

type MotionDivProps = MotionProps & React.HTMLAttributes<HTMLDivElement>;
type MotionAProps = MotionProps & React.HTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  target?: string;
  rel?: string;
};

const MotionDiv = (props: MotionDivProps) => {
  return <motion.div {...props} />;
};

const MotionA = (props: MotionAProps) => {
    return <motion.a {...props} />;
  };

export { MotionDiv, MotionA }