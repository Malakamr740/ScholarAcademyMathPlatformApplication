const katex = require('katex');
const text = 'In the system of equations below, $p$ is a constant. If the system has no solution, what is the value of $p$?\n\n$$\\begin{cases} 3x - 5y = 12 \\\\ px + 10y = 7 \\end{cases}$$';
const blockRegex = /(\$\$[\s\S]+?\$\$)/g;
const parts = text.split(blockRegex);
console.log('Split into', parts.length, 'parts:');
parts.forEach((p, i) => {
  console.log('Part ' + i + ':', JSON.stringify(p));
  if (p.startsWith('$$') && p.endsWith('$$')) {
    const math = p.slice(2, -2).trim();
    try {
      const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
      console.log('  KaTeX rendered block math! Length: ' + html.length);
    } catch(e) {
      console.log('  KaTeX error on block math:', e.message);
    }
  } else {
    const inlineRegex = /(\$[^$\n]+?\$)/g;
    const iParts = p.split(inlineRegex);
    iParts.forEach((ip, j) => {
      if (ip.startsWith('$') && ip.endsWith('$') && ip.length > 2) {
        const math = ip.slice(1, -1).trim();
        try {
          const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
          console.log('    Inline math ' + j + ' (' + ip + ') rendered! Length: ' + html.length);
        } catch(e) {
          console.log('    Inline math error:', e.message);
        }
      }
    });
  }
});
