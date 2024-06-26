import React, {
  useContext,
  useState,
  useMemo,
  useLayoutEffect,
} from "react";
import {
  ToolTipCardProps,
} from "@tomerkakou/fortune-sheet-core";
import "./index.css";
import _ from "lodash";
import WorkbookContext from "../../context";

export const ToolTipCard: React.FC<ToolTipCardProps> = ({
  r,
  c,
  rc,
  originText,
  position,
}) => {
  const { context, setContext, refs } = useContext(WorkbookContext);
  const [text, setText] = useState<string>(originText);

  const containerEvent = useMemo(
    () => ({
      onMouseEnter: () => _.set(refs.globalCache, "tooltipCard.mouseEnter", true),
      onMouseLeave: () => _.set(refs.globalCache, "tooltipCard.mouseEnter", false),
      onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        e.stopPropagation(),
      onMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        e.stopPropagation(),
      onMouseUp: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        e.stopPropagation(),
      onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) =>
        e.stopPropagation(),
      onDoubleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        e.stopPropagation(),
    }),
    [refs.globalCache]
  );

  useLayoutEffect(() => {
    setText(originText);
  }, [rc, originText]);


    return (
      <div
        {...containerEvent}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        className="fortune-tooltip-modify-modal tooltip-toolbar"
        style={{ left: position.cellLeft + 20, top: position.cellBottom }}
      >
        <div
          className="tooltip-content"
        >
          {text}
        </div>
      </div>
    );

};

export default ToolTipCard;
