function parseDuration(input) {
    if (!input) return null;
    const s = String(input).trim().toLowerCase();

    const regex = /(\d+)\s*(s|sec|secs|second|seconds|m|min|mins|minute|minutes|h|hr|hrs|hour|hours|d|day|days)/g;
    let total = 0;
    let match;
    let found = false;

    while ((match = regex.exec(s)) !== null) {
        found = true;
        const n = Number(match[1]);
        const u = match[2];

        let mult = 0;
        if (['s', 'sec', 'secs', 'second', 'seconds'].includes(u)) mult = 1000;
        else if (['m', 'min', 'mins', 'minute', 'minutes'].includes(u)) mult = 60_000;
        else if (['h', 'hr', 'hrs', 'hour', 'hours'].includes(u)) mult = 3_600_000;
        else if (['d', 'day', 'days'].includes(u)) mult = 86_400_000;

        total += n * mult;
    }

    if (!found && /^\d+$/.test(s)) {
        total = Number(s) * 60_000; // 純數字 → 視為分鐘
        found = true;
    }

    if (!found || total <= 0) return null;
    return total;
}

function parseDateTime(input) {
    // 支援：
    // YYYY-MM-DD
    // YYYY-M-D
    // YYYY/MM/DD
    // 上述任一 + 空白或 'T' + HH:mm（HH/分鐘可為 1~2 位數）
    if (!input && input !== 0) return null;
    const s = String(input).trim();

    // 允許 - 或 / 作為分隔
    const re = /^\s*(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})(?:[ T](\d{1,2}):(\d{1,2}))?\s*$/;
    const m = re.exec(s);
    if (!m) return null;

    const year = Number(m[1]);
    const month = Number(m[2]);   // 1..12
    const day = Number(m[3]);   // 1..31
    const hour = m[4] !== undefined ? Number(m[4]) : 0;   // 0..23
    const minute = m[5] !== undefined ? Number(m[5]) : 0;   // 0..59

    // 範圍基本檢查
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;
    if (hour < 0 || hour > 23) return null;
    if (minute < 0 || minute > 59) return null;

    // 用「本地時間」建立避免被當成 UTC
    const d = new Date(year, month - 1, day, hour, minute, 0, 0);

    // 防溢位（例如 2025-02-31 自動跳到 3/3 的情況）
    if (d.getFullYear() !== year || (d.getMonth() + 1) !== month || d.getDate() !== day) return null;

    return d;
}


function fmtDate(d) {
    return d.toLocaleString('zh-TW', { hour12: false });
}

module.exports = { parseDuration, parseDateTime, fmtDate };
