import type { LucideIcon, LucideProps } from "lucide-react";

import systemSvg from "../Icons/SVG/System.svg";
import storageDrive from "../Icons/PNG/Drive.png";
import storageFolder from "../Icons/SVG/Folder.svg";
import textFile from "../Icons/SVG/TextFile.svg";
import unknownFile from "../Icons/SVG/UnknownFile.svg";
import docsFile from "../Icons/SVG/Docs.svg";

const makeUrlIcon = (src: string): LucideIcon =>
  ((props: LucideProps) => {
    const { size = 18, className } = props;

    return (
      <img
        src={src}
        width={size}
        height={size}
        className={className}
        alt=""
      />
    );
  }) as LucideIcon;

export const System = makeUrlIcon(systemSvg);
export const Drive = makeUrlIcon(storageDrive);
export const Folder = makeUrlIcon(storageFolder);
export const TextFile = makeUrlIcon(textFile);
export const UnknownFile = makeUrlIcon(unknownFile);
export const DocsFile = makeUrlIcon(docsFile);
