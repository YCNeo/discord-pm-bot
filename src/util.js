function parseDuration(input) {
    const m = /^(\\d+)\\s*(s|m|h|d)$/i.exec(String(input).trim());
    if (!m) return null;
    const n = Number(m[1]); const u = m[2].toLowerCase();
    const mult = { s: 1000, m: 60000, h: 3600000, d: 86400000 }[u];
    return n * mult;
}
function parseDateTime(input) {
    if (!input) return null;
    const s = String(input).trim();
    const isoish = s.includes(' ') ? s.replace(' ', 'T') : s;
    const d = new Date(isoish);
    return Number.isNaN(d.getTime()) ? null : d;
}
function fmtDate(d) { return d.toLocaleString('zh-TW', { hour12: false }); }
module.exports = { parseDuration, parseDateTime, fmtDate };
