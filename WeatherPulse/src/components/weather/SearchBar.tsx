import { useEffect, useRef, useState } from "react";
import { MapPin, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { searchCities, type GeoResult } from "@/services/weatherApi";

export function SearchBar({
  onSelect,
  onGeolocate,
  recent,
  onClearRecent,
}: {
  onSelect: (loc: GeoResult) => void;
  onGeolocate: () => void;
  recent: GeoResult[];
  onClearRecent: () => void;
}) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!q.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        setResults(await searchCities(q));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const list = q.trim() ? results : recent;

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="glass flex items-center gap-2 px-4 py-3">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          value={q}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          aria-label="Search for a city"
          placeholder="Search any city…"
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
        />
        {q && (
          <button aria-label="Clear" onClick={() => setQ("")}>
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        <button
          onClick={onGeolocate}
          aria-label="Use my location"
          className="rounded-lg p-1.5 hover:bg-white/10 transition-colors"
        >
          <MapPin className="h-4 w-4 text-primary" />
        </button>
      </div>

      <AnimatePresence>
        {open && (list.length > 0 || loading) && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass absolute z-50 mt-2 w-full max-h-80 overflow-auto p-2"
          >
            {!q.trim() && recent.length > 0 && (
              <div className="flex items-center justify-between px-2 py-1 text-xs text-muted-foreground">
                <span>Recent</span>
                <button onClick={onClearRecent} className="hover:text-foreground">
                  Clear
                </button>
              </div>
            )}
            {loading && (
              <div className="px-3 py-4 text-sm text-muted-foreground">Searching…</div>
            )}
            {list.map((r) => (
              <button
                key={`${r.id}-${r.latitude}`}
                onClick={() => {
                  onSelect(r);
                  setOpen(false);
                  setQ("");
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-white/10 transition-colors"
              >
                <MapPin className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {[r.admin1, r.country].filter(Boolean).join(", ")}
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
