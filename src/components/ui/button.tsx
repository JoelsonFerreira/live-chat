import { forwardRef, type ButtonHTMLAttributes } from "react";

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {
  return <button {...props} ref={ref} className={`${props.className}`} />
})