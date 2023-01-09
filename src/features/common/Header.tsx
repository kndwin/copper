import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

type BackButtonProps = {
  href?: string;
};

export const BackButton = ({ href = "/dashboard" }: BackButtonProps) => (
  <Link href={href}>
    <HiArrowLeft className="h-8 w-8 rounded-full bg-sand-4 p-2 hover:bg-sand-6" />
  </Link>
);
