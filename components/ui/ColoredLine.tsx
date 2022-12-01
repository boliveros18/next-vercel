import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  color: string
}

export const ColoredLine: FC<Props> = ({color}) => {
  return (
    <hr
    style={{
        color: 'red',
        backgroundColor: color,
        height: 1,
        width: '100%',
    }}
/>
  );
};