import {
  File,
  FileText,
  FileCode,
  FileJson,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileSpreadsheet,
  FilePen,
  BookMarked,
  Database,
  Terminal,
  Globe,
  Binary,
} from "lucide-react";
import { Folder } from "./app-icons"
interface IconManagerProps {
  extension?: string;
}

const ICON_CLASS = "shrink-0 w-17 h-17 p-1 opacity-85";

const EXTENSION_MAP: Record<string, React.ReactNode> = {
  // Text / Documents
  txt:    <FileText    className={ICON_CLASS} strokeWidth={1} />,
  md:     <BookMarked  className={ICON_CLASS} strokeWidth={1} />,
  pdf:    <FilePen     className={ICON_CLASS} strokeWidth={1} />,
  doc:    <FilePen     className={ICON_CLASS} strokeWidth={1} />,
  docx:   <FilePen     className={ICON_CLASS} strokeWidth={1} />,
  rtf:    <FileText    className={ICON_CLASS} strokeWidth={1} />,

  // Spreadsheets
  xls:    <FileSpreadsheet className={ICON_CLASS} strokeWidth={1} />,
  xlsx:   <FileSpreadsheet className={ICON_CLASS} strokeWidth={1} />,
  csv:    <FileSpreadsheet className={ICON_CLASS} strokeWidth={1} />,
  tsv:    <FileSpreadsheet className={ICON_CLASS} strokeWidth={1} />,

  // Code
  js:     <FileCode className={ICON_CLASS} strokeWidth={1} />,
  jsx:    <FileCode className={ICON_CLASS} strokeWidth={1} />,
  ts:     <FileCode className={ICON_CLASS} strokeWidth={1} />,
  tsx:    <FileCode className={ICON_CLASS} strokeWidth={1} />,
  py:     <FileCode className={ICON_CLASS} strokeWidth={1} />,
  java:   <FileCode className={ICON_CLASS} strokeWidth={1} />,
  c:      <FileCode className={ICON_CLASS} strokeWidth={1} />,
  cpp:    <FileCode className={ICON_CLASS} strokeWidth={1} />,
  cs:     <FileCode className={ICON_CLASS} strokeWidth={1} />,
  go:     <FileCode className={ICON_CLASS} strokeWidth={1} />,
  rb:     <FileCode className={ICON_CLASS} strokeWidth={1} />,
  php:    <FileCode className={ICON_CLASS} strokeWidth={1} />,
  swift:  <FileCode className={ICON_CLASS} strokeWidth={1} />,
  rs:     <FileCode className={ICON_CLASS} strokeWidth={1} />,
  kt:     <FileCode className={ICON_CLASS} strokeWidth={1} />,
  sh:     <Terminal  className={ICON_CLASS} strokeWidth={1} />,
  bash:   <Terminal  className={ICON_CLASS} strokeWidth={1} />,
  zsh:    <Terminal  className={ICON_CLASS} strokeWidth={1} />,

  // Web
  html:   <Globe     className={ICON_CLASS} strokeWidth={1} />,
  htm:    <Globe     className={ICON_CLASS} strokeWidth={1} />,
  css:    <Globe     className={ICON_CLASS} strokeWidth={1} />,
  scss:   <Globe     className={ICON_CLASS} strokeWidth={1} />,
  sass:   <Globe     className={ICON_CLASS} strokeWidth={1} />,

  // Data / Config
  json:   <FileJson  className={ICON_CLASS} strokeWidth={1} />,
  xml:    <FileCode  className={ICON_CLASS} strokeWidth={1} />,
  yaml:   <FileCode  className={ICON_CLASS} strokeWidth={1} />,
  yml:    <FileCode  className={ICON_CLASS} strokeWidth={1} />,
  toml:   <FileCode  className={ICON_CLASS} strokeWidth={1} />,
  ini:    <FileCode  className={ICON_CLASS} strokeWidth={1} />,
  env:    <FileCode  className={ICON_CLASS} strokeWidth={1} />,
  sql:    <Database  className={ICON_CLASS} strokeWidth={1} />,
  db:     <Database  className={ICON_CLASS} strokeWidth={1} />,
  sqlite: <Database  className={ICON_CLASS} strokeWidth={1} />,

  // Images
  png:    <FileImage className={ICON_CLASS} strokeWidth={1} />,
  jpg:    <FileImage className={ICON_CLASS} strokeWidth={1} />,
  jpeg:   <FileImage className={ICON_CLASS} strokeWidth={1} />,
  gif:    <FileImage className={ICON_CLASS} strokeWidth={1} />,
  webp:   <FileImage className={ICON_CLASS} strokeWidth={1} />,
  svg:    <FileImage className={ICON_CLASS} strokeWidth={1} />,
  ico:    <FileImage className={ICON_CLASS} strokeWidth={1} />,
  bmp:    <FileImage className={ICON_CLASS} strokeWidth={1} />,
  tiff:   <FileImage className={ICON_CLASS} strokeWidth={1} />,

  // Video
  mp4:    <FileVideo className={ICON_CLASS} strokeWidth={1} />,
  mov:    <FileVideo className={ICON_CLASS} strokeWidth={1} />,
  avi:    <FileVideo className={ICON_CLASS} strokeWidth={1} />,
  mkv:    <FileVideo className={ICON_CLASS} strokeWidth={1} />,
  webm:   <FileVideo className={ICON_CLASS} strokeWidth={1} />,
  flv:    <FileVideo className={ICON_CLASS} strokeWidth={1} />,

  // Audio
  mp3:    <FileAudio className={ICON_CLASS} strokeWidth={1} />,
  wav:    <FileAudio className={ICON_CLASS} strokeWidth={1} />,
  flac:   <FileAudio className={ICON_CLASS} strokeWidth={1} />,
  aac:    <FileAudio className={ICON_CLASS} strokeWidth={1} />,
  ogg:    <FileAudio className={ICON_CLASS} strokeWidth={1} />,
  m4a:    <FileAudio className={ICON_CLASS} strokeWidth={1} />,

  // Archives
  zip:    <FileArchive className={ICON_CLASS} strokeWidth={1} />,
  tar:    <FileArchive className={ICON_CLASS} strokeWidth={1} />,
  gz:     <FileArchive className={ICON_CLASS} strokeWidth={1} />,
  rar:    <FileArchive className={ICON_CLASS} strokeWidth={1} />,
  "7z":   <FileArchive className={ICON_CLASS} strokeWidth={1} />,
  bz2:    <FileArchive className={ICON_CLASS} strokeWidth={1} />,

  // Binary / Executable
  exe:    <Binary className={ICON_CLASS} strokeWidth={1} />,
  bin:    <Binary className={ICON_CLASS} strokeWidth={1} />,
  iso:    <Binary className={ICON_CLASS} strokeWidth={1} />,
  dmg:    <Binary className={ICON_CLASS} strokeWidth={1} />,
  apk:    <Binary className={ICON_CLASS} strokeWidth={1} />,
  dll:    <Binary className={ICON_CLASS} strokeWidth={1} />,
};

const IconManager = ({ extension }: IconManagerProps) => {
  if (extension === undefined) {
    return <Folder className="shrink-0 w-17 h-17 p-1" />;
  }

  return (
    EXTENSION_MAP[extension.toLowerCase()] ?? (
      <File className={ICON_CLASS} strokeWidth={1} />
    )
  );
};

export default IconManager