import { Application, extend } from "@pixi/react";
import {
  Container,
  Graphics,
  FederatedPointerEvent,
  Rectangle,
} from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";

extend({ Container, Graphics });

type Point = { x: number; y: number };

const Canvas = () => {
  const [width] = useState(1696);
  const [height] = useState(570);

  const [pointerSize, setPointerSize] = useState(8);
  const [color, setColor] = useState<string>("#000000");
  const [pointerPos, setPointerPos] = useState<Point | null>(null);
  const graphicsRef = useRef<Graphics | null>(null);
  const lastPointRef = useRef<Point | null>(null);
  const isDrawingRef = useRef(false);

  const startStroke = useCallback(
    (x: number, y: number) => {
      const g = graphicsRef.current;
      if (!g) return;

      g.setStrokeStyle({
        width: pointerSize,
        color,
        cap: "round",
        join: "round",
      });

      g.beginPath();
      g.arc(x, y, pointerSize / 2, 0, Math.PI * 2);
      g.fillStyle = color;
      g.fill();

      lastPointRef.current = { x, y };
    },
    [pointerSize, color]
  );

  const handlePointerDown = useCallback(
    (e: FederatedPointerEvent) => {
      const { x, y } = e.global;

      isDrawingRef.current = true;
      setPointerPos({ x, y });

      startStroke(x, y);
    },
    [startStroke]
  );

  const handlePointerMove = useCallback((e: FederatedPointerEvent) => {
    const { x, y } = e.global;
    setPointerPos({ x, y });

    if (!isDrawingRef.current) return;

    const g = graphicsRef.current;
    const last = lastPointRef.current;
    if (!g || !last) return;

    // Draw one segment from last -> current
    g.beginPath();
    g.moveTo(last.x, last.y);
    g.lineTo(x, y);
    g.stroke();

    lastPointRef.current = { x, y };
  }, []);

  const stopDrawing = useCallback(() => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  }, []);

  const handleClear = useCallback(() => {
    const g = graphicsRef.current;
    if (g) {
      g.clear();
    }

    lastPointRef.current = null;
    isDrawingRef.current = false;
    setPointerPos(null);
  }, []);

  useEffect(() => {
    return () => {
      const g = graphicsRef.current;
      if (g) {
        g.clear();
      }
      graphicsRef.current = null;
      lastPointRef.current = null;
      isDrawingRef.current = false;
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        border: "1px solid #ccc",
        background: "#f3f3f3",
        padding: "30px",
      }}
    >
      <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 16 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Stroke width:</span>
          <input type="range" min={1}  max={50} value={pointerSize} onChange={(e) => setPointerSize(Number(e.target.value))} />
          <span>{pointerSize}px</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Color:</span>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>

        <button
          type="button"
          onClick={handleClear}
          style={{ padding: "4px 10px", borderRadius: 4, border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}
        >
          Clear
        </button>
      </div>

      <div
        className="relative border border-gray-300 w-fit h-fit"
        style={{ position: "relative", cursor: "none" }}
      >
        {pointerPos && (
          <div
            style={{
              position: "absolute",
              pointerEvents: "none",
              width: pointerSize,
              height: pointerSize,
              background: color,
              borderRadius: "999px",
              transform: `translate(${pointerPos.x - pointerSize / 2}px, ${pointerPos.y - pointerSize / 2}px)`,
            }}
          />
        )}

        <Application
          width={width}
          height={height}
          backgroundColor={0xffffff}
        >
          <pixiContainer
            eventMode="static"
            hitArea={new Rectangle(0, 0, width, height)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDrawing}
            onPointerUpOutside={stopDrawing}
          >
            <pixiGraphics
              draw={(g: Graphics) => {
                if (!graphicsRef.current) {
                  graphicsRef.current = g;
                }
              }}
            />
          </pixiContainer>
        </Application>
      </div>
    </div>
  );
};

export default Canvas;
