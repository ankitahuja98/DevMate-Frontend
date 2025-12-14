import React from "react";
import type { userData } from "../../types/userData";

interface BasicInfoProps {
  userData: userData;
  setUserData: React.Dispatch<React.SetStateAction<userData>>;
}

const BasicInfo = ({ userData, setUserData }: BasicInfoProps) => {
  const { name, age } = userData;

  return <div>{name} hello</div>;
};

export default BasicInfo;
