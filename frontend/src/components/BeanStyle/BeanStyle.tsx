import React, { SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";
import "./BeanStyle.scss";

type beanStyleProps = {
  setIsBeanStyle: React.Dispatch<SetStateAction<boolean>>;
  setBeanColor: SetterOrUpdater<number>;
  getColor: (idx: number) => {
    name: string;
    color: string;
    backgroundColor: string;
  };
};

export default function BeanStyle({
  setIsBeanStyle,
  setBeanColor,
  getColor,
}: beanStyleProps) {
  return (
    <>
      <div
        className="bean-style-back"
        onClick={() => setIsBeanStyle(false)}
      ></div>
      <div className="bean-style">
        {[...Array(10)].map((num, idx) => (
          <div
            className="bean-color"
            key={idx}
            onClick={(e) => {
              setBeanColor(idx);
              // ChangeBeanStyle(getColor(idx));
            }}
          >
            <div
              className="circle"
              style={{
                backgroundColor: `${getColor(idx).backgroundColor}`,
              }}
            ></div>
            <div className="text">{getColor(idx).name}</div>
          </div>
        ))}
      </div>
    </>
  );
}
