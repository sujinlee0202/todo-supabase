import { Button as MTButton } from "@material-tailwind/react";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button">;

export default function Button({ ...rest }: Props) {
  return <MTButton {...rest} />;
}
