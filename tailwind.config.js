module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        'h1': { 'font-size': '2.25rem', 'font-weight': '700' },
        'h2': { 'font-size': '1.5rem', 'font-weight': '700' },
        'h3': { 'font-size': '1.25rem', 'font-weight': '700' },
        'h4': { 'font-size': '1rem', 'font-weight': '700' },
        'h5': { 'font-size': '0.875rem', 'font-weight': '700' },
        'h6': { 'font-size': '0.875rem', 'font-weight': '700' },
        'p': { 'font-size': '1rem', 'line-height': '1.5' },
        'a': { 'color': '#3b82f6', 'text-decoration': 'none' },
        'ul': { 'list-style': 'none', 'padding': '0' },
        'li': { 'padding': '0.5rem 0' },
        'blockquote': { 'border-left': '4px solid #3b82f6', 'padding': '0.5rem 1rem' },
        'hr': { 'border': 'none', 'border-top': '1px solid #3b82f6', 'margin': '1rem 0' },
        'pre': { 'background-color': '#f7f7f7', 'border-radius': '0.25rem', 'padding': '0.5rem' },
        'code': { 'background-color': '#f7f7f7', 'border-radius': '0.25rem', 'padding': '0.25rem 0.5rem' },
        'table': { 'width': '100%', 'border-collapse': 'collapse' },
        'th': { 'background-color': '#f7f7f7', 'border': '1px solid #3b82f6', 'padding': '0.5rem' },
        'td': { 'border': '1px solid #3b82f6', 'padding': '0.5rem' },
      })
    }
  ],
};
