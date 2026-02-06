/**
 * Terminal Typing Animation
 * Creates a typewriter effect for terminal-style content
 */

class TerminalTyping {
  constructor(container, options = {}) {
    this.container = container;
    this.output = container.querySelector('.terminal-output');
    this.cursor = container.querySelector('.terminal-cursor');
    this.lines = JSON.parse(container.dataset.lines || '[]');
    this.currentLine = 0;
    this.currentChar = 0;
    this.isTyping = false;
    this.hasStarted = false;

    // Options
    this.charDelay = options.charDelay || 25;
    this.lineDelay = options.lineDelay || 400;
    this.startDelay = options.startDelay || 500;
  }

  start() {
    if (this.hasStarted) return;
    this.hasStarted = true;

    setTimeout(() => {
      this.typeLine();
    }, this.startDelay);
  }

  typeLine() {
    if (this.currentLine >= this.lines.length) {
      // Done typing - keep cursor blinking
      return;
    }

    const line = this.lines[this.currentLine];
    this.isTyping = true;
    this.typeChar(line);
  }

  typeChar(line) {
    if (this.currentChar >= line.text.length) {
      // Line complete
      this.currentChar = 0;
      this.currentLine++;

      // Add line break
      if (this.currentLine < this.lines.length) {
        this.output.innerHTML += '\n';
      }

      setTimeout(() => {
        this.typeLine();
      }, this.lineDelay);
      return;
    }

    const char = line.text[this.currentChar];
    const span = document.createElement('span');
    span.textContent = char;

    // Apply styling based on line type
    if (line.type === 'heading') {
      span.className = 'text-novastacks font-bold';
    } else if (line.type === 'stat') {
      span.className = 'text-emerald-400';
    } else if (line.type === 'highlight') {
      span.className = 'text-white';
    } else if (line.type === 'command') {
      span.className = 'text-amber-400';
    } else {
      span.className = 'text-slate-400';
    }

    this.output.appendChild(span);
    this.currentChar++;

    // Randomize delay slightly for natural feel
    const delay = this.charDelay + Math.random() * 15;
    setTimeout(() => {
      this.typeChar(line);
    }, delay);
  }
}

// Initialize on scroll into view
document.addEventListener('DOMContentLoaded', () => {
  const terminals = document.querySelectorAll('.terminal-container');

  terminals.forEach(terminal => {
    const typing = new TerminalTyping(terminal);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typing.start();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(terminal);
  });
});
