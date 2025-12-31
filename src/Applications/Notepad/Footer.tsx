interface FooterProps {
  text: string;
  cursor: number;
}

const Footer = ({ text, cursor }: FooterProps) => {

  const calculateChar = (s: string) => {
    const len = s.trimEnd().length;
    return len === 1 ? `${len} character` : `${len} characters`;
  };

  const calculateLineCol = (text: string, cursor: number) => {
    cursor = Math.max(0, Math.min(cursor, text.length));
    if (text.length === 0) {
      return { line: 1, column: 1 };
    }
    let effectiveText = text;
    let effectiveCursor = cursor;

    if (cursor === text.length && text.endsWith("\n")) {
      effectiveText = text.slice(0, -1);
      effectiveCursor = Math.max(0, effectiveText.length);
    }

    const before = effectiveText.slice(0, effectiveCursor);
    const lines = before.split("\n");

    let line = lines.length;
    const currentLine = lines[line - 1] ?? "";
    let column = currentLine.length + 1;

    if (cursor === 0) {
      line = 1;
      column = 1;
    }

    return { line, column };
  };

  const { line, column } = calculateLineCol(text, cursor);

  return (
    <footer className="flex justify-between items-center text-gray-600 bg-[#f8f8f8] border-t border-gray-200 p-2">
      <p className="pl-4 pr-10 whitespace-nowrap w-30">Ln {line}, Col {column}</p>
      <p className="border-l px-3 min-w-36 border-gray-200 whitespace-nowrap">{calculateChar(text)}</p>
      <p className="flex-1 border-l px-3 border-gray-200 whitespace-nowrap">Plain text</p>
      <p className="border-l px-3 pr-8 border-gray-200 whitespace-nowrap">100%</p>
      <p className="border-l px-3 pr-15 border-gray-200 whitespace-nowrap">Windows (CRLF)</p>
      <p className="border-l px-3 pr-20 border-gray-200 whitespace-nowrap">UTF-8</p>
    </footer>
  );
};

export default Footer;