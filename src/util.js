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
    if (!input) return null;
    const s = String(input).trim();
    const m = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{1,2}):(\d{2}))?$/.exec(s);
    if (!m) return null;

    const year = Number(m[1]);
    const month = Number(m[2]);
    const day = Number(m[3]);
    const hour = m[4] ? Number(m[4]) : 0;
    const minute = m[5] ? Number(m[5]) : 0;

    const d = new Date(year, month - 1, day, hour, minute, 0, 0);
    if (d.getFullYear() !== year || (d.getMonth() + 1) !== month || d.getDate() !== day) return null;
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;

    return d;
}

function fmtDate(d) {
    return d.toLocaleString('zh-TW', { hour12: false });
}

module.exports = { parseDuration, parseDateTime, fmtDate };
